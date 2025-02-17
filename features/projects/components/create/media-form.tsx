'use client';

import { Button } from '@/components/ui/button';
import { FileUploadDropzone } from '@/features/file-upload/components/file-upload-dropzone';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  CreateFormProps,
  PropertyMediaRequestDto,
  propertyMediaSchema
} from '@/features/projects/types/app';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import YouTube from 'react-youtube';
import { getYouTubeID } from '@/features/projects/utils';
import { Separator } from '@/components/ui/separator';

export const MediaForm = ({
  disablePreviousStep,
  showNextStep,
  backAction,
  onCompleteAction
}: CreateFormProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  const form = useForm<PropertyMediaRequestDto>({
    resolver: zodResolver(propertyMediaSchema),
    defaultValues: {
      images: [],
      videos: []
    }
  });

  const saveMediaDetails = async (data: PropertyMediaRequestDto) => {
    const resolvedData = { ...data, images };
    console.log('data', resolvedData);
    onCompleteAction(resolvedData);
  };

  const directUpload = (
    <div>
      <FileUploadDropzone maximum={10} files={images} setFiles={setImages} />
      <div className="flex justify-between border-t-2 py-2">
        <div>Selected {images.length} items</div>
      </div>
    </div>
  );

  const videosPreview = videos.map((url, index) => {
    const videoId = getYouTubeID(url);
    if (!videoId) return null;

    return (
      <div key={index} className="flex">
        <YouTube
          videoId={videoId}
          opts={{
            height: '160',
            width: '200',
            playerVars: {
              autoplay: 0
            }
          }}
        />
      </div>
    );
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4"
        onSubmit={form.handleSubmit(saveMediaDetails)}
      >
        <h2 className="text-center font-bold">MEDIA INFORMATION</h2>

        {directUpload}
        <Separator />

        <FormField
          control={form.control}
          name="videos"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="videos">Videos</Label>

              <div className="flex gap-2">{videosPreview}</div>
              <FormControl>
                <div className="space-y-2">
                  {field.value?.map((url: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Youtube Video URL"
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...(field.value || [])];
                          newUrls[index] = e.target.value;
                          field.onChange(newUrls);
                          setVideos(newUrls);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newUrls = field.value?.filter(
                            (_, i) => i !== index
                          );
                          field.onChange(newUrls);
                        }}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      field.onChange([...(field.value || []), '']);
                    }}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Video URL
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brochure"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="brochure">Brochure</Label>
              <FormControl>
                <Input placeholder="Enter brochure URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={backAction}
            disabled={disablePreviousStep}
          >
            Previous
          </Button>
          {showNextStep ? (
            <Button type="submit">Next</Button>
          ) : (
            <Button type="submit">Preview</Button>
          )}
        </div>
      </form>
    </Form>
  );
};
