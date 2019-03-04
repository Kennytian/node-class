const assert = require('assert');

assert.strictEqual(typeof 10, 'number');
assert.strictEqual(typeof 10n, 'bigint');

assert.deepStrictEqual(10n, BigInt(10));
assert.deepEqual(10n, 10);

const limit = Number.MAX_SAFE_INTEGER;
assert.deepStrictEqual(9007199254740991, limit);

