import mysql from 'mysql2';
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config()

const app = express();
const port = 8080;
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

app.use(cors());

app.get('/api/characters', async (req, res) => {
    try {
        const search = req.query.search;
        const [rows] = await pool.query("SELECT character_name FROM characters WHERE character_name LIKE ?", [`%${search}%`]);
        // res.send(rows);
        if (rows.length > 0) {
            res.json({ exists: true, data: rows });
        } else {
            res.json({ exists: false, data: [] });
        }
    } catch (err) {
        console.error("[ERROR] could not get character names", err);
        res.status(500).json({ error: "Could not get character name" });

    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on ${port}`);
})