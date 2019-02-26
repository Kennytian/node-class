const assert = require('assert');

assert.deepStrictEqual(1, 1);

assert.notDeepStrictEqual([[[1, 2, 3]], 4, 5], [[[1, 2, 3]], '4', 5]);

const user1 = {name: 'Kenny', gender: 'male', age: 30};
const user2 = {name: 'Kenny', gender: 'male', age: 30};
assert.deepStrictEqual(user1, user2);

assert.ifError(null);
