const db = require("../models/index");

const getAllCode = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errorCode: 1,
          errorMessage: "Missing required parameters",
          data: undefined,
        });
      } else {
        const allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        resolve({
          errorCode: undefined,
          data: allCode,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCode,
};
