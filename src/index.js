import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import router from './modules/auth/auth.routes.js';
import bookingRouter from './modules/booking/booking.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/../index.html");
});

app.use('/api/auth', router);
app.use('/', bookingRouter); 

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;