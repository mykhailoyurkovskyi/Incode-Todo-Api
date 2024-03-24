'use strict';

const TABLE_NAME = 'todos';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING(100),
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(250),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('ToDo', 'In Progress', 'Done'),
      },
      boardId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'boards',
          key: 'boardId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.addIndex(TABLE_NAME, ['name']);
    await queryInterface.addIndex(TABLE_NAME, ['status']);
  },

  down: async function (queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
