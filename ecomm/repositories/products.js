// const fs = require('fs');
// const crypto = require('crypto');
// const util = require('util');
const Repository = require('./repository');

class ProductsRepository extends Repository {}

// Exporting an instance
module.exports = new ProductsRepository('products.json');
