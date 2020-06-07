// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies } = Matter;

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
		width: 800,
		height: 600
	}
});

// execute render
Render.run(render);
Runner.run(Runner.create(), engine);

// create shape
const shape = Bodies.rectangle(200, 200, 50, 50, {
	isStatic: true
});

// add created shape to the world
World.add(world, shape);