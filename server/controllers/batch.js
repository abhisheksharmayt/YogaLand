import { Batch } from '../models/index.js';

// ADD USER TO BATCH
export const addUserToBatchAndPay = async (req, res) => {
    try {

        const { id } = req.user;
        let { timing, month } = req.body;

        if (!timing && !month) {
            return res.status(400).json({
                status: "error",
                message: "Please enter all fields",
            });
        }

        let batch = await Batch.findOne({ where: { userId: id, month } });

        if (batch) {
            return res.status(400).json({
                status: "error",
                message: "User already in batch",
            });
        }

        batch = await Batch.create({
            timing: timing,
            month: month,
            userId: id
        });

        res.status(201).json({
            status: "success",
            message: `User added to batch`,
            batch
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
};

// CHANGE BATCH TIME
export const changeBatchTimeAndPay = async (req, res) => {

    try {
        const monthArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

        let { timing, batchId } = req.body;

        let batch = await Batch.findOne({ where: { id: batchId } });

        // IF BATCH'S MONTH IS EQUAL TO CREATEDAT MONTH DON'T ALLOW TO CHANGE

        if (batch.month == monthArray[new Date().getMonth()]) {
            return res.status(400).json({
                status: "error",
                message: "You can't change in the same month",
            });
        }

        batch = await Batch.update({
            timing: timing,
        },
            {
                where: { id: batchId }
            }
        );

        res.status(201).json({
            status: "success",
            message: 'Batch time changed ',
            batch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
};

// GET MY BATCH
export const getMyBatch = async (req, res) => {
    try {
        const { id } = req.user;
        const batch = await Batch.findAll({ where: { userId: id } });

        if (!batch) {
            return res.status(404).json({
                status: "error",
                message: "Batch not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Batch found",
            batch
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
};

export const getAllBatches = async (req, res) => {
    try {
        const monthArray = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        res.status(200).json({
            status: "success",
            message: "Batch available",
            monthArray
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
}