import { compare, hash } from 'bcrypt';

import { User } from '../models/user.model.js';
import { otpGenerator } from '../library/otp.generator.js';
import { getCache, setCache } from '../library/cache.js';
import { transporter } from '../library/mailer.js';

export const userController = {
    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await hash(req.body.password, 10);
            const newUser = new User({ ...req.body, password: hashedPassword });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // res.status(200).json(token);

            const otp = otpGenerator();
            const mailMessage = {
                from: process.env.SMTP_USER,
                // to: 'dilshod7861@gmail.com',
                to: 'a6du.xakim0v@gmail.com',
                subject: 'course',
                text: otp
            }

            transporter.sendMail(mailMessage, function (err, info) {
                if (err) {
                    console.log(err)
                    catchError(res, 400, `Error on sending to mail: ${err}`);
                } else {
                    console.log(info);
                    setCache(user.email, otp);
                }
            });

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            next(error);
        }
    },
    confirmSignIn: async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'User not found'
                });
            }

            const otpCache = getCache(email);

            if (!otpCache || otp != otpCache) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'OTP expored'
                });
            }

            const payload = {
                id: user._id,
                role: user.role
            }

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: accessToken
            });
        } catch (error) {
            next(error)
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
