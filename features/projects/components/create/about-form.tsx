'use client';

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
  PropertyDetailsRequestDto
} from '@/features/projects/types/app';
import { propertyDetailsSchema } from '@/features/projects/types/app';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const AboutForm = ({
  disablePreviousStep,
  showNextStep,
  backAction,
  onCompleteAction
}: CreateFormProps) => {
  const form = useForm<PropertyDetailsRequestDto>({
    resolver: zodResolver(propertyDetailsSchema)
  });

  const saveAboutDetails = async (data: PropertyDetailsRequestDto) => {
    onCompleteAction(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4"
        onSubmit={form.handleSubmit(saveAboutDetails)}
      >
        <h2 className="text-center font-bold">GENERAL INFORMATION</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name">Name</Label>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="description">Description</Label>
              <FormControl>
                <Textarea placeholder="Description" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="type">Type</Label>
              <FormControl>
                <Input placeholder="Type of property" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="units">Units</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter number of units"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="location">Location</Label>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <h2 className="text-center font-bold">UNIT INFORMATION</h2>
        <FormField
          control={form.control}
          name="unitDetail.description"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="unit-description">Unit Description</Label>
              <FormControl>
                <Textarea placeholder="Unit Description" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitDetail.bedrooms"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="unit-bedrooms">Unit bedrooms</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Bedrooms per unit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitDetail.bathrooms"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="unit-bathrooms">Unit bathrooms</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Bathrooms per unit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitDetail.toilets"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="unit-toilets">Unit toilets</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Toilets per unit"
                  {...field}
                />
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
