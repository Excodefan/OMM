import { getEntry } from 'astro:content';
import { words, type Lang } from './i18n';

export interface ProjectItem { name: string; description: string; status: string }

/** Proiectele din Keystatic (Pages → Projects); dacă lipsesc, listă goală. */
export async function getProjects(lang: Lang): Promise<{ intro: string; items: ProjectItem[] }> {
  const entry = await getEntry('projects', `projects-${lang}`);
  return { intro: entry?.data.intro || words[lang].projectIntro, items: entry?.data.items ?? [] };
}
