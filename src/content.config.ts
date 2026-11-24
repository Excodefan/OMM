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

// Pagini editabile din Keystatic: about-en.mdoc, contact-ro.mdoc etc.
const pages = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().default(''),
    intro: z.string().default(''),
    email: z.string().optional(),
  }),
});

// Lista de proiecte: projects-en.yaml / projects-ro.yaml
const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pages' }),
  schema: z.object({
    intro: z.string().default(''),
    items: z.array(z.object({ name: z.string(), description: z.string().default(''), status: z.string().default('') })).default([]),
  }),
});

export const collections = { posts, pages, projects };
