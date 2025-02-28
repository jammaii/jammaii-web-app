import { NonEmptyArray } from "@/types";
import { FileType } from "@/features/file-upload/types";

export enum FILE_MIME_TYPE_CATEGORY {
  IMAGE = "image/",
  APPLICATION = "application/",
  TEXT = "text/",
  VIDEO = "video/",
}

export const FILE_TYPE_TO_FILE_INPUT_ACCEPT_MAP: {
  [fileType in FileType]: string;
} = {
  pdf: `${FILE_MIME_TYPE_CATEGORY.APPLICATION}pdf`,
  png: `${FILE_MIME_TYPE_CATEGORY.IMAGE}png`,
  jpg: `${FILE_MIME_TYPE_CATEGORY.IMAGE}jpeg,${FILE_MIME_TYPE_CATEGORY.IMAGE}jpg`,
  csv: `${FILE_MIME_TYPE_CATEGORY.TEXT}csv`,
  webp: `${FILE_MIME_TYPE_CATEGORY.IMAGE}webp`,
};

export const PROJECT_IMAGE_TYPES: NonEmptyArray<FileType> = ["jpg", "png"];
