import {Course} from '../models/course.model.js';

export const courseController = {
    create: async (req, res, next) => {
        try {
            const course = new Course(req.body);
            await course.save();
            res.status(201).json(course);
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const courses = await Course.find();
            res.status(200).json(courses);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const course = await Course.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}