// ============ ARRAYS DESTRUCTURING ============

const raceResults = [
	'Eliud Kipchoge',
	'Feyisa Lelisa',
	'Galen Rupp',
	'Ghirmay Ghebreslassie',
	'Alphonce Simbu',
	'Jared Ward'
];

// The old way:
// const gold = raceResults[0]
// const silver = raceResults[1]
// const bronze = raceResults[2]

// Using Destructuring:
const [ gold, silver, bronze ] = raceResults;
gold; //'Eliud Kipchoge'
silver; //'Feyisa Lelisa'
bronze; //'Galen Rupp'

const [ first, , , fourth ] = raceResults;
first; //'Eliud Kipchoge'
fourth; //'Ghirmay Ghebreslassie'

const [ winner, ...others ] = raceResults;
winner; //'Eliud Kipchoge'
others; //["Feyisa Lelisa", "Galen Rupp", "Ghirmay Ghebreslassie", "Alphonce Simbu", "Jared Ward"]

// ============ OBJECTS DESTRUCTURING ============

const runner = {
	first: 'Eliud',
	last: 'Kipchoge',
	country: 'Kenya',
	title: 'Elder of the Order of the Golden Heart of Kenya'
};

// const {
//   first,
//   last,
//   time
// } = runner;

const { country: nation, title: honorific } = runner;

const { first, last, ...other } = runner;

// ============ NESTED DESTRUCTURING ============

const results = [
	{
		first: 'Eliud',
		last: 'Kipchoge',
		country: 'Kenya'
	},
	{
		first: 'Feyisa',
		last: 'Lilesa',
		country: 'Ethiopia'
	},
	{
		first: 'Galen',
		last: 'Rupp',
		country: 'United States'
	}
];
// NESTED DESTRUCTURING
const [ { first: goldWinner }, { country } ] = results;
goldWinner; //"Eliud"
country; //"Ethiopia"

// more readable way:
const [ , silverMedal ] = results;
const { country } = silverMedal;

// ============ PARAMETERS DESTRUCTURING ============

const runner = {
	first: 'Eliud',
	last: 'Kipchoge',
	country: 'Kenya',
	title: 'Elder of the Order of the Golden Heart of Kenya'
};

// Rather than destructuring INSIDE the function body
// function print(person) {
//   const {
//     first,
//     last,
//     title
//   } = person;
//   console.log(`${first} ${last}, ${title}`)
// }

// We can unpack the values we want right in the parameter list:
function print({ first, last, title }) {
	console.log(`${first} ${last}, ${title}`);
}

const response = [ 'HTTP/1.1', '200 OK', 'application/json' ];

// Also works with array parameters:
function parseResponse([ protocol, statusCode, contentType ]) {
	console.log(`Status: ${statusCode}`);
}
