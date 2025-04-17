import { Product } from "../models/product.model.js";

export const productController = {
    create: async (req, res, next) => {
        try {
            const product = new Product(req.body);
            await product.save();

            res.status(201).send(product);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const product = await Product.findByIdAndUpdate(
                id, body,
                { new: true }
            );

            if (!product) {
                return res.status(404).send("Product not found");
            }

            res.status(200).send(product);
        } catch (err) {
            next(err);
        }
    },
    findAll: async (req, res, next) => {
        try {
            // const { page = 1, limit = 10, lang = "uz", mode = "dark" } = req.query;
            // const [fValue, sValues] = userList;
            // const page = req.query.page || 1
            // const limit = req.query.limit || 10

            // const products = await Product.find()
            //     .populate("category", "name")
            //     .limit(limit * 1)
            //     .skip((page - 1) * limit)
            //     .sort({ createdAt: -1 });

            const products = await Product.find();

            res.status(200).send(products);
        } catch (err) {
            next(err);
        }
    },
    findOne: async (req, res, next) => {
        try {
            const { id } = req.params;

            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).send("Product not found");
            }

            res.status(200).send(product);
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                return res.status(404).send("Product not found");
            }

            res.status(200).send("Product deleted successfully");
        } catch (err) {
            next(err);
        }
    },
};