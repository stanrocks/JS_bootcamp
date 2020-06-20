// forEach function
module.exports = {
	forEach(arr, fn) {
		// for (let i = 0; i < arr.length; i++) {
		// 	const value = arr[i];
		// 	fn(value, i);
		// }

		// refactor
		for (let index in arr) {
			fn(arr[index], index);
		}
	}
};
