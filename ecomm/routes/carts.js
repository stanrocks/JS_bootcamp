const express = require('express');
const { response } = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a POST request to add an item to a cart
router.post('/cart/products', async (req, res) => {
	// console.log(req.body.productId);
	// Figure out the cart
	let cart;
	if (!req.session.cartId) {
		// No cart, have to create new one
		// and store cart ID on req.session.cartId
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		// Cart exists. Let's get it from repo
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	console.log(cart);
	// Either increment quantity for existing product

	// OR add new product to items array

	res.send('Product added to cart');
});

// Receive a GET request to show all items in cart

// Receive a POST request to delete an item from a cart

module.exports = router;
