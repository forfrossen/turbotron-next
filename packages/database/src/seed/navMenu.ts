import { navItems, navMain, projects, teams, users } from "#db/nav";
import { db } from "#index";

export async function seedNavMenu() {
  // Seed user
  const [user] = await db.insert(users).values({ name: "shadcn", email: "m@example.com", avatar: "/avatars/shadcn.jpg" }).onConflictDoNothing().returning();

  // Seed teams
  await db
    .insert(teams)
    .values([
      { name: "Acme Inc", logo: "GalleryVerticalEnd", plan: "Enterprise" },
      { name: "Acme Corp.", logo: "AudioWaveform", plan: "Startup" },
      { name: "Evil Corp.", logo: "Command", plan: "Free" }
    ])
    .onConflictDoNothing();

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
      .onConflictDoNothing()
      .returning();

    await db
      .insert(navItems)
      .values(
        section.items.map((item) => ({
          navMainId: nav?.id ?? 0,
          title: item.title,
          url: item.url
        }))
      )
      .onConflictDoNothing();
  }

  // Seed projects
  await db
    .insert(projects)
    .values([
      { name: "Storybook", url: "http://localhost:6006", icon: "Frame" },
      { name: "Sales & Marketing", url: "#", icon: "PieChart" },
      { name: "Travel", url: "#", icon: "Map" }
    ])
    .onConflictDoNothing();

  console.log("✅ Seed NavMenu complete!");
}
