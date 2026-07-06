export const site = {
  name: 'NaeesSecurity',
  author: 'Naees',
  headerName: 'NaeesSecurity',
  blogName: 'NaeesWrites',
  tagline: 'We exploit the unseen.',
  description: 'Security research, field notes, and technical writing by Naees.',
  url: 'https://naees.github.io/NaeesSecurity',
  email: 'naees@protonmail.com',
  github: 'https://github.com/Naees',
  x: 'https://x.com/NaeesSecurity',
  signal: 'https://signal.me/#eu/1Fkdlvu4vmAqdT-5QwGdGFH1b4uOrLlpyMlK8Fyr5aw_eu6XMJ1PEYOH18jG1nMY',
  pgpFingerprint: 'EE03 DCB4 E594 D725 C528 83E0 4BCC B80F BFB5 EE54',
  focus: ['web security', 'identity', 'cloud exposure', 'practical exploitation'],
};

export const navLinks = [
  { href: '/', label: 'home' },
  // Research is intentionally hidden from the header until the section has real case files.
  // { href: '/research/', label: 'research' },
  { href: '/posts/', label: site.blogName },
  { href: '/engagements/', label: 'engagements' },
  { href: '/about/', label: 'about' },
  { href: '/contact/', label: 'contact' },
];

export const tagTaxonomy = [
  'security',
  'web-security',
  'identity',
  'cloud-security',
  'vulnerability-research',
  'secure-contact',
  'pgp',
  'contact',
  'field-notes',
  'method',
  'methodology',
  'site',
  'site-notes',
  'design',
  'writing',
  'pink'
] as const;

export const tagGuidelines = {
  min: 3,
  max: 5,
  source: 'Use the controlled tagTaxonomy list unless a post clearly needs a new recurring category.',
  rules: [
    'Prefer specific technical tags over broad tags.',
    'Use field-notes for short research/process notes.',
    'Use site-notes only for posts about this website or publishing workflow.',
    'Do not add one-off tags that are unlikely to be reused.',
    'Keep tags lowercase kebab-case.',
  ],
};
