import { Sequelize } from "sequelize";

const db = new Sequelize("jti_final", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
