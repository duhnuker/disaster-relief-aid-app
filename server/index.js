import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: 5432
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default pool;