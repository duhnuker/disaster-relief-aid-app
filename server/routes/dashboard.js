import express from "express";
import pool from "../index.js";
import authorise from "../middleware/authorise.js";

const router = express.Router();

router.get("/", authorise, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

export default router;