import { Order } from "../models/order.model.js";

export const orderController = {
    create: async (req, res, next) => {
        try {
            const user = req.user;
            const newOrder = new Order({
                ...req.body,
                user: user._id
            });
            await newOrder.save();

            const data = await Order.findById(newOrder._id).populate('user');

            res.status(201).send(data);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).send("Order not found");
            }

            const data = await Order.findById(updatedOrder._id).populate('user');

            res.status(200).send(data);
        } catch (err) {
            next(err);
        }
    },
    findAll: async (req, res, next) => {
        try {
            const orders = await Order.find().populate('user');

            res.status(200).send(orders);
        } catch (err) {
            next(err);
        }
    },
    findOne: async (req, res, next) => {
        try {
            const order = await Order.findById(req.params.id).populate('user');

            if (!order) {
                return res.status(404).send("Order not found");
            }

            res.status(200).send(order);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);

            if (!deletedOrder) {
                return res.status(404).send("Order not found");
            }
            res.status(200).send("Order deleted successfully");
        } catch (err) {
            next(err);
        }
    },
};