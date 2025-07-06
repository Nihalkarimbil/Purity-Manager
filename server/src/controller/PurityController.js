import Purity from "../models/Purity.js";
import CustomError from "../utils/CustomError.js";


export const createPurity = async (req, res, next) => {
    const { metal, purityName, description } = req.body

    if (!metal || !purityName) {
        return next(new CustomError("All fields are required", 400))
    }
    
    const purity = new Purity({
        metal,
        purityName,
        description
    });
    await purity.save()

    res.status(201).json({
        data: purity,
        message: "purity created",
        error: false
    });

};

export const getPurities = async (req, res, next) => {

    const purities = await Purity.find();
    res.json({
        data: purities,
        message: "all purities",
        error: false
    });

};

export const getPurity = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return next(new CustomError("id is required", 400))
    }

    const purity = await Purity.findById(req.params.id);
    res.json(purity);

};

export const updatePurity = async (req, res) => {
    const updated = await Purity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json({
        data:updated,
        message:"purityupdated",
        error:false
    });

};

export const deletePurity = async (req, res) => {

    await Purity.findByIdAndDelete(req.params.id);
    res.json({ message: "Purity deleted" });

};
