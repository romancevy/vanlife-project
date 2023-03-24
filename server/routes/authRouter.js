import express from "express";
import { login } from "../controller/authController.js";
const router = express.Router();

// POST Anfragen - weiterleitung an "login"
router.route("/login").post(login);

export default router;
