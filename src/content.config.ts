import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { tagTaxonomy } from './data/site';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.enum(tagTaxonomy)).default([]),
  coverImage: z.string().optional(),
  draft: z.boolean().default(false),
}).superRefine((post, ctx) => {
  if (!post.draft && (post.tags.length < 3 || post.tags.length > 5)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['tags'],
      message: 'Published posts must use 3–5 tags from tagTaxonomy in src/data/site.ts.',
    });
  }
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: postSchema,
});

export const collections = { posts };
