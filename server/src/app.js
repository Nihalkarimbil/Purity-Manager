import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import errorhandler from "./utils/ErrorHandler.js";
import PurityRouter from "./routes/PurityRoute.js";
import Raterouter from "./routes/RatesRoutes.js";

dotenv.config();
const app = express();

app.use(
    cors({
        //origin: "https://purity-manager.vercel.app", 
        origin: "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/purity",PurityRouter)
app.use("/api/metalRate",Raterouter)

mongoose.connect(process.env.MONGO_URI )
    .then(() => {
        console.log(" Database Connected");
    }).catch((err) => {
        console.error(" Database connection error:", err);
    });

app.use(errorhandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
