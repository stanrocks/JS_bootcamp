const btn = document.querySelector('button');

btn.addEventListener('mouseover', function() {
	console.log('MOUSE OVER ME');

	// size of current window (even if resized by user):
	// window.innerHeight
	// window.innerWidth

	const height = Math.floor(Math.random() * window.innerHeight);
	const width = Math.floor(Math.random() * window.innerWidth);

	btn.style.left = `${width}px`;
	btn.style.top = `${height}px`;
});

btn.addEventListener('click', function() {
	btn.innerText = 'YOU GOT ME!';
	document.body.style.backgroundColor = 'green';
});
