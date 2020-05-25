for (let i = 1; i <= 10; i++) {
	console.log('Hello:', i); // Hello: 1-10
}

for (let i = 1; i <= 10; i += 3) {
	console.log('Hello:', i); // Hello: 1,4,7,10
}

// let's generate perfect squares:
for (let i = 1; i <= 20; i++) {
	console.log(`${i} x ${i} = ${i * i}`); // 1, 4, 9, 16...
}

// 50, 40, 30, 20, 10, 0
for (let i = 50; i >= 0; i -= 10) {
	console.log(i);
}
