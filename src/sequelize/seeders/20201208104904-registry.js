'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('registry', [
      {
        id: 1,
        code: "auth",
        name: "Auth user service",
        description: '',
        url: 'http://localhost:8081',
        port: '8081',
        status: 'on',
      },
      {
        id: 2,
        code: "product",
        name: "Product service",
        description: '',
        url: 'http://localhost:8071',
        port: '8071',
        status: 'on'
      },
      {
        id: 3,
        code: "car",
        name: "Car service",
        description: '',
        url: 'http://localhost:8061',
        port: '8061',
        status: 'on'
      },
      {
        id: 4,
        code: "order",
        name: "Order service",
        description: '',
        url: 'http://localhost:8051',
        port: '8051',
        status: 'on'
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('registry', null, {});
  }
};