// =========== get Element By Id ===========
// To select the element with id of bear-photo:
document.getElementById('bear-photo');

//To select the element with id of main:
document.getElementById('main');

// =========== get Elements By TagName ===========

//To select all li's
document.getElementsByTagName('li');

// To select all h1's (there's only one on this page):
document.getElementsByTagName('h1');

//Remember, getElementsByTagName returns an array-like object (NOT a real array)
const inputs = document.getElementsByTagName('input'); //get all inputs
inputs[0]; //this works
inputs.pop(); //DOES NOT WORK! pop() is an array method, and this isn't an array!

// =========== get Elements By Class Name ===========

// To select all elements with the class of 'special':
document.getElementsByClassName('special');

//getElementsByClassName also returns an array-like object.
// We don't have access to array methods, but we can iterate:

const specials = document.getElementsByClassName('special');
for (let el of specials) {
	console.log(el);
}

//We can use spread to make an actual array:
const arr = [ ...specials ];
arr.pop(); //this works because it's now an array!

// We can use methods for vars (search inside particular element):
const ul = document.getElementsByTagName('ul')[0];
ul.getElementsByClassName('special'); // gets HTMLCollection of 'special' class elements inside ul element
ul.getElementsByTagName('li'); // gets HTMLCollection of li elements inside ul

// =========== querySelector ===========
// better universal way to select first match !!!!!!!!!!!!!!
// but a little bit less performant
// but it worth it

//To find the first li on the page:
document.querySelector('li');

//To find the first element with class of special:
document.querySelector('.special');

//To find the first li element with class of special:
// since we pass in a proper valid CSS-selector
document.querySelector('li.special');

//To find the first element with id of main (there should only be one...)
document.querySelector('#main');

// To find the first li with the class of special, nested inside of a ul, nested inside a section:
document.querySelector('section ul li.special');

// =========== querySelectorAll ===========
// better universal way to select all matches !!!!!!!!!!!!!!
// returns NodeList (array-like object)

// To find ALL li's on the page:
document.querySelectorAll('li');

// To find ALL elements with the class of special on the page:
specials = document.querySelectorAll('.special');

// since its an array-like we can use those:
specials[0];
specials.length;
specials.forEach((element) => {});
