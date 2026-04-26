import express from "express";
import { login, logout, signup, getUserData } from "../Controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const authRouter = express.Router();


authRouter.post("/signup",upload.single("profileImage"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getuserdata",checkAuth,getUserData)



export default authRouter;
