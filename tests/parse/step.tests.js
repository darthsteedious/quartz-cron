const test = require('tape');
const tokens = require('../../lex/tokens');
const {Number} = require('../../parse/expressions');
const {parseStepRange} = require('../../parse/common');
const {arrayToGen, rangeInc} = require('../utils');


const testCases = [
    [
        '0/3',
        rangeInc(0, 59, 3),
        [
            tokens.NumberToken('0'),
            tokens.StepToken(),
            tokens.NumberToken('3')
        ],
        59
    ],
    [
        '0/5',
        rangeInc(0, 23, 5),
        [
            tokens.NumberToken('0'),
            tokens.StepToken(),
            tokens.NumberToken('5')
        ]
        , 23
    ],
    [
        '0/2',
        rangeInc(0, 6, 2),
        [
            tokens.NumberToken('0'),
            tokens.StepToken(),
            tokens.NumberToken('2')
        ],
        6
    ]
];

testCases.forEach(c => {
    const [cron, expected, input, max] = c;

    test(`parseStep case ${cron}`, t => {
        t.plan(3);

        const iter = arrayToGen(input);
        const curr = iter.next();
        const start = curr.value.value;
        const n = Number(start);
        iter.next();

        const subIter = arrayToGen(input);
        const subCur = subIter.next();
        const subStart = subCur.value.value;
        const subN = Number(subStart);

        subIter.next();
        t.doesNotThrow(() => parseStepRange(subN, subIter, subStart.length + 1, max), 'Should not throw exception');

        console.dir(`pos: ${start.length + 1}`);
        const {offset, expression} = parseStepRange(n, iter, start.length + 1, max);

        t.equal(offset, input.reduce((total, {value}) => total + value.length, 0), 'Should match expected offset');
        t.deepEqual(expression.eval(), expected, 'Should match expected value');
    })
});

test('should fail when step is above max', t => {
    t.plan(1);

    const tokenList = [
        tokens.NumberToken('59')
    ];

    const iter = arrayToGen(tokenList);

    const n = Number('0');
    const max = 23;

    t.throws(() => parseStepRange(n, iter, 2, max), new RegExp(`Step value cannot exceed the maximum of ${max}`))
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

    t.throws(() => parseStepRange(n, iter, 2, max),
        `Unexpected token '${JSON.stringify(token.value)}' at pos ${2}. Expected one of [0-${max}]`, 'should throw unexpected token');
}));