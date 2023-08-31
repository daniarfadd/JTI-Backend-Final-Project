import express from "express";
import {
    getReport,
    getReportById,
    updateReport,
    createReport
} from "../controllers/Report.js";
import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/report',verifyUser, getReport);

router.get('/report/:id',verifyUser, getReportById);

router.post('/report',verifyUser, createReport);

router.patch('/report/:id',verifyUser, updateReport);



export default router;