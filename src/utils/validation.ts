import { z } from 'zod';

import { COUNTRIES } from '~/constants/countries';

const validateEmail = (email: string): boolean => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [localPart, domain] = parts;
  if (localPart.length === 0) return false;
  if (!domain.includes('.')) return false;
  return true;
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z]/, 'Name must start with a capital letter'),

    age: z
      .number()
      .min(0, 'Age cannot be negative')
      .max(120, 'Age must be less than 120')
      .nullable(),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine(validateEmail, 'Please enter a valid email address (e.g., name@example.com)'),

    gender: z
      .enum(['male', 'female', ''])
      .refine((val) => val !== '', { message: 'Please select a gender' }),

    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'You must accept the Terms and Conditions'),

    image: z
      .string()
      .refine((val) => val !== '', {
        message: 'Profile image is required',
      })
      .optional(),

    password: z.string().min(8, 'Password must be at least 8 characters'),

    confirmPassword: z.string(),

    country: z
      .string()
      .min(1, 'Country is required')
      .refine(
        (val) => (COUNTRIES as readonly string[]).includes(val),
        'Please select a valid country from the list',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
