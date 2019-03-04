process.nextTick(function A() {
    console.log(1);
    process.nextTick(function B() {
        console.log(2);
    });
});

setTimeout(function () {
    console.log('Timeout fired');
}, 0);

setImmediate(() => {
    console.log(3);
    setImmediate(() => {
        console.log(4);
    })
});

setTimeout(() => {
    console.log('Timeout fired2')
}, 0);
