const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'c4a8ca95',
			i: 'tt0848228'
		}
	});
	console.log(response.data);
};

fetchData();
