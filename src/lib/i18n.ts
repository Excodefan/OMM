export type Lang = 'en' | 'ro';
export const languages: Lang[] = ['en','ro'];
export const words = {
 en: {
  nav: ['Home','About','Writing','Experience','Projects','Contact'],
  kicker:'TECHNOLOGY · PEOPLE · PROCESSES',
  hero:'Technology, people and better ways of working.',
  intro:'A personal space for ideas, professional experiences and hands-on experiments in IT, project management, digital transformation and applied AI.',
  read:'Explore writing', projects:'Explore projects', focus:'AREAS OF FOCUS',
  areas:['IT & Strategy','Software Engineering','Project Management','Applied AI','Process Improvement'],
  recent:'Latest writing', all:'All articles',
  journey:'Career journey', journeyDesc:'From software development to technology leadership, project delivery and new ways of working. Each chapter will have its own animated story.',
  careerButton:'Explore experience', lab:'Projects & experiments', labDesc:'Ideas, prototypes and experiments. These cards are placeholders until projects are published.',
  about:'About', aboutTitle:'A technical foundation. A broader perspective.',
  aboutText:'My work has moved across software development, IT management, projects and consulting. Here I share selected perspectives and things I am learning and building.',
  writing:'Writing', writingIntro:'Notes and perspectives on technology, management and practical automation.',
  experience:'Experience', experienceIntro:'A readable professional timeline, complemented by short animated Career Stories.',
  projectsTitle:'Projects & experiments', projectIntro:'An evolving laboratory for practical software and AI work.',
  demo:'Concept / sample content', soon:'Story in preparation', back:'Back to writing', contact:'Contact', contactText:'Professional conversations and collaboration inquiries.',
  email:'Email address to be added', draftNotice:'The entries shown here are illustrative, not verified biographical claims.',
  noPost:'More articles will appear here.', available:'Read article', footer:'Built thoughtfully · EN / RO',
 },
 ro: {
  nav: ['Acasă','Despre','Articole','Experiență','Proiecte','Contact'],
  kicker:'TEHNOLOGIE · OAMENI · PROCESE',
  hero:'Tehnologie, oameni și moduri mai bune de a lucra.',
  intro:'Un spațiu personal pentru idei, experiențe profesionale și experimente practice în IT, management de proiect, transformare digitală și AI aplicată.',
  read:'Citește articole', projects:'Descoperă proiectele', focus:'DOMENII DE INTERES',
  areas:['IT și strategie','Dezvoltare software','Management de proiect','AI aplicată','Optimizarea proceselor'],
  recent:'Articole recente', all:'Toate articolele',
  journey:'Parcurs profesional', journeyDesc:'De la dezvoltare software la conducere IT, proiecte și noi moduri de lucru. Fiecare etapă va avea propria poveste animată.',
  careerButton:'Explorează experiența', lab:'Proiecte și experimente', labDesc:'Idei, prototipuri și experimente. Aceste carduri sunt provizorii până la publicarea proiectelor.',
  about:'Despre mine', aboutTitle:'Bază tehnică. Perspectivă extinsă.',
  aboutText:'Experiența mea acoperă dezvoltarea software, managementul IT, proiectele și consultanța. Aici împărtășesc perspective selectate și lucruri pe care le explorez și le construiesc.',
  writing:'Articole', writingIntro:'Note și perspective despre tehnologie, management și automatizare practică.',
  experience:'Experiență', experienceIntro:'Un parcurs profesional ușor de urmărit, completat de scurte animații Career Stories.',
  projectsTitle:'Proiecte și experimente', projectIntro:'Un laborator în evoluție pentru software și AI aplicată.',
  demo:'Concept / conținut exemplificativ', soon:'Animație în pregătire', back:'Înapoi la articole', contact:'Contact', contactText:'Discuții profesionale și propuneri de colaborare.',
  email:'Adresa de email va fi adăugată', draftNotice:'Elementele afișate aici sunt ilustrative, nu afirmații biografice verificate.',
  noPost:'Aici vor apărea noi articole.', available:'Citește articolul', footer:'Construit cu atenție · EN / RO',
 }
};
export const navSlugs = ['', 'about', 'writing', 'experience', 'projects', 'contact'];
export function validLang(input: string | undefined): input is Lang { return input === 'en' || input === 'ro'; }
export function localPath(lang: Lang, segment = '') { return `/${lang}/${segment ? segment.replace(/^\/+|\/+$/g,'')+'/' : ''}`; }
