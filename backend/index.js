import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())
app.use("/api",authRouter)

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`);
});




