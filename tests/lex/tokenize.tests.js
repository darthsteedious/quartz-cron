const test = require('tape');
const tokenize = require('../../lex');
const tokens = require('../../lex/tokens');
const { collectTokens } = require('../utils');

test('tokenizes 0-9', t => {
    t.plan(4);

    const iter = tokenize('0-9');
    let cur = iter.next();
    t.deepEqual(cur.value, tokens.DigitToken(0));

    cur = iter.next();
    t.deepEqual(cur.value, tokens.RangeToken());

    cur = iter.next();
    t.deepEqual(cur.value, tokens.DigitToken(9));

    cur = iter.next();
    t.ok(cur.done);
});

test('tokenize 0/3 0 0 ? * *', t => {
    t.plan(1);

    const result = [
        tokens.DigitToken(0),
        tokens.StepToken(),
        tokens.DigitToken(3),
        tokens.WhiteSpaceToken(),
        tokens.DigitToken(0),
        tokens.WhiteSpaceToken(),
        tokens.DigitToken(0),
        tokens.WhiteSpaceToken(),
        tokens.NoneToken(),
        tokens.WhiteSpaceToken(),
        tokens.AllToken(),
        tokens.WhiteSpaceToken(),
        tokens.AllToken()
    ];

    t.deepEqual(collectTokens(tokenize,'0/3 0 0 ? * *'), result);
});

test('tokenize empty is done', t => {
    t.plan(1);

    const iter = tokenize('');
    const cur = iter.next();

    t.ok(cur.done);
});

test('tokenize unknown token', t => {
    t.plan(1);

    const result = [
        tokens.DigitToken(3),
        tokens.UnknownToken('#'),
        tokens.DigitToken(1)
    ];

    t.deepEqual(collectTokens(tokenize, '3#1'), result);
});