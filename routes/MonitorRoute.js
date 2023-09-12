import express from "express";
import {
  getMonitoring,
  getMonitorById,
  updateParam,
  createParam,
  addDevice,
  updateDeviceConfig,
  getMonitoringDeviceList,
  deleteDevice,
  getMonitorConfigurationById,
  updateSensorData,
} from "../controllers/Monitoring.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/monitor", verifyUser, getMonitoring);

router.get("/monitor/:id", verifyUser, getMonitorById);

router.get("/deviceList", verifyUser, getMonitoringDeviceList);

router.post("/monitor", verifyUser, addDevice);

router.patch("/monitor/:id", verifyUser, updateDeviceConfig);

router.delete("/monitor", verifyUser, deleteDevice);

router.get(
  "/monitorConfiguration/:uuid",
  verifyUser,
  getMonitorConfigurationById
);

router.patch("/sensor/:id", verifyUser, updateSensorData);

export default router;
