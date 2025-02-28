import type { FileType } from "@/features/file-upload/types";
import {
  type FILE_MIME_TYPE_CATEGORY,
  FILE_TYPE_TO_FILE_INPUT_ACCEPT_MAP,
} from "@/features/file-upload/constants";
import type { File as BufferFile } from "buffer";
import { NonEmptyArray } from "@/types/index";

export const getInputAcceptFromCustomFileTypes = (
  fileTypes: NonEmptyArray<FileType>,
) => {
  return Array.from(new Set(fileTypes))
    .map((fileType) => FILE_TYPE_TO_FILE_INPUT_ACCEPT_MAP[fileType])
    .join(",");
};

export const isFileSizeExceeded = (
  file: File | BufferFile,
  maxFileSizeInBytes: number,
) => file.size > maxFileSizeInBytes;

/**
 * Constructs file name given the base name and extension.
 * E.g name = file, extension = png => file.png
 */
export const constructFileName = (name: string, extension: string) =>
  `${name}.${extension}`;

export const belongsToFileCategory = <
  T extends { type?: string; mimeType?: string },
>(
  file: T,
  target: FILE_MIME_TYPE_CATEGORY,
) => {
  const fileMimeType = file.type || file.mimeType;

  if (!fileMimeType) return false;

  return fileMimeType.startsWith(target);
};

export const belongsToFileType = <
  T extends { type?: string; mimeType?: string },
>(
  file: T,
  target: FileType,
) => {
  const fileMimeType = file.type || file.mimeType;

  if (!fileMimeType) return false;

  FILE_TYPE_TO_FILE_INPUT_ACCEPT_MAP[target].split(",").includes(fileMimeType);
};
