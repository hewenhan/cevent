const randomStr = (length) => {
	var length    = parseInt(length);
	var str       = '';
	while (true) {
		var lessNum = str.length - length;
		if (lessNum >= 0) {
			str = str.substr(0, length);
			break;
		}
		var charList = Math.random().toString(36);
		str += charList.substr(2, charList.length - 2);
	}
	return str;
};

const ePool = {};
const createdIdList = [];

const tryInitIdArray = (name) => {
	if (ePool[name] != null) {
		return;
	}
	ePool[name] = {};
	ePool[name].data = {};
	ePool[name].cbList = {};
	ePool[name].onceTagArr = [];
	ePool[name].triggered = false;
};

const createCallbackMap = (name, cb) => {
	if (typeof cb !== 'function') {
		return;
	}
	var id = randomStr(5);
	if (createdIdList.indexOf(id) !== -1) {
		createCallbackMap(name, cb);
		return;
	}
	createdIdList.push(id);
	ePool[name].cbList[id] = cb;

	return id;
};

module.exports = {
	// trigger event and call all listener functions or methods
	emit: (name, data) => {
		tryInitIdArray(name);
		ePool[name].data = data;
		for (var i in ePool[name].cbList) {
			ePool[name].cbList[i](ePool[name].data);
			if (ePool[name].onceTagArr.indexOf(i) !== -1) {
				delete ePool[name].cbList[i];
				createdIdList.splice(createdIdList.indexOf(i),1);
				ePool[name].onceTagArr.splice(i, 1);
			}
		}
		ePool[name].triggered = true;
		return true;
	},
	// listen a event by name, when event emiting, trigger this listener callback everytime
	on: (name, cb) => {
		tryInitIdArray(name);
		var result = {
			name: name,
			eventId: createCallbackMap(name, cb)
		};
		return result;
	},
	// be different with method "on"
	// if the event name has emited, then catch last event data and trigger this event
	// this method always trigger once, only once
	once: (name, cb) => {
		tryInitIdArray(name);
		if (ePool[name].triggered) {
			cb(ePool[name].data);
			return null;
		}

		var result = {
			name: name,
			eventId: createCallbackMap(name, cb)
		};

		ePool[name].onceTagArr.push(result.eventId);
		return result;
	},
	// remove event listener object by eventObject
	drop: (eventObject) => {
		if (typeof eventObject !== 'object') {
			return false;
		}
		createdIdList.splice(createdIdList.indexOf(eventObject.eventId),1);
		delete ePool[eventObject.name].cbList[eventObject.eventId];

		console.log(ePool);
		console.log(createdIdList);
		return true;
	},
	_ePool: ePool
};
