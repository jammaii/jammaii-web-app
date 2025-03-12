import { UserSingleProjectResponse } from './types/app';

export const userProjectSchema: SchemaField<UserSingleProjectResponse>[] = [
  {
    column: 'First Name',
    type: String,
    value: (project) => project.user.firstName
  },
  {
    column: 'Last Name',
    type: String,
    value: (project) => project.user.lastName
  },
  {
    column: 'Middle Name',
    type: String,
    value: (project) => project.user.middleName
  },
  {
    column: 'Email',
    type: String,
    value: (project) => project.user.email
  },
  {
    column: 'Phone Number',
    type: String,
    value: (project) => project.user.phoneNumber
  },
  {
    column: 'Account Number',
    type: String,
    value: (project) => project.user?.bankDetail?.accountNumber ?? ''
  },
  {
    column: 'Bank Name',
    type: String,
    value: (project) => project.user?.bankDetail?.bank ?? ''
  },
  {
    column: 'Account Name',
    type: String,
    value: (project) => project.user?.bankDetail?.accountName ?? ''
  },
  {
    column: 'Total Slots',
    type: Number,
    value: (project) => project.totalSlots
  },
  {
    column: 'Total Amount',
    type: Number,
    value: (project) => project.totalAmount
  },
  {
    column: 'Payout Amount',
    type: Number,
    value: (project) => project.payoutAmount
  }
];
