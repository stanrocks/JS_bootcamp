// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies, Body } = Matter;

// maze generation config
const cells = 3; // for vertical and horizontal
const width = 600;
const height = 600;
const unitLength = width / cells;

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
	Bodies.rectangle(width / 2, 0, width, 3, { isStatic: true }),
	// bottom
	Bodies.rectangle(width / 2, height, width, 3, { isStatic: true }),
	// left
	Bodies.rectangle(0, height / 2, 3, height, { isStatic: true }),
	// right
	Bodies.rectangle(width, height / 2, 3, height, { isStatic: true })
];

World.add(world, walls);

// 2. Maze generation

// Shuffle utility function - randomized path generation. Take array and reorder elements randomly
const shuffle = (arr) => {
	let counter = arr.length;
	// swap each element at least 1 time
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;
		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};

// 2.1. Grid generation - cell itself - to store 'have been visited'
// create 2d array (3 * 3)

// Create array of 3 'null' values (doesn't really matter what is there),
// then replace each value with array of 3 'false' values.
// First is array of rows, second - columns
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
// console.log(grid);

// 2.2. Grid borders generation - cell edges
// Verticals have 3 rows, 2 columns
// Horizontals have 2 rows, 3 columns

// _|_|_
// _|_|_
//  | |

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));
// console.log(verticals, horizontals);

// 2.3 Generate starting position
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);
// console.log(startRow, startColumn);

// 2.4. Generate paths
const stepThroughCell = (row, column) => {
	// If I have visited the cell at [row, column], then return
	if (grid[row][column]) {
		return;
	}
	// Mark this cell as being visited
	grid[row][column] = true;
	// Assemble randomly-ordered list of neighbors (top, right, bottom, left)
	const neighbors = shuffle([
		[
			row - 1,
			column,
			'up'
		],
		[
			row,
			column + 1,
			'right'
		],
		[
			row + 1,
			column,
			'down'
		],
		[
			row,
			column - 1,
			'left'
		]
	]);
	// console.log(neighbors);
	// For each neighbor...
	for (let neighbor of neighbors) {
		// deconstruct nextRow and nextColumn from neighbor
		const [
			nextRow,
			nextColumn,
			direction
		] = neighbor;
		// See if that neighbor is out of bounds
		if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
			// move on to next neighbor
			continue;
		}
		// If we have visited that neighbor, continue to next neighbor
		if (grid[nextRow][nextColumn]) {
			// move on to next neighbor
			continue;
		}
		// Remove wall from either horizontals or verticals
		if (direction === 'left') {
			verticals[row][column - 1] = true;
		} else if (direction === 'right') {
			verticals[row][column] = true;
		} else if (direction === 'up') {
			horizontals[row - 1][column] = true;
		} else if (direction === 'down') {
			horizontals[row][column] = true;
		}

		// Visit that next cell
		stepThroughCell(nextRow, nextColumn);
	}
};

// Initiate path-generation from starting position
stepThroughCell(startRow, startColumn);
// console.log(grid);

// 2.5. Draw walls using generated paths
horizontals.forEach((row, rowIndex) => {
	// true means no wall, false - draw wall
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		// calculate position for horizontal wall
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength / 2,
			rowIndex * unitLength + unitLength,
			unitLength,
			5,
			{
				isStatic: true
			}
		);
		// draw calculated horizontal wall
		World.add(world, wall);
	});
});

verticals.forEach((row, rowIndex) => {
	// true means no wall, false - draw wall
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		// calculate position for vertical wall
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength,
			rowIndex * unitLength + unitLength / 2,
			5,
			unitLength,
			{
				isStatic: true
			}
		);
		// draw calculated vertical wall
		World.add(world, wall);
	});
});

// 3.1. Draw goal
const goal = Bodies.rectangle(width - unitLength / 2, height - unitLength / 2, unitLength * 0.7, unitLength * 0.7, {
	isStatic: true
});
World.add(world, goal);

// 3.2. Draw ball (player avatar)
const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4);
World.add(world, ball);

// 4.1. Player input
document.addEventListener('keydown', (event) => {
	const { x, y } = ball.velocity;
	// console.log(x, y);

	if (event.keyCode === 87) {
		// console.log('move ball up');
		Body.setVelocity(ball, { x, y: y - 5 });
	}
	if (event.keyCode === 68) {
		// console.log('move ball right');
		Body.setVelocity(ball, { x: x + 5, y });
	}
	if (event.keyCode === 83) {
		// console.log('move ball down');
		Body.setVelocity(ball, { x, y: y + 5 });
	}
	if (event.keyCode === 65) {
		// console.log('move ball left');
		Body.setVelocity(ball, { x: x - 5, y });
	}
});
