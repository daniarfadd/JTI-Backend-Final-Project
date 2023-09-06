import express from "express";
import {
  getMonitoring,
  getMonitorById,
  updateParam,
  createParam,
} from "../controllers/Monitoring.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/monitor", getMonitoring);

router.get("/monitor/:id", verifyUser, getMonitorById);

router.post("/monitor", verifyUser, createParam);

router.patch("/monitor/:id", verifyUser, updateParam);

export default router;
