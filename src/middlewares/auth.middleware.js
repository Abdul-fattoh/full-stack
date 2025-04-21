import { User } from "../models/user.model.js";
import { jwtAccessTokenVerify } from '../common/jwt.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const [type, token] = (req.headers.authorization || '').split(" ");

        if (type !== 'Bearer') {
            return res.status(403).send('Authentication required.')
        }

        const decoded = jwtAccessTokenVerify(token);
        const user = await User.findById(decoded.sub);

        if (!user) {
            return res.status(404).send("User not found")
        }

        req.user = {
            email: user.email,
            role: "admin",
        };

        next();
    } catch (error) {
        next(error);
    }
};