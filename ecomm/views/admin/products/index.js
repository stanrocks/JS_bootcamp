const layout = require('../layout');

module.exports = ({ products }) => {
	// array of products
	const renderedProducts = products
		.map((product) => {
			return `
      <div>${product.title}</div>
    `;
		})
		.join(''); //  joins all elements of array into string

	return layout({
		content: `
    <h1 class="title">Products</h1>
    ${renderedProducts}
    `
	});
};
