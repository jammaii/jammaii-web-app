'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  FileIcon,
  BathIcon,
  BedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { YouTubePlayer } from '@/features/file-upload/components/youtube-player';
import { addToDate, compareDates } from '@/lib/dates';
import { PurchaseSlotsDialog } from '@/features/users/components/purchase-slots-dialog';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';
import { notFound } from 'next/navigation';
import { AdminProjectHeader } from '@/features/projects/components/admin-project-header';
import { ProjectUsers } from '@/features/projects/components/users/project-users';
import { ProjectTimeline } from '@/features/projects/components/timeline';
import { ImageFullDisplayDialog } from '@/features/general/components/image-full-display-dialog';
import { ProjectShareDialog } from '@/features/projects/components/share-dialog';
import { Countdown } from '../components/countdown';

interface SingleProjectPageProps {
  id: string;
  isAdmin?: boolean;
}

export function SingleProjectPage({ id, isAdmin }: SingleProjectPageProps) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { data, isLoading } = api.project.getProjectById.useQuery({
    id,
    isAdmin
  });

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return <LoadingScreen fullScreen />;
  }

  if (!data) {
    return <p>Something went wrong</p>;
  }

  const openImage = (image: string) => {
    setImageUrl(image);
    setOpen(true);
  };

  const closeImageView = () => setOpen(false);

  const availableSlots = data.slots - data.totalSlotsSold;

  return (
    <>
      {isAdmin && data?.adminDetails && (
        <AdminProjectHeader
          overview={data.adminDetails}
          name={data.name}
          totalSlots={data.slots}
          totalSlotsSold={data.totalSlotsSold}
          projectId={id}
          startDate={data.startDate}
        />
      )}

      <ImageFullDisplayDialog
        imageUrl={imageUrl}
        open={open}
        onOpenChange={closeImageView}
      />

      <Card>
        <CardContent>
          <div className="py-8">
            <div className="grid gap-8">
              {/* Image Carousel Section */}
              <div className="relative rounded-xl border bg-card">
                <div className="relative overflow-hidden" ref={emblaRef}>
                  <div className="flex touch-pan-y">
                    {data.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative min-w-full flex-[0_0_100%]"
                        onClick={() => openImage(image.fileUploadUrl)}
                      >
                        <div className="aspect-[4/3]">
                          <img
                            src={image.fileUploadUrl}
                            alt={`${data.name} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                  onClick={scrollPrev}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
                  onClick={scrollNext}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </Button>

                {/* Thumbnail Navigation */}
                <div className="flex flex-col items-center">
                  <div className="mt-4 flex gap-2 px-4 pb-4 w-72 md:w-full overflow-x-auto">
                    {data.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          emblaApi?.scrollTo(index);
                          setSelectedIndex(index);
                        }}
                        className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 flex-shrink-0 ${
                          selectedIndex === index
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image.fileUploadUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Details Section */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {data.status}
                    </Badge>
                    <ProjectShareDialog />
                  </div>
                  <h1 className="mt-2 text-3xl font-bold">{data.name}</h1>
                  <p className="text-lg text-muted-foreground">{data.type}</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Asset Details</CardTitle>
                    <CardDescription>
                      Asset opportunity information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold">
                        NGN {data.slotPrice.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">per slot</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{data.slots} slots</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{availableSlots} slots available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{data.roi}% ROI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{data.duration} months</span>
                      </div>
                    </div>

                    {data.status === 'CROWDFUNDING' ? (
                      <Countdown startDate={data.startDate} />
                    ) : (
                      <ProjectTimeline
                        startDate={data.startDate}
                        endDate={addToDate(
                          data.startDate,
                          data.duration,
                          'months'
                        )}
                      />
                    )}

                    {!isAdmin &&
                      data.status === 'CROWDFUNDING' &&
                      data.slots > data.totalSlotsSold && (
                        <PurchaseSlotsDialog
                          projectId={data.id}
                          slotPrice={data.slotPrice}
                          availableSlots={availableSlots}
                        />
                      )}

                    <div className="flex justify-center gap-2">
                      <Badge>{data.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>About This Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{data.description}</p>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <BedIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{data.unitDetail.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BathIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{data.unitDetail.bathrooms} Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BathIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{data.unitDetail.toilets} Toilets</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span>Location: {data.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Documents Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.brochure && (
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={data.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileIcon className="mr-2 h-4 w-4" />
                        Download Brochure
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Videos Section */}
            {data.videos.length > 0 && (
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {data.videos.map((url, index) => (
                        <div key={index} className="aspect-video">
                          <YouTubePlayer url={url} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isAdmin && data?.adminDetails && (
        <ProjectUsers details={data.adminDetails} projectId={id} />
      )}
    </>
  );
}
