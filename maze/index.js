// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = 600;

// create new engine
const engine = Engine.create();

// access to world created with engine
const { world } = engine;

// show content on screen
const render = Render.create({
	// render inside document.body
	element: document.body,
	// specify what engine to use
	engine: engine,
	// define options - window size
	options: {
		// get solid shapes, not transparent
		// wireframes: false,
		width,
		height
	}
});

// execute render
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
	// top
	Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
	// bottom
	Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
	// left
	Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
	// right
	Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];

World.add(world, walls);

// Maze generation
// create 2d array (3 * 3)

// // option 1
// const grid = [];
// for (let i = 0; i < 3; i++) {
// 	grid.push([]);
// 	for (let j = 0; j < 3; j++) {
// 		grid[i].push(false);
// 	}
// }

// option 2
// Create array of 3 'null' values (doesn't really matter what is there),
// then replace each value with array of 3 'false' values.
// First is array of rows, second - columns
const grid = Array(3).fill(null).map(() => Array(3).fill(false));

console.log(grid);
