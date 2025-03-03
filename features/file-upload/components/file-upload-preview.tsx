import { Suspense } from 'react';
import Image from 'next/image';
import { belongsToFileCategory } from '@/features/file-upload/utils';
import { type DivProps } from '@/types/index';
import { cn } from '@/lib/utils';
import { FILE_MIME_TYPE_CATEGORY } from '@/features/file-upload/constants';
import { useFileObjectUrl } from '@/features/file-upload/hooks/use-file-object-url';

interface FileUploadPreviewProps extends DivProps {
  file: File;
}

export const FileUploadPreview = ({
  file,
  className,
  ...props
}: FileUploadPreviewProps) => {
  const { fileUrl } = useFileObjectUrl(file);

  // In practice, this will never happen because file always exists for this
  // component to render.
  if (!fileUrl) return <></>;

  return (
    <div className={cn(className)} {...props}>
      {belongsToFileCategory(file, FILE_MIME_TYPE_CATEGORY.IMAGE) && (
        <div className="absolute h-full w-full">
          <Image
            fill
            alt="Selected image preview"
            src={fileUrl}
            sizes="100%"
            className="absolute inset-0 object-cover"
          />
        </div>
      )}

      {/* {belongsToFileCategory(file, FILE_MIME_TYPE_CATEGORY.VIDEO) && (
        <Suspense fallback={<p>Loading video...</p>}>
          <ReactPlayer
            url={fileUrl}
            controls={true}
            width="100%"
            height="100%"
            className="absolute inset-0 object-contain"
          />
        </Suspense>
      )} */}
    </div>
  );
};
