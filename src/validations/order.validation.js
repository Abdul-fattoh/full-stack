import mongoose from 'mongoose';
import z from 'zod';

export const orderSchema = {
    create: z.object({
        status: z.enum(["processing", "shipped", "delivered"]),
        total: z.number().min(0),
        user: z.string().refine((val) => {
            return mongoose.Types.ObjectId.isValid(val);
        }),
        product: z.string().refine((val) => {
            return mongoose.Types.ObjectId.isValid(val);
        })
    }),
    update: z.object({
        status: z.enum(["processing", "shipped", "delivered"]).optional(),
        total: z.number().min(0).optional(),
        user: z.string().refine((val) => {
            return mongoose.Types.ObjectId.isValid(val);
        }).optional(),
        product: z.string().refine((val) => {
            return mongoose.Types.ObjectId.isValid(val);
        }).optional()
    })
};