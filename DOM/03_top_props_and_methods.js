// Important Properties and Methods:

// classList
// getAttribute()
// setAttribute()
// appendChild()
// append()
// prepend()
// removeChild()
// remove()
// createElement
// innerText
// textContent
// innerHTML
// value
// parentElement
// children
// nextSibling
// previousSibling
// style

// ========= 1. accessing text =========
// ========= 1.1 innerText =========
// shows only visible text
document.querySelector('h1');
h1.innerText;

document.querySelector('ul');
ul.innerText; // we get text inside ul even if text is actually inside li elements nested in ul
ul.innerText = 'I am a text'; // this will destroy li elements inside ul

document.body.innerText; // shows all text inside page

// ========= 1.2 textContent =========
// also shows hidden content, but no html
// faster then innerText
// will also overwrite content and destroy child elements

// ========= 1.3 innerHTML =========
// shows hidden content and html tags
// treats tags as html tags (convert them to html tags)
h1.innerHTML += ' is cool'; // header with content "My Webpage is cool"
h1.innerHTML += '<b>!!!!!!!!!!</b>'; // header with content "My Webpage is cool !!!!!!!!!!!!" exclamation marks are bolded

// ========= 2.1 accessing some values and other attributes =========

const inputs = document.querySelectorAll('input');
inputs[0].value; // accessing current value of first input
inputs[2].checked; // accessing state of checkbox

const a = document.querySelector('a');
a.href = 'http://www.google.com'; // assign a tag link to google

// ========= 2.2 getAttribute() and setAttribute() methods =========

// select range-type input
const range = document.querySelector('input[type="range"]');

// get max attribute of that input
range.getAttribute('max'); // 500
range.getAttribute('min'); // 100
range.getAttribute('type'); // range
range.getAttribute('lolol'); // null - no such attr

range.setAttribute('min', '-500'); // change attribute 'min' to -500

range.setAttribute('type', 'radio'); // change input type from range to radio-button

// also can change id same way

// ========= 3. accessing neighbor elements =========
// parentElement
// children
// nextSibling
// previousSibling

const li = document.querySelector('li');
li.parentElement; // <ul>
li.parentElement.parentElement; // <body>
li.parentElement.parentElement.parentElement; // <html>
li.parentElement.parentElement.parentElement.parentElement; // null

const ul = document.querySelector('ul');
ul.children; // HTMLCollection of (possibly) li elements inside that ul
ul.children[0]; // first child (possibly first li element)
ul.children[0].innerText; // access text of first child (possibly first li element)

// siblings are elements on the same level
const firstLi = ul.children[0];
firstLi.nextElementSibling; // access to next sibling (second li element)
firstLi.nextElementSibling.nextElementSibling; // access to next after next sibling (third li element)

const thirdLi = firstLi.nextElementSibling.nextElementSibling;
thirdLi.previousElementSibling; // access to previous sibling (second li element)

// ========= 4. style =========

const h1 = document.querySelector('h1');
h1.style.color; // '' (empty) - unable to read style unless it's style defined inline
h1.style.color = 'orchid'; // color is changed to orchid

h1.style.backgroundColor; // in CSS we use background-color, in JS it is not a valid identifier. in JS we have to use camelCase - backgroundColor

// this is how we can change one style at a time

// how to change style for multiple elements:
const allLis = document.querySelectorAll('li');
const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple' ];

allLis.forEach((li, i) => {
	const color = colors[i];
	// console.log(el, i);
	li.style.color = color;
});
