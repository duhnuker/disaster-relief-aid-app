import express from "express";
import pool from "../index.js";
import authMiddleware from "../middleware/authorise.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

export default router;