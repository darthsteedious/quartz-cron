const test = require('tape');
const {arrayToGen, rangeInc} = require("../utils");
const tokens = require('../../lex/tokens');
const expressions = require('../../parse/expressions');
const {parseRange} = require("../../parse/common");

const testCases = [
    [0, 59, 59],
    [0, 23, 23],
    [0, 6, 6],
    [0, 1, 59],
    [0, 13, 23],
    [0, 4, 6],
    [1, 5, 59],
    [18, 43, 59]
];

testCases.forEach(([start, stop, max]) => test(`range test ${start}-${stop}`, t => {
    t.plan(3);

    const tokenList = [tokens.NumberToken(`${stop}`)];
    const iter = arrayToGen(tokenList);
    const iter2 = arrayToGen(tokenList);

    const lhs = expressions.Number(`${start}`);
    const nLen = `${start}`.length;

    const pos = nLen + 1;

    t.doesNotThrow(() => parseRange(lhs, iter2, pos, max));

    const { offset, expression } = parseRange(lhs, iter, pos, max);

    const expectedOffset = pos + `${stop}`.length;
    const exprResult = rangeInc(start, stop);
    t.equal(offset, expectedOffset, `offset should be ${expectedOffset}`);
    t.deepEqual(expression.eval(), exprResult, `expression result should be ${JSON.stringify(exprResult)}`);
}));

test('should fail when step is above max', t => {
    t.plan(1);

    const tokenList = [
        tokens.NumberToken('59')
    ];

    const iter = arrayToGen(tokenList);

    const n = Number('0');
    const max = 23;

    t.throws(() => parseRange(n, iter, 2, max), new RegExp(`Range end value cannot exceed the maximum of ${max}`))
});

const nonNumberTokens = [
    tokens.AllToken(),
    tokens.NoneToken(),
    tokens.RangeToken(),
    tokens.SeparatorToken(),
    tokens.StepToken(),
    tokens.UnknownToken('#'),
    tokens.WhiteSpaceToken(),
];

nonNumberTokens.forEach(token => test(`non-number token ${token.value} should throw`, t => {
    t.plan(1);

    const iter = arrayToGen([token]);

    const n = Number('0');
    const max = 23;

    t.throws(() => parseRange(n, iter, 2, max),
        `Unexpected token '${JSON.stringify(token.value)}' at pos ${2}. Expected one of [0-${max}]`, 'should throw unexpected token');
}));