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

// Get all devices owned by logged in user
export const getMonitoringDeviceList = async (req, res) => {
  try {
    let response;
    response = await Monitoring.findAll({
      attributes: ["uuid", "deviceName", "status", "valveStatus"],
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

// Get device by Device ID
export const getMonitorConfigurationById = async (req, res) => {
  try {
    const monitor = await Monitoring.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!monitor) return res.status(404).json({ msg: "Data not found" });
    let response;
    response = await Monitoring.findOne({
      attributes: [
        "uuid",
        "deviceName",
        "description",
        "deviceSerialNumber",
        "updateInterval",
        "status",
        "waterLimit",
        "waterUsageTimer",
        "valveStatus",
        "waterTolerance",
      ],
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
    waterLimit,
    waterUsageTimer,
    valveStatus,
    waterTolerance,
  } = req.body;
  try {
    await Monitoring.create({
      deviceName: deviceName,
      description: description,
      deviceSerialNumber: deviceSerialNumber,
      updateInterval: updateInterval,
      status: status,
      waterUsage: 0,
      waterLimit: waterLimit,
      waterUsageTimer: waterUsageTimer,
      valveStatus: valveStatus,
      waterTolerance: waterTolerance,
      totalDissolvedSolids: 0.0,
      turbidity: 0.0,
      temperature: 0.0,
      color: 0.0,
      electricalConductivity: 0.0,
      ph: 0.0,
      totalColiforms: 0.0,
      metal: 0.0,
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
      status,
      waterLimit,
      waterUsageTimer,
      valveStatus,
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
        status: status,
        waterLimit: waterLimit,
        waterUsageTimer: waterUsageTimer,
        valveStatus: valveStatus,
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

// Delete registered device
export const deleteDevice = async (req, res) => {
  const { uuid, deviceName } = req.body;
  try {
    let response;
    response = await Monitoring.destroy({
      where: {
        uuid: uuid,
      },
    });
    res
      .status(200)
      .json({ msg: "Device " + deviceName + " successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ----------- DEPRECATED / DON'T USE -------------
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
