import Monitoring from "../models/MonitoringModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// Get all devices owned by logged in user
export const getMonitoring = async (req, res) => {
  try {
    let response;
    response = await Monitoring.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get device by Device ID
export const getMonitorById = async (req, res) => {
  try {
    const monitor = await Monitoring.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!monitor) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Monitoring.findOne({
      attributes: ["uuid", "param1", "param2", "param3"],
      where: {
        [Op.and]: [{ id: monitor.id }, { userId: req.userId }],
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Add new device
export const addDevice = async (req, res) => {
  const {
    deviceName,
    description,
    deviceSerialNumber,
    updateInterval,
    status,
    waterUsage,
    waterLimit,
    waterUsageTimer,
    valveStatus,
    waterTolerance,
    totalDissolvedSolids,
    turbidity,
    temperature,
    color,
    electricalConductivity,
    ph,
    totalColiforms,
    metal,
  } = req.body;
  try {
    await Monitoring.create({
      deviceName: deviceName,
      description: description,
      deviceSerialNumber: deviceSerialNumber,
      updateInterval: updateInterval,
      status: status,
      waterUsage: waterUsage,
      waterLimit: waterLimit,
      waterUsageTimer: waterUsageTimer,
      valveStatus: valveStatus,
      waterTolerance: waterTolerance,
      totalDissolvedSolids: totalDissolvedSolids,
      turbidity: turbidity,
      temperature: temperature,
      color: color,
      electricalConductivity: electricalConductivity,
      ph: ph,
      totalColiforms: totalColiforms,
      metal: metal,
      userId: req.userId,
    });
    res.status(201).json({ msg: "New device added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update device information/configuration
export const updateDeviceConfig = async (req, res) => {
  try {
    const monitor = await Monitoring.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!monitor) return res.status(404).json({ msg: "Device not found" });
    const {
      deviceName,
      description,
      deviceSerialNumber,
      updateInterval,
      waterLimit,
      waterUsageTimer,
      waterTolerance,
    } = req.body;
    if (req.userId !== monitor.userId)
      return res.status(403).json({ msg: "Access Denied" });
    await Monitoring.update(
      {
        deviceName: deviceName,
        description: description,
        deviceSerialNumber: deviceSerialNumber,
        updateInterval: updateInterval,
        waterLimit: waterLimit,
        waterUsageTimer: waterUsageTimer,
        waterTolerance: waterTolerance,
      },
      {
        where: {
          [Op.and]: [{ id: monitor.id }, { userId: req.userId }],
        },
      }
    );
    res
      .status(200)
      .json({ msg: "Device configuration has been successfully updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DEPRECATED -- Update parameter value
export const updateParam = async (req, res) => {
  try {
    const monitor = await Monitoring.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!monitor) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { param1, param2, param3 } = req.body;
    if (req.userId !== monitor.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await Monitoring.update(
      { param1, param2, param3 },
      {
        where: {
          [Op.and]: [{ id: monitor.id }, { userId: req.userId }],
        },
      }
    );
    res.status(200).json({ msg: "Parameter Berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Deprecated -- Create/insert new entry
export const createParam = async (req, res) => {
  const { param1, param2, param3 } = req.body;
  try {
    await Monitoring.create({
      param1: param1,
      param2: param2,
      param3: param3,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Parameter Berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
