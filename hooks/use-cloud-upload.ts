import { useS3Upload } from "next-s3-upload";
import { useState } from "react";

export const useCloudUpload = async (file: File) => {
  const { uploadToS3 } = useS3Upload();
  const [isUploading, setIsUploading] = useState(false);

  const url = await uploadToS3(file);
  setIsUploading(false);
  return { uploadToS3 };
};
