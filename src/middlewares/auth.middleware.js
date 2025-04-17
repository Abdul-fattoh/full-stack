import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";

export const authMidalware = async (req, res, next) => {
    try {
        const str = (req.headers.authorization || '').split(" ")[1] || '';
        const [email, password] = Buffer.from(str, "base64")
            .toString()
            .split(":");
    
        // const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.findOne({ email }).exec();
    
        if (!user) {
            return res.status(404).send("User not found")
        }
    
        if (
            email &&
            password && 
            user.email === email && 
            user.password === password
        ) {
            req.user = user;
    
            next();
            return;
        }

        return res.status(401).send("Authentication required.");
    } catch (error) {
        next(error);
    }
};