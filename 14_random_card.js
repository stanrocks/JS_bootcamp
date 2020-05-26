// Write a getCard() function which returns a random playing card object, like:
// 		{
// 			value: 'K'
// 			suit: 'clubs'
// 		}
//Pick a random value from:
//----1,2,3,4,5,6,7,8,9,10,J,Q,K,A
//Pick a random suit from:
//----clubs,spades, hearts, diamonds
//Return both in an object

// my solution:
function getCard() {
	const values = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ];
	const suits = [ 'clubs', 'spades', 'hearts', 'diamonds' ];
	let genValue = Math.floor(Math.random() * 13);
	let genSuit = Math.floor(Math.random() * 4);
	return { value: values[genValue], suit: suits[genSuit] };
}
