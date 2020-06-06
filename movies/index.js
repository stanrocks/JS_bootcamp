const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			s: 'avengers'
		}
	});
	console.log(response.data);
};

fetchData();
