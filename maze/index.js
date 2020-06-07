// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

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

// Mouse clicking and dragging support
World.add(
	world,
	MouseConstraint.create(engine, {
		mouse: Mouse.create(render.canvas)
	})
);

// // create shape (200,200 - position of rectangle center, 50,50 - size)
// const shape = Bodies.rectangle(200, 200, 50, 50, {
// 	// rectangle is static and is not affected by gravity
// 	isStatic: true
// });
// // add created shape to the world
// World.add(world, shape);

// check what the world is
// console.log(world);
// shows array objects that exist in world
// console.log(world.bodies);

// Walls
const walls = [
	Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
	Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
	Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
	Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
];

World.add(world, walls);

// Create and add rectangle
World.add(world, Bodies.rectangle(200, 200, 50, 50));
