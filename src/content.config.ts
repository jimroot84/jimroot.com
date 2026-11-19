import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per photo post. Pages CMS writes these for you.
const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    image: z.string(),
    location: z.string(),
    caption: z.string().optional().nullable(),
    date: z.coerce.date().optional().nullable(),
    alt: z.string().optional().nullable(),
    pinned: z.boolean().optional().nullable(),
  }),
});

export const collections = { photos };
