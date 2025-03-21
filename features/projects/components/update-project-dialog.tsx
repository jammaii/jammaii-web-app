'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/hooks/use-user';
import {
  updateProjectSchema,
  UpdateProjectRequestDto
} from '@/features/projects/types/app';
import { DatePicker } from '@/components/ui/date-picker';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface UpdateProjectDialogProps {
  projectId: string;
  startDate: Date;
}

export function UpdateProjectDialog({
  projectId,
  startDate
}: UpdateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { toastSuccess, toastError } = useToast();

  const updateProject = api.project.updateProject.useMutation({
    onSuccess: () => {
      toastSuccess({ message: 'Project updated successfully' });
      setOpen(false);

      // Reload page to reflect changes
      window.location.reload();
    },
    onError: () => {
      toastError({ message: 'Failed to update project' });
    }
  });

  const form = useForm<UpdateProjectRequestDto>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      projectId,
      startDate
    }
  });

  const onSubmit = async (data: UpdateProjectRequestDto) => {
    await updateProject.mutateAsync(data);
  };

  if (!user) {
    return;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Edit Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>Sensitive data, be careful.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      onChange={(date) => {
                        // Handles it as a UTC date, otherwise the date will be
                        // off by 1 day.
                        field.onChange(
                          new Date(
                            Date.UTC(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                          )
                        );
                      }}
                      onDateError={(error) => {
                        if (error) {
                          form.setError('startDate', {
                            message: error,
                            type: 'onChange'
                          });
                        } else {
                          form.clearErrors('startDate');
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
