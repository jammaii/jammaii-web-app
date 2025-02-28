export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Basic phone number validation: starts with + and contains 10-15 digits
  const phoneRegex = /^\+[1-9]\d{10,14}$/;
  return phoneRegex.test(phoneNumber);
};
