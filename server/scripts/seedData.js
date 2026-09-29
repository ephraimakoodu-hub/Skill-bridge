import { skills, projects, opportunities } from "../../../src/data/Data.js";
import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("Seeding SkillBridge content...");

  // --------------------------------------------------
  // Skills + lessons
  // --------------------------------------------------

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: String(skill.id) },
      update: {
        name: skill.name,
        description: skill.description,
        level: skill.level ?? null,
        category: skill.category ?? null,
      },
      create: {
        id: String(skill.id),
        name: skill.name,
        description: skill.description,
        level: skill.level ?? null,
        category: skill.category ?? null,
      },
    });

    for (let index = 0; index < (skill.roadmap || []).length; index++) {
      const step = skill.roadmap[index];

      await prisma.lesson.upsert({
        where: {
          id: `${skill.id}-${step.id}`,
        },
        update: {
          skillId: String(skill.id),
          title: step.title,
          description: step.description ?? null,
          orderIndex: index + 1,
          premium: false,
          content: step.lesson ?? {},
        },
        create: {
          id: `${skill.id}-${step.id}`,
          skillId: String(skill.id),
          title: step.title,
          description: step.description ?? null,
          orderIndex: index + 1,
          premium: false,
          content: step.lesson ?? {},
        },
      });
    }
  }

  console.log(`Seeded ${skills.length} skills.`);

  // --------------------------------------------------
  // Projects
  // --------------------------------------------------

  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        id: String(project.id),
      },
      update: {
        title: project.title,
        description: project.description,
        difficulty: project.difficulty ?? null,
        category: project.category ?? null,
        skills: project.skills ?? [],
        checklist: project.checklist ?? [],
        premium: Boolean(project.premium),
      },
      create: {
        id: String(project.id),
        title: project.title,
        description: project.description,
        difficulty: project.difficulty ?? null,
        category: project.category ?? null,
        skills: project.skills ?? [],
        checklist: project.checklist ?? [],
        premium: Boolean(project.premium),
      },
    });
  }

  console.log(`Seeded ${projects.length} projects.`);

  // --------------------------------------------------
  // Opportunities
  // --------------------------------------------------

  for (const opportunity of opportunities) {
    await prisma.opportunity.upsert({
      where: {
        id: String(opportunity.id),
      },
      update: {
        title: opportunity.title,
        organization: opportunity.organization,
        location: opportunity.location ?? null,
        type: opportunity.type ?? null,
        category: opportunity.category ?? null,
        skills: opportunity.skills ?? [],
        description: opportunity.description,
        postedAt: opportunity.postedAt
          ? new Date(opportunity.postedAt)
          : null,
        applyUrl: opportunity.applyUrl,
      },
      create: {
        id: String(opportunity.id),
        title: opportunity.title,
        organization: opportunity.organization,
        location: opportunity.location ?? null,
        type: opportunity.type ?? null,
        category: opportunity.category ?? null,
        skills: opportunity.skills ?? [],
        description: opportunity.description,
        postedAt: opportunity.postedAt
          ? new Date(opportunity.postedAt)
          : null,
        applyUrl: opportunity.applyUrl,
      },
    });
  }

  console.log(`Seeded ${opportunities.length} opportunities.`);
  console.log("SkillBridge content seeding complete.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });