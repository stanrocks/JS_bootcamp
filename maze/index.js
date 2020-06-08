// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// maze generation config
const cellsHorizontal = 19;
const cellsVertical = 10;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

// create new engine
const engine = Engine.create();
engine.world.gravity.y = 0; // disable falling down

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
		wireframes: false,
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
const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
// console.log(grid);

// 2.2. Grid borders generation - cell edges
// Verticals have 3 rows, 2 columns
// Horizontals have 2 rows, 3 columns

// _|_|_
// _|_|_
//  | |

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));
// console.log(verticals, horizontals);

// 2.3 Generate starting position
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);
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
		if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
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
			columnIndex * unitLengthX + unitLengthX / 2,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			5,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'firebrick'
				}
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
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY / 2,
			5,
			unitLengthY,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'darkred'
				}
			}
		);
		// draw calculated vertical wall
		World.add(world, wall);
	});
});

// 3.1. Draw goal
const goal = Bodies.rectangle(width - unitLengthX / 2, height - unitLengthY / 2, unitLengthX * 0.7, unitLengthY * 0.7, {
	label: 'goal',
	isStatic: true,
	render: {
		fillStyle: 'limegreen'
	}
});
World.add(world, goal);

// 3.2. Draw ball (player avatar)
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
	label: 'ball',
	render: {
		fillStyle: 'deepskyblue'
	}
});
World.add(world, ball);

// 4. Player input
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

// 5. Win Condition
Events.on(engine, 'collisionStart', (event) => {
	event.pairs.forEach((collision) => {
		// console.log(collision);

		// labels of player avatar and goal that should collide for win
		const labels = [
			'ball',
			'goal'
		];

		// user win if bodies with labels collide
		if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
			document.querySelector('.winner').classList.remove('hidden');
			// console.log('User won!');
			world.gravity.y = 1;
			world.bodies.forEach((body) => {
				if (body.label === 'wall') {
					Body.setStatic(body, false);
				}
			});
		}
	});
});
