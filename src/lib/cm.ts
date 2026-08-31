/**
 * The map: how phases, skills, mindsets, frameworks and activities connect.
 *
 * ONE RULE holds this together. Every link is written once, on the skill, in
 * the `phases` / `mindsets` / `frameworks` fields of its training file. Nothing
 * anywhere stores the reverse direction. A mindset page does not list its
 * skills; it asks this file, and this file reads the skills. That is why the
 * two directions can never fall out of step, and why adding a link is a
 * one-line edit in one file.
 *
 * Activities are the exception, and deliberately so: they carry their own tags
 * in src/data/activities.json, inherited from their skill but overridable where
 * a particular activity genuinely differs.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { isVisible } from './content';

export type PhaseCode = 'PL' | 'P1' | 'P2' | 'P3' | 'P4';
export type Role = 'load-bearing' | 'supporting';

/** Skills in the Training Lab, in curriculum order, drafts excluded. */
export async function skills() {
  const all = await getCollection('trainings');
  return all
    .filter((t) => isVisible(t.data) && t.data.skillNumber !== undefined)
    .sort((a, b) => (a.data.skillNumber ?? 0) - (b.data.skillNumber ?? 0));
}

/** Two digits, the way the curriculum numbers them: 1 → "01". */
export function skillNo(entry: CollectionEntry<'trainings'>) {
  return String(entry.data.skillNumber).padStart(2, '0');
}

/** The five phases in order, Pre-Launch first. */
export async function phases() {
  const all = await getCollection('phases');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Every activity, handouts included. Pass `true` for schedulable ones only. */
export async function activities(schedulableOnly = false) {
  const all = await getCollection('activities');
  return all
    .filter((a) => !schedulableOnly || a.data.schedulable)
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * Which skills a phase asks for, split by how hard it leans on them.
 * Load-bearing means the phase goes badly without the skill, and visibly so.
 */
export async function skillsInPhase(code: PhaseCode) {
  const all = await skills();
  const pick = (role: Role) =>
    all.filter((s) => s.data.phases.some((p) => p.code === code && p.role === role));
  return { loadBearing: pick('load-bearing'), supporting: pick('supporting') };
}

/** The role a skill plays in a phase, or undefined if the phase never asks for it. */
export function roleInPhase(
  entry: CollectionEntry<'trainings'>,
  code: PhaseCode
): Role | undefined {
  return entry.data.phases.find((p) => p.code === code)?.role;
}

/**
 * Everything that draws on one mindset or framework.
 * This is what makes a concept page worth visiting rather than a glossary entry.
 */
export async function usedBy(kind: 'mindsets' | 'frameworks', id: string) {
  const allSkills = await skills();
  const usingSkills = allSkills.filter((s) => s.data[kind].includes(id));

  const allActivities = await activities();
  const usingActivities = allActivities.filter((a) => a.data[kind].includes(id));

  /* Group the activities by skill so a long list reads as a structure rather
     than as ninety titles in a row. */
  const bySkill = usingSkills
    .map((skill) => ({
      skill,
      items: usingActivities.filter((a) => a.data.skill === skill.id),
    }))
    .filter((g) => g.items.length > 0);

  /* Activities whose skill page is not published, so they still get counted. */
  const orphans = usingActivities.filter(
    (a) => !usingSkills.some((s) => s.id === a.data.skill)
  );

  return {
    skills: usingSkills,
    activities: usingActivities,
    bySkill,
    orphans,
    phases: [...new Set(usingSkills.flatMap((s) => s.data.phases.map((p) => p.code)))],
  };
}

/** Resolve a skill's own map links into entries the page can render. */
export async function mapFor(entry: CollectionEntry<'trainings'>) {
  const [allMindsets, allFrameworks, allPhases] = await Promise.all([
    getCollection('mindsets'),
    getCollection('frameworks'),
    phases(),
  ]);
  return {
    mindsets: entry.data.mindsets
      .map((id) => allMindsets.find((m) => m.id === id))
      .filter((m) => m !== undefined),
    frameworks: entry.data.frameworks
      .map((id) => allFrameworks.find((f) => f.id === id))
      .filter((f) => f !== undefined),
    phases: allPhases
      .map((p) => ({ phase: p, role: roleInPhase(entry, p.data.code) }))
      .filter((p) => p.role !== undefined),
  };
}

/** "20 to 25 minutes", or "20 minutes" when there is no range. */
export function minutesLabel(min: number | null, max: number | null) {
  if (min === null && max === null) return '';
  if (min === null || max === null || min === max) return `${max ?? min} minutes`;
  return `${min} to ${max} minutes`;
}
