'use strict';

const bcrypt = require('bcrypt');

const hashID = async (password) => {
  return await bcrypt.hash(password, 10);
};

const TABLE_NAME = 'todos';
const SALT = parseInt(process.env.SALT_ROUNDS); 

module.exports = {
  up: async function(queryInterface, Sequelize) {
    const hashedId = await hashID('exampleId');
    const hashedId2 = await hashID('exampleId2');
    const hashedId3 = await hashID('exampleId3');


    await queryInterface.bulkInsert(
      TABLE_NAME,
      [
        {
          id: hashedId,
          name: 'Task 1',
          status: 'ToDo',
        },
        {
          id: hashedId2,
          name: 'Task 2',
          status: 'In Progress',
        },
        {
          id: hashedId3,
          name: 'Task 3',
          status: 'Done',
        },
      ],
      {}
    );
  },
  
  down: async function(queryInterface) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  }
};
