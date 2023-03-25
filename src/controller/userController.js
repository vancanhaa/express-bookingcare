// import { handleUserLogin } from "../services/userSevice";
const userSevice = require("../services/userSevice");
const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //check email exist
  //compare password
  //return unserInfo
  //access_token: JWT
  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter",
    });
  }

  const userData = await userSevice.handleUserLogin(email, password);
  const { errorCode, message, userInfo } = userData;
  return res.status(200).json({
    errorCode,
    message,
    userInfo,
  });
};
const handleLogout = (req, res) => {
  return res.send("handleLogout from userController");
};

const handleGetAllUsers = async (req, res) => {
  const listUsers = await userSevice.getAllUser();
  if (listUsers) {
    return res.status(200).json({
      listUsers,
    });
  } else {
    return res.status(500).json({
      errorCode: 4,
      message: "data not found",
    });
  }
};

const handleGetUserById = async (req, res) => {
  const idUser = Number(req.params.id);
  if (idUser) {
    const userInfo = await userSevice.getUserById(idUser);
    if (userInfo) {
      return res.status(200).json(userInfo);
    }
    return res.status(500).json({
      errorCode: 4,
      message: "data not found",
    });
  }

  return res.status(500).json({
    errorCode: 4,
    message: "idUser not found",
  });
};

const handleCreateNewUser = async (req, res) => {
  const dataByForm = req.body;
  if (!dataByForm || Object.keys(dataByForm).length === 0) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter",
    });
  }
  const data = await userSevice.createNewUser(dataByForm);
  if (!data.errorCode) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json(data);
  }
};

const handleUpdateUser = async (req, res) => {
  const idUser = Number(req.params.id);
  const data = req.body;

  if (idUser && idUser !== "") {
    if (!data || Object.keys(data).length === 0) {
      return res.status(500).json({
        errorCode: 1,
        message: "Missing inputs parameter",
      });
    } else {
      const responseData = await userSevice.updateUser(idUser, data);
      if (!responseData.errorCode) {
        return res.status(200).json(responseData);
      } else {
        return res.status(500).json(responseData);
      }
    }
  }

  return res.status(500).json({
    errorCode: 4,
    message: "User not found",
  });
};

const handleDeleteUser = async (req, res) => {
  const idUser = Number(req.params.id);
  if (idUser) {
    const responseData = await userSevice.deleteUser(idUser);
    if (!responseData.errorCode) {
      return res.status(200).json(responseData);
    } else {
      return res.status(500).json(responseData);
    }
  }
  return res.status(500).json({
    errorCode: 4,
    message: "user not found",
  });
};

module.exports = {
  handleLogin,
  handleLogout,
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUser,
  handleDeleteUser,
};
