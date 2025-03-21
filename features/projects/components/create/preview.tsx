import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  CalendarDaysIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  FileIcon,
  CircleDollarSignIcon,
  BathIcon,
  BedIcon,
  CoinsIcon
} from 'lucide-react';
import { YouTubePlayer } from '@/features/file-upload/components/youtube-player';
import {
  CreateFile,
  CreateFormProps,
  CreateProjectRequestDto
} from '@/features/projects/types/app';
import { formatDate } from '@/lib/dates';
import { Separator } from '@/components/ui/separator';
import { useFileObjectUrl } from '@/features/file-upload/hooks/use-file-object-url';
import { ImagePreview } from './image-preview';
import { useS3Upload } from 'next-s3-upload';
import { isBrowserFile } from '@/features/projects/types/guards';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { GENERIC_ERROR_MESSAGE } from '@/constants/strings';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';

export const Preview = ({
  disablePreviousStep,
  showNextStep,
  previewData,
  backAction,
  onCompleteAction
}: CreateFormProps) => {
  const { uploadToS3 } = useS3Upload();
  const { toastSuccess, toastError } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createProject = api.project.createProject.useMutation({
    onSuccess: (project) => {
      toastSuccess({ message: 'Project created successfully' });

      router.push(`/admin/projects/${project.id}`);
    },
    onError: (error) => {
      toastError({ message: GENERIC_ERROR_MESSAGE });
    }
  });

  if (!previewData) {
    return null;
  }

  const submitProject = async () => {
    setIsLoading(true);
    const images = previewData.mediaDetails.images;

    const uploadedImages: CreateFile[] = (
      await Promise.all(
        images.map(async (imageFile) => {
          // Skip if not a browser File
          if (!isBrowserFile(imageFile)) {
            console.warn('Invalid file type encountered:', imageFile);
            return;
          }

          const { url: fileUploadUrl } = await uploadToS3(imageFile, {});
          if (!fileUploadUrl) return;

          return {
            fileUploadUrl,
            mimeType: imageFile.type,
            size: imageFile.size
          };
        })
      )
    ).filter((file): file is CreateFile => !!file);

    const processedData: CreateProjectRequestDto = {
      ...previewData,
      mediaDetails: {
        ...previewData.mediaDetails,
        images: uploadedImages
      }
    };

    await createProject.mutateAsync(processedData);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview Project</CardTitle>
        <CardDescription>
          Review your project details before submission
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* About Project Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">About Project</h2>
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4">
            <InfoItem label="Name" value={previewData.propertyDetails.name} />
            <InfoItem label="Type" value={previewData.propertyDetails.type} />
            <InfoItem
              label="Units"
              value={previewData.propertyDetails.units.toString()}
            />
            <div className="col-span-2">
              <InfoItem
                label="Description"
                value={previewData.propertyDetails.description}
                fullWidth
              />
            </div>
          </div>

          {/* Unit Information */}
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-lg font-medium">Unit Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <InfoItem
                label="Bedrooms"
                value={previewData.propertyDetails.unitDetail.bedrooms.toString()}
                icon={BedIcon}
              />
              <InfoItem
                label="Bathrooms"
                value={previewData.propertyDetails.unitDetail.bathrooms.toString()}
                icon={BathIcon}
              />
              <InfoItem
                label="Toilets"
                value={previewData.propertyDetails.unitDetail.toilets.toString()}
                icon={BathIcon}
              />
              <div className="col-span-3">
                <InfoItem
                  label="Description"
                  value={previewData.propertyDetails.unitDetail.description}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />
        {/* Media Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Media</h2>

          {/* Images */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {previewData.mediaDetails.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg border"
                >
                  {/* @ts-ignore - YouTube component type definition issue with React 18 */}
                  <ImagePreview image={image} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Videos</h3>
            <div className="grid grid-cols-2 gap-4">
              {previewData.mediaDetails.videos.map((url, index) => (
                <div
                  key={index}
                  className="aspect-video overflow-hidden rounded-lg border"
                >
                  <YouTubePlayer url={url} />
                </div>
              ))}
            </div>
          </div>

          {/* Brochure */}
          {previewData.mediaDetails.brochure && (
            <div className="rounded-lg border bg-card p-4">
              <InfoItem
                label="Brochure"
                value={previewData.mediaDetails.brochure}
                icon={FileIcon}
              />
            </div>
          )}
        </section>

        <Separator />
        {/* Investment Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Asset Details</h2>
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4">
            <InfoItem
              label="Available Slots"
              value={previewData.investmentDetails.slots.toString()}
              icon={UsersIcon}
            />
            <InfoItem
              label="Slot Price"
              value={formatCurrency(previewData.investmentDetails.slotPrice)}
              icon={CircleDollarSignIcon}
            />
            <InfoItem
              label="Duration"
              value={`${previewData.investmentDetails.duration} Months`}
              icon={CalendarIcon}
            />
            <InfoItem
              label="ROI"
              value={`${previewData.investmentDetails.roi}%`}
              icon={TrendingUpIcon}
            />
            <InfoItem
              label="Admin Fee"
              value={formatCurrency(previewData.investmentDetails.adminFee)}
              icon={CoinsIcon}
            />
            <InfoItem
              label="Start Date"
              value={formatDate(previewData.investmentDetails.startDate)}
              icon={CalendarDaysIcon}
            />
          </div>
        </section>

        <Separator />
        <Button isLoading={isLoading} onClick={submitProject}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
}

const InfoItem = ({ label, value, icon: Icon, fullWidth }: InfoItemProps) => (
  <div className={fullWidth ? 'space-y-1.5' : 'flex items-center gap-2'}>
    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
    <div className={fullWidth ? 'space-y-1.5' : 'flex items-center gap-2'}>
      <span className="text-sm font-medium text-muted-foreground">
        {label}:
      </span>
      <span className="text-sm">{value}</span>
    </div>
  </div>
);
