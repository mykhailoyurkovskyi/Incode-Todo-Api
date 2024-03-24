'use strict';

const TABLE_NAME = 'boards';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      boardId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      boardName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },
    });
  },

  down: async function (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
