import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const authController ={
    signUp: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await User.findOne(
                { email: body.email }
            ).exec();

            if (user) {
                return res.status(409).send('User already exists');
            }

            // const hashedPassword = await bcrypt.hash(body.password, 10);
            // body.password = hashedPassword;

            const newUser = new User(body);
            await newUser.save();

            res.status(201).send({ message: 'User created successfully', user: newUser });
        } catch (error) {
            next(error)   
        }
    },
    signIn: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await User.findOne(
                { email: body.email }
            ).exec();

            if (!user) {
                return res.status(404).send('User not found');
            }

            // const isPasswordValid = await bcrypt.compare(body.password, user.password);

            // if (!isPasswordValid) {
            //     return res.status(401).send('Invalid password');
            // }

            res.status(200).send('Sign in successful');
        } catch (error) {
            next(error)   
        }
    }
}