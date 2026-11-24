import { config, collection, fields, singleton } from '@keystatic/core';

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

// Pagini editabile (About, Contact, Experience, Projects) — câte o intrare pe limbă.
const pageFields = (l: { title: string; intro: string; body: string }) => ({
  title: fields.text({ label: l.title }),
  intro: fields.text({ label: l.intro, multiline: true }),
  content: fields.markdoc({ label: l.body }),
});
const en = { title: 'Page title', intro: 'Intro (short text under the title)', body: 'Body' };
const ro = { title: 'Titlul paginii', intro: 'Introducere (text scurt sub titlu)', body: 'Conținut' };
const projectsSchema = (intro: string, itemLabel: string, name: string, desc: string, status: string) => ({
  intro: fields.text({ label: intro, multiline: true }),
  items: fields.array(
    fields.object({
      name: fields.text({ label: name }),
      description: fields.text({ label: desc, multiline: true }),
      status: fields.text({ label: status }),
    }),
    { label: itemLabel, itemLabel: (p) => p.fields.name.value || 'Project' },
  ),
});

export default config({
  storage: { kind: 'local' },
  ui: {
    navigation: {
      Pages: ['aboutEn', 'aboutRo', 'contactEn', 'contactRo', 'experienceEn', 'experienceRo', 'projectsEn', 'projectsRo'],
      Articles: ['postsEn', 'postsRo'],
    },
  },
  singletons: {
    aboutEn: singleton({ label: 'About (English)', path: 'src/content/pages/about-en', format: { contentField: 'content' }, schema: pageFields(en) }),
    aboutRo: singleton({ label: 'Despre (Română)', path: 'src/content/pages/about-ro', format: { contentField: 'content' }, schema: pageFields(ro) }),
    contactEn: singleton({ label: 'Contact (English)', path: 'src/content/pages/contact-en', format: { contentField: 'content' }, schema: { ...pageFields(en), email: fields.text({ label: 'Email' }) } }),
    contactRo: singleton({ label: 'Contact (Română)', path: 'src/content/pages/contact-ro', format: { contentField: 'content' }, schema: { ...pageFields(ro), email: fields.text({ label: 'Email' }) } }),
    experienceEn: singleton({ label: 'Experience (English)', path: 'src/content/pages/experience-en', format: { contentField: 'content' }, schema: pageFields(en) }),
    experienceRo: singleton({ label: 'Experiență (Română)', path: 'src/content/pages/experience-ro', format: { contentField: 'content' }, schema: pageFields(ro) }),
    projectsEn: singleton({ label: 'Projects (English)', path: 'src/content/pages/projects-en', schema: projectsSchema('Intro', 'Projects', 'Name', 'Description', 'Status (e.g. Concept, Live)') }),
    projectsRo: singleton({ label: 'Proiecte (Română)', path: 'src/content/pages/projects-ro', schema: projectsSchema('Introducere', 'Proiecte', 'Nume', 'Descriere', 'Stare (ex. Concept, Activ)') }),
  },
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
