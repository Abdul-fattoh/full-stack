import bcrypt from 'bcrypt';

import { User } from '../models/user.model.js';
import { jwtAccessTokenGenerator, jwtRefreshTokenGenerator, CustomError, jwtRefreshTokenVerify, UserNotFoundError } from '../common/index.js';

export const authController = {
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

            const { password, ...userWithOutPassword } = newUser._doc;

            res.status(201).send({ message: 'User created successfully', user: userWithOutPassword });
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

            const payload = {
                sub: user._id,
                full_name: user.full_name,
                email: user.email
            }

            const accessToken = jwtAccessTokenGenerator(payload);
            const refreshToken = jwtRefreshTokenGenerator(payload);

            res.status(200).send({
                message: 'Sign in successful',
                tokens: {
                    accessToken,
                    refreshToken
                }
            });
        } catch (error) {
            res.status(error.statusCode).json({
                message: error.message,
                data: error,
            });
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const body = req.body;
            // throw new CustomError("Message", 399)
            const decoded = jwtRefreshTokenVerify(body.refreshToken);
            const user = await User.findById(decoded.sub, "email");

            const accessPayload = {
                sub: decoded.sub,
                role: "user",
            };

            const accessToken = jwtAccessTokenGenerator(accessPayload);

            res.send({
                ok: true,
                message: "successfully",
                data: {
                    accessToken,
                    refreshToken: body.refreshToken,
                },
            });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const message = error.message || "Internal server error";

            res.status(statusCode).json({
                message,
                data: error,
            });
        }
    }
}