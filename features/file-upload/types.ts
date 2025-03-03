export type ImageType = 'jpg' | 'png' | 'webp';

export type FileType = 'pdf' | 'csv' | ImageType;

export type FileCategory = 'image' | 'video';
export type FileCategoryType = Record<FileCategory, Record<string, string[]>>;

export type Crop = { x: number; y: number; width: number; height: number };

export type SupplementaryFileVariant = 'blurred';

export type FileManipulationOptions = {
  blur?: boolean;
};

// File representation for files that are already uploaded (usually from drive).
// Giving it a specific type allows for better handling in the file processing
// workflow.
export type AlreadyUploadedFile = { url: string; mimeType: string };

export type ImageUploadAction = 'save' | 'delete';
