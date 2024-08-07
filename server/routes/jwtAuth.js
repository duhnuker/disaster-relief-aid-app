import express from "express";
import pool from "../index.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validInfo.js";
import authorise from "../middleware/authorise.js";

const router = express.Router();

//Register
router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //Check user exists or not
        if (user.rows.length > 0) {
            return res.status(401).send("User already exists");
        }

        //Bcrypt user password
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //Add new user to database
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //Generate JWT token
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ jwtToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

router.post("/login", validInfo, async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //Check if incoming password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }
        //Give them the JWT token
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})

router.get("/is-verified", authorise, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})

export default router;