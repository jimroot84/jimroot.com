import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

// Every image in src/assets/photos, keyed by its path ("/src/assets/photos/x.jpg").
// Astro resizes and compresses these at build time.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function img(path: string): ImageMetadata {
  const key = path.startsWith('/') ? path : `/${path}`;
  const found = files[key];
  if (!found) {
    throw new Error(
      `Photo not found: "${path}". Upload it to src/assets/photos (Pages CMS does this when you pick a photo).`,
    );
  }
  return found.default;
}

export type Photo = {
  id: string;
  image: ImageMetadata;
  location: string;
  caption: string;
  date: Date | null;
  alt: string;
  pinned: boolean;
};

export async function getPhotos(): Promise<Photo[]> {
  const entries = await getCollection('photos');
  const photos = entries.map((e) => ({
    id: e.id,
    image: img(e.data.image),
    location: e.data.location,
    caption: e.data.caption ?? '',
    date: e.data.date ?? null,
    alt: e.data.alt || e.data.location,
    pinned: !!e.data.pinned,
  }));
  // Newest first; posts without a date go last.
  return photos.sort((a, b) => {
    if (a.date && b.date) return b.date.getTime() - a.date.getTime();
    if (a.date) return -1;
    if (b.date) return 1;
    return a.location.localeCompare(b.location);
  });
}

export function formatDate(d: Date | null): string {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
