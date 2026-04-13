import express from 'express';
import dotenv from 'dotenv';
import router from './modules/auth/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());

app.use('/api/auth', router);
app.get('/', (req, res) => {
    res.send("This is BMS checking");
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    res.status(statusCode).json({
        success: false,
        message: message
    });
});

app.listen(port, () => {
    console.log(`Server is running on : ${port}`);
});

export default app;