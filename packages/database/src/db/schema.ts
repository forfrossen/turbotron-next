import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar")
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  plan: text("plan").notNull()
});

export const navMain = sqliteTable("nav_main", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(false)
});

export const navItems = sqliteTable("nav_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  navMainId: integer("nav_main_id")
    .notNull()
    .references(() => navMain.id),
  title: text("title").notNull(),
  url: text("url").notNull()
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull()
});

export const midiDevices = sqliteTable("midi_devices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  manufacturer: text("manufacturer"),
  model: text("model")
});

export const midiMappings = sqliteTable(
  "midi_mappings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    deviceId: integer("device_id")
      .notNull()
      .references(() => midiDevices.id),
    name: text("name").notNull(),
    description: text("description").notNull(),
    type: text("type", { enum: ["continuous", "switch", "program"] }).notNull(),
    messageType: text("message_type", { enum: ["cc", "pc"] }).notNull(),
    value: integer("value"),
    valueOn: integer("value_on"),
    valueOff: integer("value_off")
  }
  // (t) => [unique().on(t.deviceId, t.name, t.description, t.type, t.messageType, t.value, t.valueOn, t.valueOff)]
);

export const midiGroups = sqliteTable(
  "midi_groups",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order")
  }
  // (t) => [unique().on(t.name)]
);

export const midiMappingGroups = sqliteTable(
  "midi_mapping_groups",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    mappingId: integer("mapping_id")
      .notNull()
      .references(() => midiMappings.id),
    groupId: integer("group_id")
      .notNull()
      .references(() => midiGroups.id)
  }
  // (t) => [unique().on(t.userId, t.mappingId, t.groupId)]
);

export const midiUserFavourites = sqliteTable("midi_user_favourites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  mappingId: integer("mapping_id")
    .notNull()
    .references(() => midiMappings.id)
});
