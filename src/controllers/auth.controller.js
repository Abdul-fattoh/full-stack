import { User } from '../models/user.model.js';
import { catchError } from '../middlewares/error.middleware.js';
import { userValidator } from '../validation/user.validation.js';
import { decode, encode } from '../utils/hash.util.js';

export class UserController {
    async registerUser(req, res) {
        try {
            const { error, value } = userValidator(req.body);

            if (error) {
                throw new Error(`Error on creating user: ${error}`);
            }

            const { fullName, email, password, role } = value;
            const hashedPassword = await decode(password, 7);
            const newUser = await User.create({
                fullName, email, hashedPassword, role
            });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error("User not found");
            }

            const isMatchPassword = await encode(password, user.hashedPassword);
            
            if (!isMatchPassword) {
                throw new Error("Invalid password");
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id
            const user = await User.findById(id);

            if (!user) {
                throw new Error("User not found");
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'succcess',
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}