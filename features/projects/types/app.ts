import {
  dateSchema,
  fileSchema,
  genericStringSchema,
  numberSchema
} from 'validation/shared.schema';
import { z } from 'zod';

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
  units: numberSchema('Units', { min: 1 }),
  unitDetail: propertyUnitSchema
});
export type PropertyDetailsRequestDto = z.infer<typeof propertyDetailsSchema>;

export const propertyMediaSchema = z.object({
  images: z.array(fileSchema('Images', ['jpg', 'png'], 5)),
  videos: z.array(genericStringSchema('Video', 1, 200, true, true)),
  brochure: genericStringSchema('Brochure', 1, 200, true, true).optional()
});
export type PropertyMediaRequestDto = z.infer<typeof propertyMediaSchema>;

export const propertyInvestmentSchema = z.object({
  slots: numberSchema('Slots', { min: 1 }),
  slotPrice: numberSchema('Slot Price', { min: 100 }),
  duration: numberSchema('Duration', { min: 1 }),
  roi: numberSchema('ROI', { min: 1 }),
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

export type CreateFormDto =
  | PropertyDetailsRequestDto
  | PropertyMediaRequestDto
  | PropertyInvestmentRequestDto;

export interface CreateFormProps {
  disablePreviousStep: boolean;
  showNextStep: boolean;
  previewData: CreateProjectRequestDto | null;
  backAction: () => void;
  onCompleteAction: (data: CreateFormDto) => void;
}

export interface ProjectResponseDto {
  id: string;
  status: 'Pending' | 'Active' | 'Completed';
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
    images: string[];
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
