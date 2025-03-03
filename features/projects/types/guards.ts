import {
  PropertyDetailsRequestDto,
  PropertyMediaPreview,
  PropertyInvestmentRequestDto
} from './app';

export const isPropertyDetails = (
  data: unknown
): data is PropertyDetailsRequestDto => {
  const details = data as PropertyDetailsRequestDto;
  return (
    typeof details?.name === 'string' &&
    typeof details?.description === 'string' &&
    typeof details?.type === 'string' &&
    typeof details?.units === 'number' &&
    typeof details?.unitDetail?.description === 'string' &&
    typeof details?.unitDetail?.bedrooms === 'number' &&
    typeof details?.unitDetail?.bathrooms === 'number' &&
    typeof details?.unitDetail?.toilets === 'number'
  );
};

export const isPropertyPreviewMedia = (
  data: unknown
): data is PropertyMediaPreview => {
  const media = data as PropertyMediaPreview;
  return (
    Array.isArray(media?.images) &&
    Array.isArray(media?.videos) &&
    (!media.brochure || typeof media.brochure === 'string')
  );
};

export const isPropertyInvestment = (
  data: unknown
): data is PropertyInvestmentRequestDto => {
  const investment = data as PropertyInvestmentRequestDto;
  return (
    typeof investment?.slots === 'number' &&
    typeof investment?.slotPrice === 'number' &&
    typeof investment?.duration === 'number' &&
    typeof investment?.roi === 'number' &&
    investment?.startDate instanceof Date
  );
};

// Helper function to check if all required forms are complete
export const isCreateProjectFormComplete = (
  details?: PropertyDetailsRequestDto,
  media?: PropertyMediaPreview,
  investment?: PropertyInvestmentRequestDto
): boolean => {
  return (
    isPropertyDetails(details) &&
    isPropertyPreviewMedia(media) &&
    isPropertyInvestment(investment)
  );
};

export function isBrowserFile(file: any): file is File {
  return file instanceof File;
}
