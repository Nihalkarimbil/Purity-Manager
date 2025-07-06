import express from "express";
import {
    AllHistory,
    createRate,
    getLatestRate,
    searchRateHistory,
} from "../controller/rateController.js";
import tryCatch from "../middleware/TryCatch.js";

const Raterouter = express.Router();

Raterouter
    .post("/add", tryCatch(createRate))
    .get("/latest", tryCatch(getLatestRate))
    .get("/history", tryCatch(searchRateHistory))
    .get("/get", tryCatch(AllHistory))
export default Raterouter;
