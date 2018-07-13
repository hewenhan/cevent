

EASY CUSTOM EVENT
================

LIGHT EVENT MODULE ON JAVASCRIPT

`version`: `v1.0.4`
`author`: `Blind Holmes`

----

# USEAGE
## INSTALL

```
npm install cevent
```

## QUICK START

```

const cevent = require('cevent');

cevent.once('test', (data) =>` {
	console.log("TEST EVENT EMITED ONCE");
	console.log("TEST DATA IS: ");
	console.log(data);
});

cevent.emit('test', {
	hello: 'world'
});


```

## METHOS

- cevent.on(eventName, callback)
	- eventName `<string>`
	- callback `<Function>`
		- data `<data>`

Create a event listener by eventName, event callback when event triggered every time.
Returns a eventObject.

- cevent.once(eventName, callback)
	- eventName `<string>`
	- callback `<Function>`
		- data `<data>`

Create a event listener by eventName, event callback when event first trigger.
Be different with method "on".
If the event name has emited, then catch last event data and trigger this event.
This method always trigger once, only once.
Returns a eventObject.

- cevent.emit(eventName, data)
	- eventName `<string>`
	- data `<data>`

Trigger a event in time and emit data.
Returns `<bollean>`.

- cevent.drop(eventObject)
	- eventObject `<eventObject>`

Remove event listener object by eventObject.
Returns `<bollean>`.
