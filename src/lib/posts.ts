import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'posts'> & { lang: Lang; slug: string; minutes: number; key: string };

function enrich(entry: CollectionEntry<'posts'>): Post {
  const [folder, ...rest] = entry.id.split('/');
  const slug = rest.join('/').replace(/\.(md|mdoc)$/, '');
  const words = (entry.body ?? '').split(/\s+/).filter(Boolean).length;
  return {
    ...entry,
    lang: folder as Lang,
    slug,
    minutes: entry.data.readingMinutes ?? Math.max(1, Math.round(words / 200)),
    key: entry.data.translationKey || slug,
  };
}

/** Articolele publicate (fără ciorne), cele mai noi primele. */
export async function getPosts(lang?: Lang): Promise<Post[]> {
  const all = (await getCollection('posts', ({ data }) => !data.draft)).map(enrich);
  return all
    .filter((p) => !lang || p.lang === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Versiunea în cealaltă limbă a aceluiași articol (după translationKey sau slug), dacă există. */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const other: Lang = post.lang === 'en' ? 'ro' : 'en';
  return (await getPosts(other)).find((p) => p.key === post.key);
}
