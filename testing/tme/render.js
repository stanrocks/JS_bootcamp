// ========================================
// emulate DOM for testing app with Node.js
// ========================================

const path = require('path');
const jsdom = require('jsdom'); // https://www.npmjs.com/package/jsdom
const { JSDOM } = jsdom;

const render = async (filename) => {
	const filePath = path.join(process.cwd(), filename);

	// since I am the author of tested app - its ok to run my own scripts dangerously, they will not damage environment (PC, server, etc)
	const dom = await JSDOM.fromFile(filePath, {
		runScripts: 'dangerously',
		resources: 'usable'
	});

	return dom;
};

module.exports = render;
