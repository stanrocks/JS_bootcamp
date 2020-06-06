const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	// create output area (root) with html-structure
	root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	// get data from API
	// async mode since gonna use promise
	const onInput = async (event) => {
		// await for promise to be resolved
		const items = await fetchData(event.target.value);
		// hide dropdown and stop function if no items found
		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}
		// clear results (from previous search)
		resultsWrapper.innerHTML = '';
		// make dropdown visible
		dropdown.classList.add('is-active');
		// render output for every item
		for (let item of items) {
			const option = document.createElement('a');
			// show dropdown
			option.classList.add('dropdown-item');
			// render HTML structure
			option.innerHTML = renderOption(item);

			// item selection
			option.addEventListener('click', () => {
				// hide dropdown
				dropdown.classList.remove('is-active');
				// put selected item name to input
				input.value = inputValue(item);
				// run on select
				onOptionSelect(item);
			});

			// append every found item to results output area (dropdown)
			resultsWrapper.appendChild(option);
		}
	};
	// debounce user input (delay 0.5 sec), then run onInput func (get data from API)
	input.addEventListener('input', debounce(onInput, 500));

	// close dropdown
	document.addEventListener('click', (event) => {
		// shows element that's been clicked by user
		// console.log(event.target);
		// hide dropdown menu if clicked outside root-area (area with input and dropdown)
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
