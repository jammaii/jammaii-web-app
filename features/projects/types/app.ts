import { PROJECT_IMAGE_TYPES } from '@/features/file-upload/constants';
import {
  booleanSchema,
  dateSchema,
  fileSchema,
  genericStringSchema,
  idSchema,
  numberSchema
} from 'validation/shared.schema';
import { z } from 'zod';
import type { File as BufferFile } from 'buffer';
import { getByIdSchema, PaginatedResponse } from '@/features/general/types/app';
import { PROJECT_STATUSES } from '@/server/db/schemas/project/enums/project-status.schema';
import { UserResponse } from '@/features/users/types/app';

export const propertyUnitSchema = z.object({
  description: genericStringSchema('Description', 1, 2000, true, true),
  bedrooms: numberSchema('Bedrooms', { min: 1 }),
  bathrooms: numberSchema('Bathrooms', { min: 1 }),
  toilets: numberSchema('Toilets', { min: 1 })
});

export const propertyDetailsSchema = z.object({
  name: genericStringSchema('Project Name', 1, 50, true, true),
  description: genericStringSchema('Description', 1, 2000, true, true),
  type: genericStringSchema('Type', 1, 50, true, true),
  location: genericStringSchema('Location', 5, 200, true, true),
  units: numberSchema('Units', { min: 1 }),
  unitDetail: propertyUnitSchema
});
export type PropertyDetailsRequestDto = z.infer<typeof propertyDetailsSchema>;

const mediaSchema = z.object({
  videos: z.array(genericStringSchema('Video', 5, 200, true, true)),
  brochure: genericStringSchema('Brochure', 1, 200, true, true).optional()
});

export const createFileSchema = z.object({
  fileUploadUrl: genericStringSchema('File upload URL', 1, 1000, true, true),
  mimeType: genericStringSchema('MIME type', 1, 1000, true, true),
  size: numberSchema('Size', { min: 5, max: 10_000_000 /*bytes*/ }) // Max 10mb per file
});
export type CreateFile = z.infer<typeof createFileSchema>;

export const propertyMediaSchema = z.object({
  images: z.array(createFileSchema),
  ...mediaSchema.shape
});
export type PropertyMediaRequest = z.infer<typeof propertyMediaSchema>;

export const properyMediaPreviewSchema = z.object({
  images: z.array(fileSchema('Images', PROJECT_IMAGE_TYPES)),
  ...mediaSchema.shape
});
export type PropertyMediaPreview = {
  images: (File | BufferFile)[];
  videos: string[];
  brochure: string;
};

export const propertyInvestmentSchema = z.object({
  slots: numberSchema('Slots', { min: 1 }),
  slotPrice: numberSchema('Slot Price', { min: 100 }),
  duration: numberSchema('Duration', { min: 1 }),
  roi: numberSchema('ROI', { min: 1 }),
  adminFee: numberSchema('Admin Fee', { min: 1 }),
  startDate: dateSchema('Start Date')
});
export type PropertyInvestmentRequestDto = z.infer<
  typeof propertyInvestmentSchema
>;

export const createProjectSchema = z.object({
  propertyDetails: propertyDetailsSchema,
  mediaDetails: propertyMediaSchema,
  investmentDetails: propertyInvestmentSchema
});
export type CreateProjectRequestDto = z.infer<typeof createProjectSchema>;

export const getSingleProjectSchema = z.object({
  isAdmin: booleanSchema('isAdmin').optional(),
  ...getByIdSchema.shape
});

export type CreateProjectPreview = {
  propertyDetails: PropertyDetailsRequestDto;
  mediaDetails: PropertyMediaPreview;
  investmentDetails: PropertyInvestmentRequestDto;
};

export type CreateFormDto =
  | PropertyDetailsRequestDto
  | PropertyMediaPreview
  | PropertyInvestmentRequestDto;

export interface CreateFormProps {
  disablePreviousStep: boolean;
  showNextStep: boolean;
  previewData: CreateProjectPreview | null;
  backAction: () => void;
  onCompleteAction: (data: CreateFormDto) => void;
}

export const createUserInvestmentSchema = z.object({
  totalAmount: numberSchema('Amount'),
  slots: numberSchema('Slots', { min: 1 }),
  transactionReference: genericStringSchema(
    'Transaction reference',
    1,
    200,
    true,
    true
  ),
  projectId: idSchema('Project id')
});
export type CreateUserInvestmentDto = z.infer<
  typeof createUserInvestmentSchema
>;

export interface ProjectResponseDto {
  id: string;
  status: ProjectStatus;
  propertyDetails: {
    name: string;
    description: string;
    type: string;
    units: number;
    unitDetail: {
      description: string;
      bedrooms: number;
      bathrooms: number;
      toilets: number;
    };
  };
  mediaDetails: {
    images: CreateFile[];
    videos: string[];
    brochure?: string;
  };
  investmentDetails: {
    slots: number;
    slotPrice: number;
    duration: number;
    roi: number;
    startDate: Date;
  };
}

export interface UserSingleProjectResponse {
  user: UserResponse;
  totalSlots: number;
  totalAmount: number;
  roi?: number;
  payoutAmount?: number;
}
export interface AdminProjectDetails {
  totalAmountInvested: number;
  totalInvestors: number;
  investors: {
    users: UserSingleProjectResponse[];
    meta: PaginatedResponse;
  };
}

export interface ProjectResponse {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  type: string;
  location: string;
  units: number;
  unitDetail: {
    description: string;
    bedrooms: number;
    bathrooms: number;
    toilets: number;
  };
  images: CreateFile[];
  videos: string[];
  brochure?: string | null;
  slots: number;
  slotPrice: number;
  totalSlotsSold: number;
  duration: number;
  roi: number;
  startDate: Date;
  userId: string;
  metaCreatedAt: Date;
  metaUpdatedAt: Date | null;
  adminDetails?: AdminProjectDetails;
}

export type ProjectsResponse = {
  projects: ProjectResponse[];
  meta: PaginatedResponse;
};

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
