// create matter object consist of matter elements
const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 800;
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

// Random Shapes
for (let i = 0; i < 50; i++) {
	if (Math.random() > 0.5) {
		// Create and add rectangle in random place
		World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
	} else {
		// Create and add circle in random place (x, y, radius, )
		World.add(
			world,
			Bodies.circle(Math.random() * width, Math.random() * height, 35, {
				render: {
					// define color instead of default colors
					fillStyle: 'green'
				}
			})
		);
	}
}
