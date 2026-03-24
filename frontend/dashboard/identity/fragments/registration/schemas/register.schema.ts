import { z } from 'zod';

export const RegisterSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
