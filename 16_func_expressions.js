// Function Statement
function add(x, y) {
	return x + y;
}
add(1, 2); // 3

// Function Expression (Anonymous)
const sum = function(x, y) {
	return x + y;
};
sum(1, 2); // 3

// Function Expression (Named)
const product = function multiply(x, y) {
	return x * y;
};
product(2, 3); // 6
multiply(2, 3); // DOES NOT WORK
