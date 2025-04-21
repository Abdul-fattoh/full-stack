import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["processing", "shipped", "delivered"],
        },
        total: {
            type: Number,
            min: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Order = mongoose.model('Order', orderSchema);