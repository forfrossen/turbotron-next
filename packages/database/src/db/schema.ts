import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export * from "#db/nav";

export const midiDevices = sqliteTable("midi_devices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  manufacturer: text("manufacturer"),
  model: text("model")
});

export const midiMappings = sqliteTable("midi_mappings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  deviceId: integer("device_id").notNull().references(() => midiDevices.id),
  messageType: text("message_type", { enum: ["cc", "pc"] }).notNull(),
  value: integer("value"),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type", { enum: ["continuous", "switch", "program"] }).notNull(),
  valueOn: integer("value_on"),
  valueOff: integer("value_off")
});

export const midiGroups = sqliteTable("midi_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order")
});

export const midiMappingGroups = sqliteTable("midi_mapping_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  mappingId: integer("mapping_id")
    .notNull()
    .references(() => midiMappings.id),
  groupId: integer("group_id")
    .notNull()
    .references(() => midiGroups.id)
});

export const midiUserFavourites = sqliteTable("midi_user_favourites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  mappingId: integer("mapping_id")
    .notNull()
    .references(() => midiMappings.id)
});
