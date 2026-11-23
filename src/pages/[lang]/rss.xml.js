import rss from '@astrojs/rss';
import { getPosts } from '../../lib/posts';
import { languages } from '../../lib/i18n';

export function getStaticPaths() { return languages.map(lang => ({ params: { lang } })); }

export async function GET(context) {
  const lang = context.params.lang;
  const posts = await getPosts(lang);
  return rss({
    title: lang === 'ro' ? 'O/M/M — Articole' : 'O/M/M — Writing',
    description: lang === 'ro' ? 'Tehnologie, oameni și procese.' : 'Technology, people and processes.',
    site: context.site,
    items: posts.map(p => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/${lang}/writing/${p.slug}/` })),
    customData: `<language>${lang}</language>`,
  });
}
