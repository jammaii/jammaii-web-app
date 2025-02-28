import { useDropzone } from "react-dropzone";
import { FileUploadPreview } from "./file-upload-preview";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { T } from "@/components/typography";

interface FileUploadDropzoneProps {
  maximum: number;
  files: File[];
  setFiles: (files: File[]) => void;
}

export const FileUploadDropzone = ({
  maximum,
  files,
  setFiles,
}: FileUploadDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    // TODO(DG-461): Add accept to props - I might not always want to accept both.
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      // No need to continue if we have reached the maximum.
      if (files.length === maximum) return;

      const updatedFileList = [
        ...files,
        ...acceptedFiles.slice(0, maximum - files.length),
      ];

      setFiles(updatedFileList);
    },
  });

  const removeFile = (fileIndex: number) => {
    const updatedFileList = files.filter((_, index) => fileIndex !== index);
    setFiles(updatedFileList);
  };

  return (
    <section className="flex flex-col space-y-4">
      <div
        className="flex h-32 flex-col items-center justify-center gap-4 rounded-lg border border-border bg-accent"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <T variant="display/subhead" className="text-balance text-center">
          Drag and drop or click to upload images
        </T>
        <T variant="display/caption" className="text-muted-foreground">
          {`Maximum of ${maximum} images/videos`}
        </T>
      </div>
      <div className="flex justify-center">
        <div className="flex w-96 space-x-2 overflow-x-auto">
          {files.map((file, index) => (
            <div key={index} className="relative flex-shrink-0">
              <FileUploadPreview
                file={file}
                className="relative box-border inline-flex h-32 w-32 rounded-lg border border-border"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0"
                onClick={() => removeFile(index)}
              >
                <XIcon className="h-4 w-4 text-primary" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
