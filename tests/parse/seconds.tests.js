const test = require('tape');
const parseSeconds = require('../../parse/seconds');
const tokens = require('../../lex/tokens');

const {MAX_SECONDS, MIN_SECONDS} = parseSeconds;

const arrayToGen = function* (tokens) {
    for (let token of tokens) {
        yield token;
    }
};

const rangeExc = (start, stop) => {
    let i = start;
    const result = [];
    while (i < stop)
        result.push(i++);

    return result;
};

const rangeInc = (start, stop) => rangeExc(start, stop + 1);

test('parses all token', t => {
    t.plan(2);

    const cron = [
        tokens.AllToken(),
        tokens.WhiteSpaceToken()
    ];

    const expected = rangeInc(MIN_SECONDS, MAX_SECONDS);

    const iter = arrayToGen(cron);
    const cur = iter.next();

    const {offset, expression} = parseSeconds(iter, cur);

    t.equal(offset, 2, 'Offset should be 2');
    t.deepEqual(expression.eval(), expected, `Should be range ${MIN_SECONDS}-${MAX_SECONDS}`);
});

test('throws unexpected token error on all token missing trailing whitespace', t => {
    t.plan(1);

    const iter = arrayToGen([tokens.AllToken()]);
    const cur = iter.next();

    t.throws(() => parseSeconds(iter, cur), /Unexpected end of input after position 1/, 'Should throw unexpected token');
});

test('parses step expression', t => {
    t.plan(3);

    const result = [0, 10, 20, 30, 40, 50];

    const tokenList = [
        tokens.NumberToken('0'),
        tokens.StepToken(),
        tokens.NumberToken('10'),
        tokens.WhiteSpaceToken()
    ];

    const iter = arrayToGen(tokenList);
    const cur = iter.next();

    const subIter = arrayToGen(tokenList);
    const subCur = subIter.next();

    t.doesNotThrow(() => parseSeconds(subIter, subCur), /Unexpected end of input after position 4/, 'Should not throw unexpected end of input');

    const {expression, offset} = parseSeconds(iter, cur);

    t.equal(offset, 4, 'Offset should be 4');
    t.deepEquals(expression.eval(), result, 'Range should match [0, 10, 20, 30, 40, 50]');
});