import express from "express";
import {
    createPurity,
    getPurities,
    getPurity,
    updatePurity,
    deletePurity,
} from "../controller/PurityController.js";
import tryCatch from "../middleware/TryCatch.js";

const PurityRouter = express.Router();

PurityRouter
    .post("/add", tryCatch(createPurity))
    .get("/get", tryCatch(getPurities))
    .get("/getby/:id", tryCatch(getPurity))
    .put("/updateby/:id", tryCatch(updatePurity))
    .delete("/delete/:id", tryCatch(deletePurity))

export default PurityRouter;
