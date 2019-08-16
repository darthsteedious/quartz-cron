const test = require('tape');
const { isDigit } = require('../util');

const createIsDigitTest = digit => test(`testing isDigit '${digit}'`, t => {
    t.plan(1);

    t.ok(isDigit(digit))
});

const createTestsForRange = ([start, stop]) => {
    const result = [];
    for (let i = start; i < stop; i++) {
        result.push(i)
    }

    result.map(r => `${r}`).forEach(createIsDigitTest)
};

createTestsForRange([0,10]);

test("testing characters ('a', '-','  ','') not digits", t => {
    t.plan(4);

    t.notOk(isDigit('a'));
    t.notOk(isDigit('-'));
    t.notOk(isDigit(' '));
    t.notOk(isDigit(''));
});