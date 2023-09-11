import User from "../models/UserModel.js";
import argon2 from "argon2";
// argon buat hash password

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "username", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "username", "email", "password"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, username } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      username: username,
    });
    res.status(201).json({
      msg: "Congratulations, your account has been successfully created",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { name, email, password, username } = req.body;
    const hashPassword = await argon2.hash(password);
    if (req.session.userId !== user.uuid)
      return res.status(403).json({ msg: "Access denied" });

    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      },
      {
        where: {
          uuid: req.session.userId,
        },
      }
    );
    res.status(200).json({ msg: "User successfully updated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
