// Array methods

// add\remove at END:
//  push - add to end
//  pop - remove from end

// add\remove at START:
//  shift - remove from start
//  unshift - add to start

// concat - merge two or more arrays
const arr1 = [ 'a', 'b', 'c' ];
const arr2 = [ 'd', 'e', 'f' ];
let letters;
letters = arr1.concat(arr2); // ["a", "b", "c", "d", "e", "f"]
// also can concat more than 2 arrays:
letters = arr1.concat(arr2, arr3, arr4);

// includes - look for a value (exact match) - returns true or false
const arr1 = [ 'a', 'b a', 'c' ];
console.log(arr1.includes('b')); // false
console.log(arr1.includes('b a')); // true

// indexOf - look for a value (exact match) - returns index or -1
console.log(arr1.indexOf('b a')); // 1
console.log(arr1.indexOf('b')); // -1

// reverse - reverses array in place
const arr1 = [ 'a', 'b', 'c' ];
arr1.reverse();
console.log(arr1); // c b a

// join - creates and returns a new string by concatenating all elements of array
let elements = [ 'Fire', 'Air', 'Water' ];
console.log(elements.join()); // 'Fire,Air,Water'
console.log(elements.join(' ')); // 'Fire Air Water'
console.log(elements.join(', ')); // 'Fire, Air, Water'

// slice - portion of an array - same as str.slice
let animals = [ 'shark', 'salmon', 'whale', 'bear', 'lizard', 'tortoise' ];
let swimmers = animals.slice(0, 3); // 0 included, 3 not included. ["shark", "salmon", "whale"]
let reptiles = animals.slice(4); // ["lizard", "tortoise"]
let reptiles = animals.slice(-2); // ["lizard", "tortoise"] (same, just counting indexes from end)
let copy = animals.slice(); // creates a copy of whole array

// splice - change content of array - remove, replace and/or add new elements in place
let animals = [ 'shark', 'salmon', 'whale', 'bear', 'lizard', 'tortoise' ];
animals.splice(1, 0, 'octopus'); // (index, how many els to delete, what to add) - adding octopus to index 1 - ["shark", "octopus", "salmon", "whale", "bear", "lizard", "tortoise"]
animals.splice(1, 0, 'octopus', 'cat', 'dog'); // add 3 items to place from index 1
animals.splice(3, 2); // from index 3 delete 2 elements, nothing to add. returns deleted items (["whale", "bear"]). animals now is: ["shark", "octopus", "salmon", "lizard", "tortoise"]
animals.splice(0, 2, 'SHARK!', 'OCTOPUS'); // removes two first values and put two new values at their place

// sort - sorts an array in place based on UTF-16 (alphabetically). time and complexity cannot be guaranteed
let months = [ 'March', 'Jan', 'Feb', 'Dec' ];
months.sort(); // ["Dec", "Feb", "Jan", "March"]
let nums = [ 34, 10, 10000, 67, 99 ];
nums.sort(); // [10, 10000, 34, 67, 99] - because based on UTF-16, its not a numeric sort
