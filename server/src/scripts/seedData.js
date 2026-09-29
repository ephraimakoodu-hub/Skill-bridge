import { skills, projects, opportunities } from "../../../src/data/Data.js";
import { prisma } from "../lib/prisma.js";

async function seedSkills() {
  console.log("Seeding skills...");

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: {
        id: String(skill.id),
      },
      update: {
        name: skill.name,
        description: skill.description,
        level: skill.level || null,
        category: skill.category || null,
      },
      create: {
        id: String(skill.id),
        name: skill.name,
        description: skill.description,
        level: skill.level || null,
        category: skill.category || null,
      },
    });

    if (Array.isArray(skill.roadmap)) {
      for (const lesson of skill.roadmap) {
        await prisma.lesson.upsert({
          where: {
            id: `${skill.id}-${lesson.id}`,
          },
          update: {
            title: lesson.title,
            description: lesson.description || null,
            orderIndex: lesson.id,
            premium: Boolean(lesson.premium),
            content: lesson.lesson || {},
          },
          create: {
            id: `${skill.id}-${lesson.id}`,
            skillId: String(skill.id),
            title: lesson.title,
            description: lesson.description || null,
            orderIndex: lesson.id,
            premium: Boolean(lesson.premium),
            content: lesson.lesson || {},
          },
        });
      }
    }
  }

  console.log(`Seeded ${skills.length} skills.`);
}

async function seedProjects() {
  console.log("Seeding projects...");

  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        id: String(project.id),
      },
      update: {
        title: project.title,
        description: project.description,
        difficulty: project.difficulty || null,
        category: project.category || null,
        skills: project.skills || [],
        checklist: project.checklist || [],
        premium: Boolean(project.premium),
      },
      create: {
        id: String(project.id),
        title: project.title,
        description: project.description,
        difficulty: project.difficulty || null,
        category: project.category || null,
        skills: project.skills || [],
        checklist: project.checklist || [],
        premium: Boolean(project.premium),
      },
    });
  }

  console.log(`Seeded ${projects.length} projects.`);
}

async function seedOpportunities() {
  console.log("Seeding opportunities...");

  for (const opportunity of opportunities) {
    await prisma.opportunity.upsert({
      where: {
        id: String(opportunity.id),
      },
      update: {
        title: opportunity.title,
        organization: opportunity.organization,
        location: opportunity.location || null,
        type: opportunity.type || null,
        category: opportunity.category || null,
        skills: opportunity.skills || [],
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
        location: opportunity.location || null,
        type: opportunity.type || null,
        category: opportunity.category || null,
        skills: opportunity.skills || [],
        description: opportunity.description,
        postedAt: opportunity.postedAt
          ? new Date(opportunity.postedAt)
          : null,
        applyUrl: opportunity.applyUrl,
      },
    });
  }

  console.log(`Seeded ${opportunities.length} opportunities.`);
}

async function main() {
  console.log("Starting SkillBridge NG database seed...\n");

  await seedSkills();
  await seedProjects();
  await seedOpportunities();

  console.log("\nDatabase seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("\nDatabase seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });