import {Cache} from "../src/cache";

// test('it fails', () => {
//     expect(false).toBe(true);
// });

// test('Create cache', () => {
//     const cache = new Cache();
// })
//
// test('Add (key, value, count) to cache', () => {
//     const cache = new Cache();
//     const key = 'key';
//     const value = 'value';
//     const count = 3;
//     cache.add(key, value, count);
// })
//
// test('Add (key, value) to cache', () => {
//     const cache = new Cache();
//     const key = 'key';
//     const value = 'value';
//     cache.add(key, value);
// })

test('Take value by nonexistent key', () => {
    const cache = new Cache();
    const not_key = 'not';
    const key = 'key';
    const value = 'value';
    cache.add(key, value);
    expect(cache.take(key)).toBe(value);
    expect(cache.take(not_key)).toBeNull();
})

test('Take value by existent key at once', () => {
    const cache = new Cache();
    const key = 'key';
    const value = 'value';
    cache.add(key, value);
    expect(cache.take(key)).toBe(value);
})


test('Take value by existent key twice with 1 access count', () => {
    const cache = new Cache();
    const key = 'key';
    const value = 'value';
    cache.add(key, value);
    expect(cache.take(key)).toBe(value);
    expect(cache.take(key)).toBeNull();
})

test('Give statistic of cache work', () => {
    const cache = new Cache();
    cache.add('1', 'one', 1);
    cache.add('2', 'two', 2);
    cache.add('3', 'three', 3);

    cache.take('1');
    cache.take('2');
    cache.take('3');

    expect(cache.statistics()).toStrictEqual(
        [['1', 'one', 0], ['2', 'two', 1], ['3', 'three', 2]]);
})

test('Give history of cache work', () => {
    const cache = new Cache();
    cache.add('1', 'one', 1);
    cache.add('2', 'two', 2);
    cache.add('3', 'three', 3);

    cache.take('1');
    cache.take('1');
    cache.take('0');
    cache.take('2');
    cache.take('2');
    cache.take('3');

    expect(cache.history).toStrictEqual(
        [['1', 'one', 0], ['1', 'null'], ['0', 'null'], ['2', 'two', 1], ['2', 'two', 0],['3', 'three', 2]]);
})
