"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageUpload } from "@/features/file-upload/components/image-upload";
import { Skeleton } from "@/components/ui/skeleton";
import {
  profileUpdateSchema,
  type ProfileUpdateRequestDto,
} from "@/features/auth/types/app";
import { useUser } from "@/hooks/use-user";
import { PhoneNumberInput } from "@/components/ui/phone-input";
import { useEffect } from "react";

interface ProfilePageProps {
  id?: string;
}

export function ProfilePage({ id }: ProfilePageProps) {
  const { toastSuccess, toastError } = useToast();
  const { data: user, isLoading } = api.user.getUser.useQuery({ id });

  const form = useForm<ProfileUpdateRequestDto>({
    resolver: zodResolver(profileUpdateSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        middleName: user.middleName || "",
        phoneNumber: user.phoneNumber || "",
        image: user.image || "",
      });
    }
  }, [user, form]);

  const updateProfile = api.user.updateUserProfile.useMutation({
    onSuccess: () => {
      toastSuccess({ message: "Profile updated successfully" });
    },
    onError: () => {
      toastError({ message: "Failed to update profile" });
    },
  });

  const submit = async (data: ProfileUpdateRequestDto) => {
    console.log("data: ", data);
    await updateProfile.mutateAsync(data);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <div>Something went wrong, retry again</div>;
  }

  console.log("form: ", form.formState);
  console.log("watch: ", form.watch("middleName"));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Edit User Profile" : "Profile Settings"} </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(submit)}>
            <div className="flex flex-col items-center gap-6">
              <Avatar className="h-64 w-64">
                <AvatarImage src={form.watch("image")} />
                <AvatarFallback>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <ImageUpload
                      value={field.value}
                      onChangeAction={field.onChange}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="font-bold">{user.email}</div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
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
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Middle name" {...field} />
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
            </div>

            <div className="flex justify-end">
              <Button type="submit" isLoading={updateProfile.isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </CardContent>
    </Card>
  );
}
