import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Limba = folderul (en/ sau ro/). Slug-ul = numele fișierului. Nu se mai repetă în frontmatter.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    category: z.string().default(''),
    draft: z.boolean().default(true),
    translationKey: z.string().optional(),
    readingMinutes: z.number().optional(), // opțional: dacă lipsește, se calculează automat
  }),
});
export const collections = { posts };
