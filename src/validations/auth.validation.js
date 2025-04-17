import z from 'zod';

export const authSchema = {
    signUp: z.object({
        full_name: z.string(),
        email: z.string().email(),
        password: z.string().min(5).max(15)
    }),
    signIn: z.object({
        email: z.string().email(),
        password: z.string().min(5).max(15)
    })
}