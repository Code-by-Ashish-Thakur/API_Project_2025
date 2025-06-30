import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/connection.js';
import routes from './src/routes/index.js';


dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/v1', routes);

const PORT = process.env.PORT;


sequelize.sync().then(() => {
    console.log("Database connected succesfully!!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

