import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html'; // Importar correctamente sanitize-html

const parser = new MarkdownIt();

export const GET: APIRoute = async ({ params, request, site }) => {
    const blogPosts = await getCollection('blog');
  
    return rss({
      title: 'Facundo Blog',
      description: 'Un simple blog sobre mis aventuras con Astro',
      site: site ?? '',
      xmlns: {
        media: 'http://search.yahoo.com/mrss/', // Define el espacio de nombres
      },
      items: blogPosts.map(({ data, filePath, body }) => ({
        title: data.title,
        pubDate: data.date,
        description: data.description,
        link: `posts/${filePath?.split('/').slice(-1)[0].replace('.md', '')}`,
        content: sanitizeHtml(parser.render(body || ''), {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img'], // Lista de etiquetas permitidas
        }),
        customData: `<media:content
          type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
          width="${data.image.width}"
          height="${data.image.height}"
          medium="image"
          url="${site + data.image.src}" />
        `,
      })),
      customData: `<language>es-ar</language>`,
    });
  };
  