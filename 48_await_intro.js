async function getPlanets() {
	const res = await axios.get('https://swapi.co/api/planets/');
	console.log(res.data); //only runs once the previous line is complete (the axios promise is resolved)
}

getPlanets();

// Without async/await...

// function getPlanets() {
// 	return axios.get('https://swapi.co/api/planets/');
// }

// getPlanets().then((res) => {
// 	console.log(res.data);
// });

// ========== ERROR HANDLING ==========

// ONE OPTION FOR ERROR HANDLING...
async function getPlanets() {
	//Invalid URL...
	const res = await axios.get('https://swapi.co/api/planeklsajdalksts/');
	console.log(res.data);
}

getPlanets().catch((err) => {
	console.log('IN CATCH!!!');
	console.log(err);
});

// ANOTHER OPTION...
async function getPlanets() {
	try {
		const res = await axios.get('https://swapi.co/api/planeklsajdalksts/');
		console.log(res.data);
	} catch (e) {
		console.log('IN CATCH!', e);
	}
}
getPlanets();
