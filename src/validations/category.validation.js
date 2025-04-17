import z from 'zod';

export const categorySchema = {
    createAndUpdate: z.object({
        name: z.string().min(3).max(100)
    })
}