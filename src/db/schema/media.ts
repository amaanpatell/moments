import { TransformationConfig } from "@/types";
import { InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { account, session, user } from "./auth-schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const mediaTypeEnum = pgEnum("media_type", ["IMAGE", "VIDEO"]);

export const media = pgTable(
  "media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    originalUrl: text("original_url").notNull(),
    transformedUrl: text("transformed_url"),
    transformationConfig: jsonb("transformation_config")
      .$type<TransformationConfig>()
      .default({} as TransformationConfig),
    mediaType: mediaTypeEnum("media_type").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    index("media_userId_idx").on(table.userId),
    index("media_createdAt_idx").on(table.createdAt),
  ]
);

const baseSchema = createInsertSchema(media, {
  fileName: (schema) =>
    schema
      .min(1, { message: "File name is required" })
      .max(255, { message: "File name cannot exceed 255 characters" })
      .regex(/^[^<>:"/\\|?*]+$/, {
        message: "File name contains invalid characters.",
      }),
  originalUrl: z.url({ message: "Please provide a valid original URL" }),
  transformedUrl: z
    .url({ message: "Please provide a valid transformed URL." })
    .optional(),
  mediaType: (schema) => schema,
}).pick({
  fileName: true,
  originalUrl: true,
  transformedUrl: true,
  mediaType: true,
});

export const createMediaSchema = z.object({
  fileName: baseSchema.shape.fileName,
  originalUrl: baseSchema.shape.originalUrl,
  mediaType: baseSchema.shape.mediaType,
  transformedUrl: baseSchema.shape.transformedUrl,
  transformationConfig: z.any().optional(),
});

export const updateMediaSchema = z.object({
  id: z.uuid({ message: "Please provide a valid media ID." }),
  fileName: baseSchema.shape.fileName.optional(),
  originalUrl: baseSchema.shape.originalUrl.optional(),
  transformedUrl: baseSchema.shape.transformedUrl,
  mediaType: baseSchema.shape.mediaType.optional(),
  transformationConfig: z.any().optional(),
});

export const mediaQuerySchema = z.object({
  id: z.uuid({ message: "Please provide a valid media ID." }),
});

export const mediaRelations = relations(media, ({ one }) => ({
  owner: one(user, {
    fields: [media.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  media: many(media),
}));

export type SelectMediaModel = InferSelectModel<typeof media>;
export type CreateMediaParams = z.infer<typeof createMediaSchema>;
export type UpdateMediaParams = z.infer<typeof updateMediaSchema>;
export type MediaQueryParams = z.infer<typeof mediaQuerySchema>;
