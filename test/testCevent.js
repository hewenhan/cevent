const event = require('../cevent');

event.once('test', (data) => {
	console.log("TEST EVENT EMITED ONCE");
	console.log("TEST DATA IS: ");
	console.log(data);
});
const testOn = event.on('test', (data) => {
	console.log("TEST EVENT EMITED IN ON");
	console.log("TEST DATA IS: ");
	console.log(data);
});

console.log(testOn);

event.emit('test', {
	hello: 'world'
});

event.emit('test', {
	hello: 'world2'
});

event.once('test', (data) => {
	console.log("TEST EVENT EMITED BY LASTEVENT");
	console.log("TEST DATA IS: ");
	console.log(data);
});

event.drop(testOn);

event.emit('test', {
	hello: 'world3'
});
