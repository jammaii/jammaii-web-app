'use client';

import { ProjectResponseDto } from '@/features/projects/types/app';
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
  CalendarDaysIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  FileIcon,
  CircleDollarSignIcon,
  BathIcon,
  BedIcon,
  Share2Icon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { YouTubePlayer } from '@/features/file-upload/components/youtube-player';
import { formatDate } from '@/lib/dates';
import { defaultProject } from '@/constants/mock';

interface SingleProjectPageProps {
  id: string;
}

export function SingleProjectPage({ id }: SingleProjectPageProps) {
  const project: ProjectResponseDto | undefined = defaultProject.find(
    (p) => p.id === id
  );

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!project) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <div className="container mx-auto py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Carousel Section */}
            <div className="relative rounded-xl border bg-card">
              <div className="relative overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {project.mediaDetails.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative min-w-full flex-[0_0_100%]"
                    >
                      <div className="aspect-[4/3]">
                        <img
                          src={image}
                          alt={`${project.propertyDetails.name} ${index + 1}`}
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
              <div className="mt-4 flex gap-2 px-4 pb-4">
                {project.mediaDetails.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                      selectedIndex === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Share2Icon className="h-4 w-4" />
                  </Button>
                </div>
                <h1 className="mt-2 text-3xl font-bold">
                  {project.propertyDetails.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {project.propertyDetails.type}
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Details</CardTitle>
                  <CardDescription>
                    Investment opportunity information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">
                      NGN {project.investmentDetails.slotPrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">per slot</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{project.investmentDetails.slots} slots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{project.investmentDetails.roi}% ROI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{project.investmentDetails.duration} months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {formatDate(project.investmentDetails.startDate)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full">Invest Now</Button>
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
                <p className="text-muted-foreground">
                  {project.propertyDetails.description}
                </p>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <BedIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {project.propertyDetails.unitDetail.bedrooms} Bedrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BathIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {project.propertyDetails.unitDetail.bathrooms} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BathIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {project.propertyDetails.unitDetail.toilets} Toilets
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {project.mediaDetails.brochure && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.mediaDetails.brochure}
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
          {project.mediaDetails.videos.length > 0 && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Property Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.mediaDetails.videos.map((url, index) => (
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
  );
}
