// models/MetalRate.js
import mongoose from "mongoose";

const metalRateSchema = new mongoose.Schema(
    {
        metal: {
            type: String,
            enum: ["Gold", "Silver", "Platinum"],
            required: true,
        },
        purity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Purity",
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },

        rateDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const MetalRate= mongoose.model("MetalRate", metalRateSchema);
export default MetalRate
