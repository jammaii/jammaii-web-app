import React, { useId, type ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import type { DivProps, NonEmptyArray } from '@/types/index';
import type { FileType } from '@/features/file-upload/types';
import { getInputAcceptFromCustomFileTypes } from '@/features/file-upload/utils';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export interface FileUploadInputProps extends DivProps {
  label?: ReactNode;
  acceptMultiple?: boolean;
  fileTypesToAccept?: NonEmptyArray<FileType>;
  onFileAdd: (files: FileList) => void;
}

/**
 * Generic file upload input component.
 * @param label - Label for the file upload input.
 * @param onFileAdd - A function that is called on successful selection of file(s).
 * @param acceptMultiple - Boolean specifying if multiple files can be selected. Defaults to false.
 * @param fileTypesToAccept - List of file types to accept.
 */
export const FileUploadInput = ({
  label,
  acceptMultiple = false,
  fileTypesToAccept,
  onFileAdd,
  className
}: FileUploadInputProps) => {
  // Generate unique input id.
  const inputId = useId();
  return (
    <div className="flex h-full w-full">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input
        type="file"
        // Hack - Removes the default input tool tip.
        title=" "
        id={inputId}
        className={cn('cursor-pointer border-0 p-0 opacity-0', className)}
        multiple={acceptMultiple}
        accept={
          fileTypesToAccept &&
          getInputAcceptFromCustomFileTypes(fileTypesToAccept)
        }
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          onFileAdd(files);
        }}
      />
    </div>
  );
};
