import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Report = db.define(
  "report",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reportDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reportTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reportDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cityRegency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Water quality data
    reportedTotalDissolvedSolids: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedTurbidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedTemperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedColor: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedElectricalConductivity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedPh: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedTotalColiforms: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    reportedMetal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    // FK
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Report);
Report.belongsTo(Users, { foreignKey: "userId" });

export default Report;
