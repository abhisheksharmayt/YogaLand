// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sequelize } from './db/connect.js';
import userRoutes from './routes/user.js';
import batchRoutes from './routes/batch.js';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://yogaland-flexmoney.vercel.app'
    ],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/batch', batchRoutes);

const port = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
