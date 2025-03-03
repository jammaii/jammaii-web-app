'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  ProfileUpdateRequestDto,
  profileUpdateSchema
} from '@/features/auth/types/app';
import { AuthCard } from '@/features/auth/components/auth-card';
import { CopyrightText } from '@/features/general/components/copyright';
import { PhoneNumberInput } from '@/components/ui/phone-input';
import { api } from '@/lib/api';
import { GENERIC_ERROR_MESSAGE } from '@/constants/strings';
import { useUserStore } from '@/hooks/stores/user.store';

export function CompleteProfilePage() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const { toastSuccess, toastError } = useToast();

  const updateUserProfile = api.user.updateUserProfile.useMutation({
    onSuccess: (user) => {
      toastSuccess({ message: 'Profile updated successfully' });

      // Update user in store.
      setUser(user);

      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        router.push('/admin');
        return;
      }
      router.push('/user');
    },
    onError: (error) => {
      toastError({ message: GENERIC_ERROR_MESSAGE });
    }
  });

  const form = useForm<ProfileUpdateRequestDto>({
    resolver: zodResolver(profileUpdateSchema)
  });

  const completeUserProfile = async (data: ProfileUpdateRequestDto) => {
    await updateUserProfile.mutateAsync({ ...data, isNewUser: true });
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-muted/40" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <AuthCard
            headerContent={
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Welcome to Jammaii</h1>
                <p className="text-sm text-muted-foreground">
                  Complete your profile to get started!
                </p>
              </div>
            }
            footerContent={<CopyrightText />}
          >
            <Form {...form}>
              <form
                className="flex flex-col space-y-4"
                onSubmit={form.handleSubmit(completeUserProfile)}
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="firstName">First Name</Label>
                      <FormControl>
                        <Input placeholder="first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="lastName">Last Name</Label>
                      <FormControl>
                        <Input placeholder="last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="middleName">Middle Name (optional)</Label>
                      <FormControl>
                        <Input placeholder="middle name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <PhoneNumberInput
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Enter phone number"
                />
                <Button type="submit" isLoading={updateUserProfile.isPending}>
                  Finish
                </Button>
              </form>
            </Form>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
