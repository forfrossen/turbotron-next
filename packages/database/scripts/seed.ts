import { users, teams, navMain, navItems, projects } from "#db/schema";
import { db } from "#index";

const debugLabelMain = `[DEBUG][seeder]`;

const debugLabel = `${debugLabelMain}[main]`;

async function seed() {
  // Seed user
  const [user] = await db
    .insert(users)
    .values({
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg"
    })
    .returning();

  // Seed teams
  await db.insert(teams).values([
    {
      name: "Acme Inc",
      logo: "GalleryVerticalEnd",
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: "AudioWaveform",
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: "Command",
      plan: "Free"
    }
  ]);

  // Seed navMain + navItems
  const navMainData = [
    {
      title: "Scraper",
      url: "#",
      icon: "SquareTerminal",
      isActive: true,
      items: [
        { title: "Home", url: "/" },
        { title: "Player", url: "/track" },
        { title: "Status", url: "status" },
        { title: "BullBoard", url: "/api/queues" },
        { title: "Config", url: "config" }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: "Bot",
      isActive: false,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: "BookOpen",
      isActive: false,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: "Settings2",
      isActive: false,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" }
      ]
    }
  ];

  for (const section of navMainData) {
    const [nav] = await db
      .insert(navMain)
      .values({
        title: section.title,
        url: section.url,
        icon: section.icon,
        isActive: section.isActive
      })
      .returning();

    await db.insert(navItems).values(
      section.items.map((item) => ({
        navMainId: nav?.id ?? 0,
        title: item.title,
        url: item.url
      }))
    );
  }

  // Seed projects
  await db.insert(projects).values([
    {
      name: "Storybook",
      url: "http://localhost:6006",
      icon: "Frame"
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: "PieChart"
    },
    {
      name: "Travel",
      url: "#",
      icon: "Map"
    }
  ]);

  console.log("✅ Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
