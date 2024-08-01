import jwt from "jsonwebtoken";
import 'dotenv/config';


function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1hr" });
}

export default jwtGenerator;