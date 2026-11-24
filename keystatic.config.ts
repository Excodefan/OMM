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
const experienceSchema = (l: { title: string; intro: string }) => ({
  title: fields.text({ label: l.title }),
  intro: fields.text({ label: l.intro, multiline: true }),
  items: fields.array(
    fields.object({
      role: fields.text({ label: 'Role / Rol' }),
      organization: fields.text({ label: 'Organization / Organizație' }),
      period: fields.text({ label: 'Period / Perioadă' }),
      location: fields.text({ label: 'Location / Locație' }),
      text: fields.text({ label: 'Description (separate paragraphs with an empty line)', multiline: true }),
      areas: fields.array(fields.text({ label: 'Area' }), { label: 'Key areas', itemLabel: (p) => p.value || 'Area' }),
      story: fields.select({
        label: 'Career Story animation',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Teletrans (2011-2016)', value: 'teletrans' },
          { label: 'Electrica Furnizare (2019-2023)', value: 'electrica' },
          { label: 'DEER (2023-2024)', value: 'deer' },
          { label: 'Expert Computers (2018-2019)', value: 'expert' },
          { label: 'Arhivio Data (2016-2018)', value: 'arhivio' },
          { label: 'CRPCIS (2009-2011)', value: 'crpcis' },
          { label: 'Piatra Neamț (2005-2009)', value: 'piatra' },
          { label: 'SSI North America (1999-2005)', value: 'ssi' },
          { label: 'Canada (1996-1999)', value: 'canada' },
          { label: 'Early career (1993-1995)', value: 'early90s' },
          { label: 'IT Expert / MIPE (2024-present)', value: 'mipe' },
        ],
        defaultValue: 'none',
      }),
    }),
    { label: 'Roles (newest first)', itemLabel: (p) => p.fields.role.value || 'Role' },
  ),
});
const homeSchema = (lang: 'en' | 'ro') => (lang === 'en' ? {
  heroTitle: fields.text({ label: 'Hero: title' }),
  heroText: fields.text({ label: 'Hero: text', multiline: true }),
  heroPrimary: fields.text({ label: 'Hero: main button (→ Experience)' }),
  heroSecondary: fields.text({ label: 'Hero: second button (→ About)' }),
  aboutTitle: fields.text({ label: 'About block: title' }),
  aboutText: fields.text({ label: 'About block: text (blank line between paragraphs)', multiline: true }),
  aboutCta: fields.text({ label: 'About block: button' }),
  writingTitle: fields.text({ label: 'Writing block: title' }),
  writingText: fields.text({ label: 'Writing block: text (blank line between paragraphs)', multiline: true }),
  writingCta: fields.text({ label: 'Writing block: button' }),
  projectsTitle: fields.text({ label: 'Projects block: title' }),
  projectsText: fields.text({ label: 'Projects block: text (blank line between paragraphs)', multiline: true }),
  projectsNote: fields.text({ label: 'Projects block: small note' }),
  contactTitle: fields.text({ label: 'Contact block: title' }),
  contactText: fields.text({ label: 'Contact block: text', multiline: true }),
  contactCta: fields.text({ label: 'Contact block: button' }),
} : {
  heroTitle: fields.text({ label: 'Hero: titlu' }),
  heroText: fields.text({ label: 'Hero: text', multiline: true }),
  heroPrimary: fields.text({ label: 'Hero: buton principal (→ Experiență)' }),
  heroSecondary: fields.text({ label: 'Hero: al doilea buton (→ Despre)' }),
  aboutTitle: fields.text({ label: 'Bloc Despre: titlu' }),
  aboutText: fields.text({ label: 'Bloc Despre: text (rând gol între paragrafe)', multiline: true }),
  aboutCta: fields.text({ label: 'Bloc Despre: buton' }),
  writingTitle: fields.text({ label: 'Bloc Articole: titlu' }),
  writingText: fields.text({ label: 'Bloc Articole: text (rând gol între paragrafe)', multiline: true }),
  writingCta: fields.text({ label: 'Bloc Articole: buton' }),
  projectsTitle: fields.text({ label: 'Bloc Proiecte: titlu' }),
  projectsText: fields.text({ label: 'Bloc Proiecte: text (rând gol între paragrafe)', multiline: true }),
  projectsNote: fields.text({ label: 'Bloc Proiecte: notă scurtă' }),
  contactTitle: fields.text({ label: 'Bloc Contact: titlu' }),
  contactText: fields.text({ label: 'Bloc Contact: text', multiline: true }),
  contactCta: fields.text({ label: 'Bloc Contact: buton' }),
});

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
      Pages: ['homeEn', 'homeRo', 'aboutEn', 'aboutRo', 'contactEn', 'contactRo', 'experienceEn', 'experienceRo', 'projectsEn', 'projectsRo'],
      Articles: ['postsEn', 'postsRo'],
    },
  },
  singletons: {
    homeEn: singleton({ label: 'Home (English)', path: 'src/content/pages/home-en', schema: homeSchema('en') }),
    homeRo: singleton({ label: 'Pagina de start (Română)', path: 'src/content/pages/home-ro', schema: homeSchema('ro') }),
    aboutEn: singleton({ label: 'About (English)', path: 'src/content/pages/about-en', format: { contentField: 'content' }, schema: pageFields(en) }),
    aboutRo: singleton({ label: 'Despre (Română)', path: 'src/content/pages/about-ro', format: { contentField: 'content' }, schema: pageFields(ro) }),
    contactEn: singleton({ label: 'Contact (English)', path: 'src/content/pages/contact-en', format: { contentField: 'content' }, schema: { ...pageFields(en), email: fields.text({ label: 'Email' }) } }),
    contactRo: singleton({ label: 'Contact (Română)', path: 'src/content/pages/contact-ro', format: { contentField: 'content' }, schema: { ...pageFields(ro), email: fields.text({ label: 'Email' }) } }),
    experienceEn: singleton({ label: 'Experience (English)', path: 'src/content/pages/experience-en', schema: experienceSchema({ title: 'Page title', intro: 'Intro (short text under the title)' }) }),
    experienceRo: singleton({ label: 'Experiență (Română)', path: 'src/content/pages/experience-ro', schema: experienceSchema({ title: 'Titlul paginii', intro: 'Introducere (text scurt sub titlu)' }) }),
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
