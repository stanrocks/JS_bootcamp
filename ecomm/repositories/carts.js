const Repository = require('./repository');

class CartsRepository extends Repository {}

// Exporting an instance
module.exports = new CartsRepository('carts.json');
