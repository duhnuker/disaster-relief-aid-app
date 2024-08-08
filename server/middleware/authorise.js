import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

    const authMiddleware = (req, res, next) => {

    const token = req.header("jwt_token");

    if (!token) {
        return res.status(403).json("Not Authorised");
    }

    try {

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify.user;

        next();

    } catch (error) {
        console.error(error.message);
        return res.status(403).json({ msg: "Token is not valid" });
    }
};

export default authMiddleware;