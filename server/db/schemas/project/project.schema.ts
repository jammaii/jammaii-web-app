import { integer, json, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { tableCreator, metaDataSchema } from '@/server/db/schemas';
import { userSchema } from '@/server/db/schemas/auth/user.schema';
import { projectStatusSchema } from './enums/project-status.schema';

export const projectSchema = tableCreator('project', {
  id: uuid('id').notNull().primaryKey(),
  status: projectStatusSchema('status').notNull().default('CROWDFUNDING'),

  // Property Details
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  location: text('location').notNull(),
  units: integer('units').notNull(),
  unitDetail: json('unit_detail')
    .$type<{
      description: string;
      bedrooms: number;
      bathrooms: number;
      toilets: number;
    }>()
    .notNull(),

  // Media Details
  images: json('images')
    .$type<
      {
        fileUploadUrl: string;
        mimeType: string;
        size: number;
      }[]
    >()
    .notNull(),
  videos: json('videos').$type<string[]>().notNull(),
  brochure: text('brochure'),

  // Investment Details
  slots: integer('slots').notNull(),
  slotPrice: integer('slot_price').notNull(),
  duration: integer('duration').notNull(),
  roi: integer('roi').notNull(),
  adminFee: integer('admin_fee').notNull().default(0),
  startDate: timestamp('start_date', { mode: 'date' }).notNull(),

  // Relations
  userId: text('user_id')
    .notNull()
    .references(() => userSchema.id),

  ...metaDataSchema
});
