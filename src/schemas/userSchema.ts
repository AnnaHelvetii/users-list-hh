import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(2, "Введите минимум 2 символа").max(64, "Введите максимум 64 символа"),
	username: z.string().min(2, "Введите минимум 2 символа").max(64, "Введите максимум 64 символа"),
	email: z.email("Неверный формат почты"),
	city: z.string().min(2, "Введите минимум 2 символа").max(64, "Введите максимум 64 символа"),
	phone: z.string().regex(/^\d+$/, "Неверный формат номера телефона"),
	company: z.string().min(2, "Введите минимум 2 символа").max(64, "Введите максимум 64 символа")
});

export type UserFormValues = z.infer<typeof userSchema>