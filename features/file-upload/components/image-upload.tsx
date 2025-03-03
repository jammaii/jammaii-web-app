'use client';

import { useS3Upload } from 'next-s3-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChangeAction: (url: string) => void;
  className?: string;
}

export function ImageUpload({
  value,
  onChangeAction,
  className
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { uploadToS3 } = useS3Upload();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const { url } = await uploadToS3(file);
      onChangeAction(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <Input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="imageUpload"
      />
      <Button type="button" variant="outline" asChild disabled={isUploading}>
        <label htmlFor="imageUpload" className="cursor-pointer">
          <UploadCloud className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </label>
      </Button>
    </div>
  );
}
