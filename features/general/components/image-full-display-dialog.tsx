import {
  type CustomDialogProps,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImageFullDisplayDialogProps extends CustomDialogProps {
  imageUrl: string;
}

export function ImageFullDisplayDialog({
  imageUrl,
  ...props
}: ImageFullDisplayDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="h-screen w-screen max-w-full">
        <div className="relative h-full w-full">
          <Image
            fill
            alt="Project image"
            src={imageUrl}
            sizes="100%"
            className="absolute inset-0 object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
