import {User} from '../models/user.model.js';

export const userController = {
    profile: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).exec();

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await User.findByIdAndUpdate(
                req.params.id, 
                body, 
                { new: true }
            ).exec();

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).send({ message: 'User updated successfully', user });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id).exec();

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
}