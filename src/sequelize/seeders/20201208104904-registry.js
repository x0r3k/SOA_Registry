'use strict';

const dockerData = [
  {
    id: 1,
    code: "auth",
    name: "Auth user service",
    description: '',
    url: 'http://localhost:8082',
    port: '8082',
    status: 'on',
  },
  {
    id: 2,
    code: "product",
    name: "Product service",
    description: '',
    url: 'http://localhost:8072',
    port: '8072',
    status: 'on'
  },
  {
    id: 3,
    code: "car",
    name: "Car service",
    description: '',
    url: 'http://localhost:8062',
    port: '8062',
    status: 'on'
  },
  {
    id: 4,
    code: "order",
    name: "Order service",
    description: '',
    url: 'http://localhost:8052',
    port: '8052',
    status: 'on'
  },
];

const devData = [
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
];

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('registry', process.env.NODE_ENV === 'docker' ? dockerData : devData
    , {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('registry', null, {});
  }
};