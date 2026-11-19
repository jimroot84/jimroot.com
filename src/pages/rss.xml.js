import rss from '@astrojs/rss';
import { getImage } from 'astro:assets';
import site from '../data/site.json';
import { getPhotos } from '../lib/photos';

export async function GET(context) {
  const photos = await getPhotos();
  const items = await Promise.all(
    photos.map(async (p) => {
      const pic = await getImage({ src: p.image, width: 1200, format: 'jpg' });
      const src = new URL(pic.src, context.site).href;
      const caption = p.caption ? `<p>${escape(p.caption)}</p>` : '';
      return {
        title: p.location,
        pubDate: p.date ?? undefined,
        link: `/camera-roll/#${p.id}`,
        content: `<p><img src="${src}" alt="${escape(p.alt)}" /></p>${caption}`,
      };
    }),
  );
  return rss({
    title: `${site.name} — Camera Roll`,
    description: site.intro,
    site: context.site,
    trailingSlash: false,
    items,
  });
}

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
