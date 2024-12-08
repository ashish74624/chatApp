import express from "express";
import { login, register } from "../controller/userController";
import { verify } from "../middleware/AuthMiddleware";

const router = express.Router();

router.post("/login",login);
router.post("/signup",register);
router.post("/",verify);


export default router;