import { Request, Response } from "express";;
import pool from "../index";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";

const router = require("express").Router();

//Register
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //Check user exists or not
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        //Bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //Add new user to database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //Generate JWT token

        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json((token));

    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;