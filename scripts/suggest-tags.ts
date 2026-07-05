#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { tagGuidelines, tagTaxonomy } from '../src/data/site';

const changedPosts = process.argv.slice(2).filter((file) => file.endsWith('.md'));
const allowedTags = new Set<string>(tagTaxonomy);

if (changedPosts.length === 0) {
  process.exit(0);
}

const useLlm = process.env.USE_LLM_TAGS === 'true' && Boolean(process.env.OPENAI_API_KEY);
const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

const sections: string[] = [];

sections.push(`# Tag suggestions\n`);
sections.push(useLlm
  ? `Mode: LLM-assisted suggestions. Post content was sent to the configured LLM provider.\n`
  : `Mode: local rule-based suggestions. No post content was sent to an external provider. Add the \`llm-tag-suggest\` PR label to opt into LLM suggestions.\n`);
sections.push(`Allowed tags: ${tagTaxonomy.map((tag) => `\`${tag}\``).join(', ')}\n`);

for (const file of changedPosts) {
  const raw = await readFile(file, 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  const currentTags = extractTags(frontmatter);
  const suggestions = useLlm
    ? await suggestWithLlm(file, frontmatter, body).catch((error) => {
        sections.push(`> LLM suggestion failed for \`${file}\`: ${String(error)}\n`);
        return suggestWithRules(`${frontmatter}\n${body}`);
      })
    : suggestWithRules(`${frontmatter}\n${body}`);

  sections.push(`## ${file}\n`);
  sections.push(`Current tags: ${currentTags.length ? currentTags.map((tag) => `\`${tag}\``).join(', ') : '_none_'}\n`);
  sections.push(`Suggested tags: ${suggestions.map((tag) => `\`${tag}\``).join(', ')}\n`);
  sections.push(`Suggested frontmatter:\n\n\`\`\`yaml\ntags: [${suggestions.map((tag) => `"${tag}"`).join(', ')}]\n\`\`\`\n`);
}

sections.push(`---\nRules: ${tagGuidelines.rules.join(' ')}\n`);
console.log(sections.join('\n'));

function splitFrontmatter(markdown: string): { frontmatter: string; body: string } {
  if (!markdown.startsWith('---')) return { frontmatter: '', body: markdown };
  const end = markdown.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: '', body: markdown };
  return {
    frontmatter: markdown.slice(3, end).trim(),
    body: markdown.slice(end + 4).trim(),
  };
}

function extractTags(frontmatter: string): string[] {
  const match = frontmatter.match(/^tags:\s*\[(.*)\]/m);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function suggestWithRules(text: string): string[] {
  const haystack = text.toLowerCase();
  const scored = new Map<string, number>();

  const rules: Array<[string, RegExp[]]> = [
    ['web-security', [/\bweb\b/, /xss/, /csrf/, /ssrf/, /http/, /cookie/, /session/, /browser/]],
    ['identity', [/auth/, /authorization/, /permission/, /account/, /role/, /access control/, /identity/]],
    ['cloud-security', [/cloud/, /bucket/, /iam/, /aws/, /gcp/, /azure/, /metadata service/]],
    ['vulnerability-research', [/vulnerab/, /exploit/, /impact/, /primitive/, /poc/, /disclosure/, /cve/]],
    ['secure-contact', [/secure contact/, /signal/, /encrypted/, /confidential/, /private channel/]],
    ['pgp', [/pgp/, /fingerprint/, /public key/, /encrypt/]],
    ['contact', [/contact/, /email/, /message/, /reach out/]],
    ['field-notes', [/field note/, /notes?/, /notebook/, /archive/]],
    ['method', [/method/, /assumption/, /model/, /process/, /triage/, /workflow/]],
    ['methodology', [/methodology/, /process/, /standard/, /reproducible/, /review/]],
    ['site', [/site/, /website/, /homepage/, /deploy/, /github pages/]],
    ['site-notes', [/site note/, /rebuild/, /publishing/, /workflow/]],
    ['design', [/design/, /layout/, /style/, /visual/, /interface/]],
    ['writing', [/writing/, /essay/, /readable/, /explain/, /archive/]],
    ['security', [/security/, /risk/, /threat/, /bug/, /audit/]],
  ];

  for (const [tag, patterns] of rules) {
    for (const pattern of patterns) {
      if (pattern.test(haystack)) scored.set(tag, (scored.get(tag) || 0) + 1);
    }
  }

  const suggestions = [...scored.entries()]
    .filter(([tag]) => allowedTags.has(tag))
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, tagGuidelines.max);

  if (suggestions.length < tagGuidelines.min && !suggestions.includes('security')) suggestions.unshift('security');
  if (suggestions.length < tagGuidelines.min && !suggestions.includes('field-notes')) suggestions.push('field-notes');
  if (suggestions.length < tagGuidelines.min && !suggestions.includes('writing')) suggestions.push('writing');

  return suggestions.slice(0, tagGuidelines.max);
}

async function suggestWithLlm(file: string, frontmatter: string, body: string): Promise<string[]> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `Suggest ${tagGuidelines.min}-${tagGuidelines.max} tags for a blog post. Only use tags from this allowed list: ${tagTaxonomy.join(', ')}. Return only a JSON array of strings.`,
        },
        {
          role: 'user',
          content: `File: ${file}\n\nFrontmatter:\n${frontmatter}\n\nPost body:\n${body.slice(0, 12000)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }

  const json = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const content = json.choices?.[0]?.message?.content || '[]';
  const parsed = JSON.parse(content) as string[];
  const clean = parsed.filter((tag) => allowedTags.has(tag));
  return clean.length >= tagGuidelines.min ? clean.slice(0, tagGuidelines.max) : suggestWithRules(`${frontmatter}\n${body}`);
}
