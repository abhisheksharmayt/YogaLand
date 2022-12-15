import { Router } from "express";
import { register, login, logout, getUser } from "../controllers/user.js";
import { validateToken } from "../middlewares/auth.js";

const router = Router();

// REGISTER USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// LOGOUT USER
router.get("/logout", validateToken, logout);

// GET LOGGED IN USER (PROTECTED)
router.get("/me", validateToken, getUser);

export default router;