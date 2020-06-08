// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies } = Matter;

// maze generation config
const cells = 5; // for vertical and horizontal
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

// 2. Maze generation

// 2.1 Grid generation - square itself - to store 'have been here before'
// create 2d array (3 * 3)

// Create array of 3 'null' values (doesn't really matter what is there),
// then replace each value with array of 3 'false' values.
// First is array of rows, second - columns
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
// console.log(grid);

// 2.2 Grid borders generation - square edges
// Verticals have 3 rows, 2 columns
// Horizontals have 2 rows, 3 columns

// _|_|_
// _|_|_
//  | |

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));
// console.log(verticals, horizontals);
