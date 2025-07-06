import MetalRate from "../models/MetalRate.js";
import CustomError from "../utils/CustomError.js";

export const createRate = async (req, res, next) => {

    const { metal, purity, rate } = req.body


    if (!metal || !purity || !rate) {
        return next(new CustomError("All are required", 400))
    }

    const newrate = new MetalRate({
        metal,
        purity,
        rate,
    });

    await newrate.save()
    res.status(201).json({
        data: newrate,
        message: "new Rate added",
        error: false
    });

};

export const getLatestRate = async (req, res, next) => {
    const { metal, purity } = req.query;

    if (!metal || !purity) {
        return next(new CustomError("fields are required"))
    }

    const rate = await MetalRate.findOne({ metal, purity })
        .sort({ rateDate: -1 })
        .populate("purity");

    res.json({
        data: rate,
        message: "latest data"
    });

};

export const searchRateHistory = async (req, res) => {

    const { metal = "", page = 1, limit = 5 } = req.query;

    const query = {
        metal: { $regex: metal, $options: "i" }  
    };

    const skip = (page - 1) * limit;

    const total = await MetalRate.countDocuments(query);

    const rates = await MetalRate.find(query)
        .sort({ rateDate: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("purity");

    res.status(200).json({
        message: "Search metal rates",
        data: rates,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        error: false,
    });
};


export const AllHistory = async (req, res) => {

    const { page = 1, limit = 5} = req.query;

    const skip = (page - 1) * limit;

    const total = await MetalRate.countDocuments();

    const rates = await MetalRate.find()
        .sort({ rateDate: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("purity");

    res.status(200).json({
        message: "All metal rates (paginated)",
        data: rates,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        error: false,
    });

};
