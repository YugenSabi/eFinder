import { z } from 'zod';

export const RegisterSchema = z.object({
  accountType: z.enum(['participant', 'organizer']),
  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .email('Введите корректный email'),
  firstName: z.string().trim().min(1, 'Введите имя'),
  lastName: z.string().trim().min(1, 'Введите фамилию'),
  password: z
    .string()
    .min(1, 'Введите пароль')
    .min(8, 'Пароль должен содержать минимум 8 символов'),
  repeatPassword: z.string().min(1, 'Повторите пароль'),
  organizationName: z.string().trim().optional(),
  organizationBio: z.string().trim().optional(),
  organizationWebsite: z.string().trim().optional(),
  organizationTelegram: z.string().trim().optional(),
  organizationVk: z.string().trim().optional(),
  organizationLogoUrl: z.string().trim().optional(),
}).superRefine((data, context) => {
  if (data.password !== data.repeatPassword) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Пароли не совпадают',
      path: ['repeatPassword'],
    });
  }

  if (
    data.accountType === 'organizer' &&
    (!data.organizationName || data.organizationName.trim().length === 0)
  ) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Введите название организации',
      path: ['organizationName'],
    });
  }
});

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
