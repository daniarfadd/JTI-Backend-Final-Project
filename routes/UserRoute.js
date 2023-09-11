import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);

export default router;
