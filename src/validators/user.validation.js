import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    enrolledCourses: z.array(z.string()).optional()
});

export const userUpdateSchema = userSchema.partial();

export const otpSchema = z.object({
    email: z.string().email('Invalid email format'),
    otp: z.string().length(6, 'OTP must be exactly 6 characters long'),
});