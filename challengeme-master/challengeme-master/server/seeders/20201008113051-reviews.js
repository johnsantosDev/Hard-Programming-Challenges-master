const reviews = require('./seedFiles/reviews');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('reviews', reviews, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('reviews', null, {});
  },
};
