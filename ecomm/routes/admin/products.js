const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');
const products = require('../../repositories/products');
const { response } = require('express');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// redirect if user is not logged in (admin area requires authentication)
router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productsRepo.getAll();
	res.send(productsIndexTemplate({ products }));
});

// redirect if user is not logged in (admin area requires authentication)
router.get('/admin/products/new', requireAuth, (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post(
	'/admin/products/new',
	requireAuth, // redirect if user is not logged in (admin area requires authentication)
	upload.single('image'),
	[
		requireTitle,
		requirePrice
	],
	handleErrors(productsNewTemplate),
	async (req, res) => {
		// console.log(req.file); // shows multer parsing result of user data uploaded through form
		const image = req.file.buffer.toString('base64'); // encode image using base64
		const { title, price } = req.body;
		await productsRepo.create({
			title,
			price,
			image
		});

		res.redirect('/admin/products');
	}
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	// console.log(req.params.id);
	const product = await productsRepo.getOne(req.params.id);

	if (!product) {
		return res.send('Product not found');
	}

	res.send(productsEditTemplate({ product }));
});

router.post(
	'/admin/products/:id/edit',
	requireAuth,
	upload.single('image'),
	[
		requireTitle,
		requirePrice
	],
	handleErrors(productsEditTemplate, async (req) => {
		const product = await productsRepo.getOne(req.params.id);
		return { product };
	}),
	async (req, res) => {
		// save edited version of form inputs (image is not included)
		const changes = req.body;
		// if user provided an image file - add it to changes
		if (req.file) {
			changes.image = req.file.buffer.toString('base64');
		}
		// try to find product with particular id
		try {
			// apply changes to product with particular id
			await productsRepo.update(req.params.id, changes);
		} catch (err) {
			return res.send('Could not find item');
		}
		// redirect to products list after edit completion
		res.redirect('/admin/products');
	}
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
	await productsRepo.delete(req.params.id);

	res.redirect('/admin/products');
});

module.exports = router;
