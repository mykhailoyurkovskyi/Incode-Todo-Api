'use strict';

const TABLE_NAME = 'todos';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(250),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('ToDo', 'In Progress', 'Done'),
      },
    });
  },

  down: async function(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
