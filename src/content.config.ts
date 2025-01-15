import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image()/* .refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px',
      }), */
      ,
      // Relación
      // author: z.string(),
      author: reference('author'),

      // Relación
      tags: z.array(z.string()),

      // Boolean
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx,yml,webp}', base: './src/content/author' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
