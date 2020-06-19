module.exports = ({ products }) => {
	// create array of products and join them to one single string
	const renderedProducts = products
		.map((product) => {
			return `
      <li>${product.title} - ${product.price}</li>
    `;
		})
		.join('');

	// put that string inside unordered list and return result
	return `
    <ul>
      ${renderedProducts}
    </ul>
    `;
};
