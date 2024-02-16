import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const chats = pgTable("chatpdf-chats", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id").notNull(),
  pdf_url: text("pdf_url").notNull(),
  pdf_name: text("pdf_name").notNull(),
  document_id: text("document_id").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("chatpdf-messages", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id").notNull(),
  messages: jsonb("messages").$type<Array<{ role: string; content: string }>>(),
  chat_id: serial("chat_id")
    .references(() => chats.id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
});
