
import mongoose from "mongoose";

const puritySchema = new mongoose.Schema(
    {
        metal: {
            type: String,
            enum: ["Gold", "Silver", "Platinum"],
            required: true,
        },
        purityName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        
    },
    { timestamps: true }
);
const Purity= mongoose.model("Purity", puritySchema);

export default Purity
