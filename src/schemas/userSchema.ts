import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(2).max(64),
	username: z.string().min(2).max(64),
	email: z.email(),
	city: z.string().min(2).max(64),
	phone: z.string().regex(/^\d+$/),
	company: z.string().min(2).max(64)
});

export type UserFormValues = z.infer<typeof userSchema>