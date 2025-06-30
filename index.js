import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/connection.js';


dotenv.config();
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Sample API is working");
})

const PORT = process.env.PORT;


sequelize.sync().then(() => {
    console.log("Database connected succesfully!!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

