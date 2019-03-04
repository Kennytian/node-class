const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.on('myEvent', () => {
    console.log('log 1');
});
emitter.on('myEvent', () => {
    console.log('log 2');
});
emitter.emit('myEvent');
