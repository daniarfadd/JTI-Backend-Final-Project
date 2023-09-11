import Report from "../models/ReportModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getReport = async (req, res) => {
  try {
    let response;
    response = await Report.findAll({
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

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!report) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Report.findOne({
      //   attributes: ["uuid", "reportTitle", "reportDescription"],
      where: {
        [Op.and]: [{ id: report.id }, { userId: req.userId }],
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

export const updateReport = async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!report) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { reportDescription } = req.body;
    if (req.userId !== report.userId)
      return res.status(403).json({ msg: "Akses terlarang" });
    await Report.update(
      { reportDescription },
      {
        where: {
          [Op.and]: [{ id: report.id }, { userId: req.userId }],
        },
      }
    );
    res.status(200).json({ msg: "Report Berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createReport = async (req, res) => {
  const {
    reportTitle,
    reportDescription,
    address,
    cityRegency,
    province,
    reportedTotalDissolvedSolids,
    reportedTurbidity,
    reportedTemperature,
    reportedColor,
    reportedElectricalConductivity,
    reportedPh,
    reportedTotalColiforms,
    reportedMetal,
  } = req.body;
  try {
    await Report.create({
      reportTitle: reportTitle,
      reportDescription: reportDescription,
      address: address,
      cityRegency: cityRegency,
      province: province,
      reportedTotalDissolvedSolids: reportedTotalDissolvedSolids,
      reportedTurbidity: reportedTurbidity,
      reportedTemperature: reportedTemperature,
      reportedColor: reportedColor,
      reportedElectricalConductivity: reportedElectricalConductivity,
      reportedPh: reportedPh,
      reportedTotalColiforms: reportedTotalColiforms,
      reportedMetal: reportedMetal,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Report successfully generated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
