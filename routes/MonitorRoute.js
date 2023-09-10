import express from "express";
import {
  getMonitoring,
  getMonitorById,
  updateParam,
  createParam,
  addDevice,
  updateDeviceConfig,
} from "../controllers/Monitoring.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/monitor", verifyUser, getMonitoring);

router.get("/monitor/:id", verifyUser, getMonitorById);

router.post("/monitor", verifyUser, addDevice);

router.patch("/monitor/:id", verifyUser, updateDeviceConfig);

export default router;
