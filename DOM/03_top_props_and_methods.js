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

// ========= accessing text =========
// ========= innerText =========
// shows only visible text
document.querySelector('h1');
h1.innerText;

document.querySelector('ul');
ul.innerText; // we get text inside ul even if text is actually inside li elements nested in ul
ul.innerText = 'I am a text'; // this will destroy li elements inside ul

document.body.innerText; // shows all text inside page

// ========= textContent =========
// also shows hidden content, but no html
// faster then innerText
// will also overwrite content and destroy child elements

// ========= innerHTML =========
// shows hidden content and html tags
// treats tags as html tags (convert them to html tags)
h1.innerHTML += ' is cool'; // header with content "My Webpage is cool"
h1.innerHTML += '<b>!!!!!!!!!!</b>'; // header with content "My Webpage is cool !!!!!!!!!!!!" exclamation marks are bolded

// ========= accessing some values and other attributes =========

const inputs = document.querySelectorAll('input');
inputs[0].value; // accessing current value of first input
inputs[2].checked; // accessing state of checkbox

const a = document.querySelector('a');
a.href = 'http://www.google.com'; // assign a tag link to google

// ========= getAttribute() and setAttribute() methods =========
