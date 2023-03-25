"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "canhphamadmin@gmail.com",
        password: "123456",
        first_name: "LifelongLearning",
        last_name: "CanhPham",
        address: "VN",
        gender: "1",
        role_id: "1",
        phone_number: "0383679500",
        position_id: "professor",
        image:
          "https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
