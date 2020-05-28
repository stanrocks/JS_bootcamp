const allLis = document.querySelectorAll('li');

// for (let i = 0; i < allLis.length; i++) {
// 	console.log(allLis[i].innerText);
// 	allLis[i].innerText = 'WE ARE THE CHAMPIONS!!!';
// }

for (let li of allLis) {
	li.innerHTML = 'WE ARE <b>THE CHAMPIONS</b>';
}
