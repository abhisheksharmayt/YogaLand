import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'token_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10d';
import { User } from '../models/index.js';

// CREATE TOKEN
export async function createToken(data) {
    try {
        const token = await jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return token;
    } catch (err) {
        return null;
    }
}
// VALIDATE TOKEN (MIDDLEWARE)
export async function validateToken(req, res, next) {
    try {
        // GET TOKE FROM HEADER OR COOKIES
        const token = req.cookies.token_secret || req.headers?.authorization.split(' ')[1];
        
        // console.log("hello", token);
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decoded = await jwt.verify(token, JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        req.user = user.dataValues;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
}
