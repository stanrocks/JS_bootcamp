let day = 1;

// instead of long list of if - else if - else statements we can use switch:

switch (day) {
	case 1:
		console.log('MONDAY');
		break; // without break next cases will also be executed (strange)
	case 2:
		console.log('TUESDAY');
		break;
	case 3:
		console.log('WEDNESDAY');
		break;
	case 4:
		console.log('THURSDAY');
		break;
	case 5:
		console.log('FRIDAY');
		break;
	case 6:
		console.log('SATURDAY');
		break;
	case 7:
		console.log('SUNDAY');
		break;
	default:
		console.log('INVALID DAY');
}

let emoji = 'happy face';

switch (emoji) {
	case 'sad face':
	case 'happy face':
		console.log('yellow');
		break;
	case 'eggplant':
		console.log('purple');
		break;
	case 'heart':
	case 'lips':
		console.log('red');
		break;
}
