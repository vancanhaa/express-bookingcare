const bcrypt = require("bcryptjs");
const db = require("../models/index");

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hassPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hassPassword,
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        role_id: data.roleId,
        phone_number: data.phoneNumber,
      });
      resolve("create a new user success!");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) resolve(user);
      resolve([]);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        await user.update({
          first_name: data.firstName,
          last_name: data.lastName,
          address: data.address,
          phone_number: data.phoneNumber,
          gender: data.gender,
          role_id: data.roleId,
        });
        await user.save();
        const allUsers = await db.User.findAll({ raw: true });
        resolve(allUsers);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        const allUser = db.User.findAll({ raw: true });
        resolve(allUser);
      }

      resolve([]);
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resole, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resole(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
