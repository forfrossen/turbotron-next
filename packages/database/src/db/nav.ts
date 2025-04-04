import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// User
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar")
});

// Teams
export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logo: text("logo").notNull(), // Store icon reference as string (e.g. component name)
  plan: text("plan").notNull()
});

// Navigation Main (Sections)
export const navMain = sqliteTable("nav_main", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(false)
});

// Navigation Items (Subitems of navMain)
export const navItems = sqliteTable("nav_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  navMainId: integer("nav_main_id")
    .notNull()
    .references(() => navMain.id),
  title: text("title").notNull(),
  url: text("url").notNull()
});

// Projects
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull()
});
