'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { hash } = require('bcrypt');

const TABLE_NAME = 'todos';
const SALT_ROUNDS_STRING = process.env.SALT_ROUNDS;
const SALT = SALT_ROUNDS_STRING ? parseInt(SALT_ROUNDS_STRING) : 10;

const hashID = async (id) => {
  return await hash(id, SALT);
};

module.exports.up = async function (queryInterface, Sequelize) {
  const hashedId = await hashID('exampleId');
  const hashedId2 = await hashID('exampleId2');
  const hashedId3 = await hashID('exampleId3');

  await queryInterface.bulkInsert(
    TABLE_NAME,
    [
      {
        id: hashedId,
        name: 'Task 1',
        description: 'Easy',
        status: 'ToDo',
      },
      {
        id: hashedId2,
        name: 'Task 2',
        description: 'Medium',
        status: 'In Progress',
      },
      {
        id: hashedId3,
        name: 'Task 3',
        description: 'Hard',
        status: 'Done',
      },
    ],
    {},
  );
};

module.exports.down = async function (queryInterface) {
  await queryInterface.bulkDelete(TABLE_NAME, null, {});
};
