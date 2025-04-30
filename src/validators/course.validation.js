import {z} from 'zod';

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required").trim(),
    description: z.string().min(1, "Description is required").trim(),
    teacher: z.string().min(1, "Teacher is required").trim()
});

export const courseUpdateSchema = courseSchema.partial();