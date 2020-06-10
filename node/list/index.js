const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) {
		console.log(err);
	}

	// Different output for files and folders
	// // BAD CODE HERE!!!!!!!!!!
	// // bad because order of filenames is not consistent
	// for (let filename of filenames) {
	// 	fs.lstat(filename, (err, stats) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		console.log(filename, stats.isFile());
	// 	});
	// }
	// // BAD CODE COMPLETE

	// Let's make a solution with proper order of names
	// Option 1 - using array (not greatest solution)
	// get array full of nulls
	const allStats = Array(filenames.length).fill(null);

	for (let filename of filenames) {
		const index = filenames.indexOf(filename);

		fs.lstat(filename, (err, stats) => {
			if (err) {
				console.log(err);
			}

			allStats[index] = stats;

			// check every item in array
			const ready = allStats.every((stats) => {
				return stats; // if stat is null, false will be returned
			});

			// if array is filled, print all items in order
			if (ready) {
				allStats.forEach((stats, index) => {
					console.log(filenames[index], stats.isFile());
				});
			}
		});
	}
});
