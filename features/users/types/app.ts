export type UserResponseDto = {
  id: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  createdAt: string;
};

export type UserProjectResponseDto = {
  id: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  name: string;
  slots: number;
  slotPrice: number;
  boughtAt: string;
};

export type UserProjectsResponseDto = {
  id: string;
  user: UserResponseDto;
  project: UserProjectResponseDto[];
};
