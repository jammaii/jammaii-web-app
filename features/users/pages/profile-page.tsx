'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageUpload } from '@/features/file-upload/components/image-upload';
import { Skeleton } from '@/components/ui/skeleton';
import {
  profileUpdateSchema,
  type ProfileUpdateRequestDto
} from '@/features/auth/types/app';
import { PhoneNumberInput } from '@/components/ui/phone-input';
import { UserResponse } from '../types/app';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import {
  AccountValidationResponse,
  BankProperty,
  Nuban
} from 'ng-bank-account-validator';
import { useEffect, useMemo, useState } from 'react';
import { LoadingSpinner } from '@/components/general/loading-spinner';

interface ProfilePageProps {
  proxy?: boolean;
  user: UserResponse;
}

export function ProfilePage({ proxy, user }: ProfilePageProps) {
  const { toastSuccess, toastError } = useToast();
  const [userDetails, setUserDetails] = useState<AccountValidationResponse>();

  const form = useForm<ProfileUpdateRequestDto>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      middleName: user.middleName ?? '',
      phoneNumber: user.phoneNumber ?? '',
      image: user.image ?? '',
      bankDetail: {
        bank: user?.bankDetail?.bank ?? '',
        code: user?.bankDetail?.code ?? '',
        accountNumber: user?.bankDetail?.accountNumber ?? '',
        accountName: user?.bankDetail?.accountName ?? ''
      }
    }
  });

  const updateProfile = api.user.updateUserProfile.useMutation({
    onSuccess: () => {
      toastSuccess({ message: 'Profile updated successfully' });
    },
    onError: () => {
      toastError({ message: 'Failed to update profile' });
    }
  });

  const onSubmit = async (data: ProfileUpdateRequestDto) => {
    await updateProfile.mutateAsync(data);
  };

  const accountNumber = form.watch('bankDetail.accountNumber');
  const bankCode = form.watch('bankDetail.code');

  const verifyAccount = api.user.verifyAccount.useMutation({
    onSuccess: (data) => {
      const bankName = Nuban.getBank(bankCode, BankProperty.OLD_CODE)?.name;

      if (!bankName) {
        toastError({ message: 'Validation failed' });
        return;
      }

      form.setValue('bankDetail.accountName', data.data?.account_name ?? '');
      form.setValue('bankDetail.bank', bankName);
      setUserDetails(data);
    },
    onError: (error) => {
      toastError({ message: error.message });
    }
  });

  useEffect(() => {
    if (accountNumber?.length === 10 && bankCode) {
      verifyAccount.mutate({
        accountNumber,
        bankCode
      });
    }
  }, [accountNumber, bankCode]);

  // const processedBanks = useMemo(() => {
  //   try {
  //     if (accountNumber?.length === 10) {
  //       return Nuban.getPossibleNubanBanks(accountNumber, Nuban.weightedBanks);
  //     }
  //     return Nuban.weightedBanks;
  //   } catch (error) {
  //     console.error('Error processing banks:', error);
  //     return [] as Bank[];
  //   }
  // }, [accountNumber]);

  const resolveAccount = () => {
    if (userDetails?.status) {
      return <p className="text-xs">{userDetails.data?.account_name}</p>;
    }

    return <p>Invalid account details</p>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {proxy ? 'Edit User Profile' : 'Profile Settings'}{' '}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-6">
              <Avatar className="h-64 w-64">
                <AvatarImage src={form.watch('image')} />
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

            <Separator />

            <h1>Bank Details</h1>

            <FormField
              control={form.control}
              name="bankDetail.accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account number</FormLabel>
                  <FormControl>
                    <Input placeholder="Account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetail.code"
              render={({ field }) => (
                <FormItem className="w-full grow">
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Nuban.weightedBanks.map((bank, index) => {
                            return (
                              <SelectItem
                                key={bank.id}
                                value={bank?.oldCode ?? bank.code}
                              >
                                {bank.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {verifyAccount.isPending && <LoadingSpinner />}

            {!verifyAccount.isPending && userDetails && resolveAccount()}

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

export function ProfileSkeleton() {
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
