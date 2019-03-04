const util = require('util');
const result = util.formatWithOptions({colors: true}, 'See object %O', {foo: 42, bar: 'string'});
console.log(result, typeof result);

const types = util.types;
console.log(types, typeof types);
const date = +new Date();
console.log(types.isDate(new Date()), types.isDate(date));

