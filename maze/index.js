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
	Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
	// bottom
	Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
	// left
	Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
	// right
	Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];

World.add(world, walls);
