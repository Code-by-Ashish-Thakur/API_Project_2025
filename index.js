import express from 'express';          // Framework to build REST API
import dotenv from 'dotenv';            // For loading .env variables (like DB, JWT_SECRET)
import routes from './src/routes/index.js'; // All routes bundled here
import sequelize from './db/connection.js'; // DB connection via Sequelize
import cron from './cron/job.js';       // Scheduled tasks like daily cleanup
import redisClient from './redis/redisClient.js'; // Redis cache connection
import cors from 'cors';                // Cross-origin request support (for frontend)
import cookieParser from 'cookie-parser'; // Parse cookies if needed (not used now)

dotenv.config();        // Loads .env file
const app = express();  // Creates express app
app.use(cors());        // Enables frontend to hit backend
app.use(express.json()); // Parses incoming JSON
app.use(cookieParser());

app.use('/api/v1', routes); // All endpoints start with /api/v1

app.get("/", (req, res) => {
    res.send(" ❣️ API is working fine 🙇");
});


const PORT = process.env.PORT || 3000;

// Connect DB, start server, connect Redis, start Cron
sequelize.sync({ alter: true }).then(() => {
    console.log('DB Synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    redisClient.connect();
    cron.start();
}).catch(err => {
    console.error('DB Connection Error:', err);
});
