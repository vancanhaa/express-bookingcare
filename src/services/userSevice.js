const { where } = require("sequelize");
const bcrypt = require("bcryptjs");

const db = require("../models/index");
const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        //user alrealy exits
        const user = await db.User.findOne({
          where: { email: email },
        });
        if (user) {
          //compare password
          const userWithPassword = await db.User.scope("withPassword").findOne({
            where: { email: email },
          });
          const checkPassword = bcrypt.compareSync(
            password,
            userWithPassword.password
          );
          if (checkPassword) {
            userData.errorCode = 0;
            userData.message = "OK";
            userData.userInfo = user;
          } else {
            userData.errorCode = 3;
            userData.message = "Wrong password";
          }
        } else {
          userData.errorCode = 2;
          userData.message = `User's not found`;
        }
      } else {
        //return error
        userData.errorCode = 1;
        userData.message = `Your's email isn't exits in your system. Please try other email!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listUsers = await db.User.findAll();
      if (listUsers) {
        resolve(listUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo = await db.User.findOne({
        where: { id: idUser },
      });
      if (userInfo) {
        resolve(userInfo);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExistEmail = await checkUserEmail(data.email);
      if (!isExistEmail) {
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
        resolve({
          userInfo: await db.User.findOne({
            where: { email: data.email },
          }),
          errorCode: 0,
          message: "register success",
        });
      } else {
        resolve({
          errorCode: 1,
          message: "email already exist",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (idUser, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: idUser },
      });
      if (user) {
        await user.update({
          first_name: data.firstName,
          last_name: data.lastName,
          address: data.address,
          phone_number: data.phoneNumber,
          gender: data.gender,
          role_id: data.roleId,
          email: data.email,
        });
        await user.save();
        const newUser = await db.User.findOne({
          where: { id: idUser },
        });
        resolve({
          message: "Change user information success",
          userInfo: newUser,
        });
      }
      resolve({
        errorCode: 4,
        message: "User not found from Sevice",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: idUser },
      });
      if (user) {
        await user.destroy();
        resolve({
          message: "delete User success",
        });
      }
      resolve({
        errorCode: 4,
        message: "user not found",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
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
  handleUserLogin,
  getAllUser,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
