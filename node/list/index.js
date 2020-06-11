const fs = require('fs');

// use this for 'BAD CODE' below and for Option 1 'using array'
// fs.readdir(process.cwd(), (err, filenames) => {
// 	if (err) {
// 		console.log(err);
// 	}

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
// const allStats = Array(filenames.length).fill(null);

// for (let filename of filenames) {
// 	const index = filenames.indexOf(filename);

// 	fs.lstat(filename, (err, stats) => {
// 		if (err) {
// 			console.log(err);
// 		}

// 		allStats[index] = stats;

// 		// check every item in array
// 		const ready = allStats.every((stats) => {
// 			return stats; // if stat is null, false will be returned
// 		});

// 		// if array is filled, print all items in order
// 		if (ready) {
// 			allStats.forEach((stats, index) => {
// 				console.log(filenames[index], stats.isFile());
// 			});
// 		}
// 	});
// }
// });

// Option 2 - using promises
// serial execution (one operation at time, so it is very slow, not async)
// fs.readdir(process.cwd(), async (err, filenames) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	for (let filename of filenames) {
// 		try {
// 			const stats = await lstat(filename);
// 			console.log(filename, stats.isFile());
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// });

// Option 2 - using promises (not greatest solution)
// serial execution (one operation at time, so it is very slow, not async)
// Promise Method 1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) {
// 				reject(err);
// 			}
// 			resolve(stats);
// 		});
// 	});
// };

// Promise Method 2
// const util = require('util'); // https://nodejs.org/docs/latest/api/util.html
// const lstat = util.promisify(fs.lstat);

// Promise Method 3
// const lstat = fs.promises.lstat; // https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_lstat_path_options

// Promise Method 3.1 - destructuring
// const { lstat } = fs.promises; // https://nodejs.org/docs/latest/api/fs.html#fs_fspromises_lstat_path_options

// Option 3 - PERFECT IMPLEMENTATION
// all promises are made in parallel - way better performance than option 2
const { lstat } = fs.promises;

// Console logs with colors (using chalk)
// https://www.npmjs.com/package/chalk
const chalk = require('chalk');

// print current folders
// console.log(process.argv);

// target dir = if user provided particular path (argv[2]) use it or use current working directory (cwd)
const targetDir = process.argv[2] || process.cwd();

const path = require('path'); // https://nodejs.org/docs/latest/api/path.html

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}

	const statPromises = filenames.map((filename) => {
		// implement proper paths
		return lstat(path.join(targetDir, filename)); // now it works with 'node index.js ..' command and shows what is inside parent folder
	});

	const allStats = await Promise.all(statPromises);

	for (let stats of allStats) {
		const index = allStats.indexOf(stats);

		if (stats.isFile()) {
			console.log(filenames[index]);
		} else {
			// print folder names with bold
			console.log(chalk.bold(filenames[index]));
		}
	}
});
