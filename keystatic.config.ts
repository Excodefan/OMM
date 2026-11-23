import { config, collection, fields } from '@keystatic/core';

// Editorul scrie fișiere direct în src/content/posts/{en,ro}/ pe calculatorul tău.
// Publicarea = commit + push în GitHub (hostingul reconstruiește singur site-ul).
const postSchema = (labels: { slug: string; description: string; category: string; draft: string; key: string; body: string }) => ({
  title: fields.slug({ name: { label: labels.slug } }),
  description: fields.text({ label: labels.description, multiline: true }),
  date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
  category: fields.text({ label: labels.category }),
  draft: fields.checkbox({ label: labels.draft, defaultValue: true }),
  translationKey: fields.text({
    label: labels.key,
    description: 'Aceeași valoare în versiunea EN și RO = comutatorul de limbă duce la articolul-pereche.',
  }),
  content: fields.markdoc({ label: labels.body }),
});

export default config({
  storage: { kind: 'local' },
  collections: {
    postsEn: collection({
      label: 'Articles (English)',
      path: 'src/content/posts/en/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: postSchema({ slug: 'Title', description: 'Description', category: 'Category', draft: 'Draft (hidden from site)', key: 'Translation key', body: 'Body' }),
    }),
    postsRo: collection({
      label: 'Articole (Română)',
      path: 'src/content/posts/ro/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: postSchema({ slug: 'Titlu', description: 'Descriere', category: 'Categorie', draft: 'Ciornă (ascuns de pe site)', key: 'Cheie traducere', body: 'Conținut' }),
    }),
  },
});
