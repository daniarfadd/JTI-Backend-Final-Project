import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Monitoring = db.define(
  "device_monitoring",
  {
    // Device information
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    deviceName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    deviceSerialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    updateInterval: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    // Water usage
    waterUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    waterLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    waterUsageTimer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    valveStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    // Water quality
    waterTolerance: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    totalDissolvedSolids: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    turbidity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    electricalConductivity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    ph: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    totalColiforms: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    metal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    // FK column
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

Users.hasMany(Monitoring);
Monitoring.belongsTo(Users, { foreignKey: "userId" });

export default Monitoring;
