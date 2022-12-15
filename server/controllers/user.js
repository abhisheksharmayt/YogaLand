import bcrypt from 'bcrypt';
import { User, Batch } from '../models/index.js';
import { createToken } from '../middlewares/auth.js';

// REGISTER USER
export const register = async (req, res) => {
    try {
        let { name, email, password, dob } = req.body;

        // BASIC VALIDATION
        if (!name || !email || !password || !dob) {
            return res.status(400).json({
                status: 'error',
                message: 'Please enter all fields'
            });
        }

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({
                status: 'error',
                message: 'Email already exists'
            });
        }

        // CHECK IF AGE IS BETWEEN 18 AND 65
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 18 || age > 65) {
            return res.status(400).json({
                status: 'error',
                message: 'Age must be between 18 and 65'
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password, dob });

        // Generate token
        const token = await createToken({ id: user.id });

        // Set cookie with token
        res.status(201)
            .cookie('token_secret', token, {
                httpOnly: true,
                maxAge: 864_000_000, // 10 days
            }).json({
                status: 'success',
                message: `User registered with id ${user.id}`,
                token
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // BASIC VALIDATION
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please enter all fields'
            });
        }

        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid Credentials'
            });
        }

        // Generate token
        const token = await createToken({ id: user.id });

        // Set cookie with token
        res.status(200)
            .cookie("token_secret", token, {
                httpOnly: true,
                maxAge: 864_000_000, // 10 days
            }).json({
                status: 'success',
                message: `User logged in with email ${user.id}`,
                token
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// LOGOUT USER
export const logout = async (req, res) => {
    try {
        res.status(200)
            .clearCookie("token_secret", {
                httpOnly: true,
                sameSite: 'None',
                maxAge: 0
            }).json({
                status: 'success',
                message: 'User logged out'
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// GET LOGGED IN USER (PROTECTED)
export const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User found',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                dob: user.dob
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};
