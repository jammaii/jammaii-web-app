import { useFileObjectUrl } from "@/features/file-upload/hooks/use-file-object-url";

interface ImagePreviewProps {
  image: globalThis.File; // Explicitly use browser's File type
  index: number;
}

export const ImagePreview = ({ image, index }: ImagePreviewProps) => {
  const { fileUrl } = useFileObjectUrl(image);

  if (!fileUrl) return null;

  return (
    <div className="aspect-square overflow-hidden rounded-lg border">
      <img
        src={fileUrl}
        alt={`Preview ${index + 1}`}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
