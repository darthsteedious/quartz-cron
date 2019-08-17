const test = require('tape');
const tokenize = require('../../lex');
const tokens = require('../../lex/tokens');
const { collectTokens } = require('../utils');

test('tokenizes 0-9', t => {
    t.plan(4);

    const iter = tokenize('0-9');
    let cur = iter.next();
    t.deepEqual(cur.value, tokens.NumberToken('0'), 'Token should be NumberToken(0)');

    cur = iter.next();
    t.deepEqual(cur.value, tokens.RangeToken(), 'Token should be RangeToken');

    cur = iter.next();
    t.deepEqual(cur.value, tokens.NumberToken('9'), 'Token should be NumberToken(9)');

    cur = iter.next();
    t.ok(cur.done);
});

test('tokenize 0/3 0 0 ? * *', t => {
    // t.plan(1);

    const result = [
        tokens.NumberToken('0'),
        tokens.StepToken(),
        tokens.NumberToken('3'),
        tokens.WhiteSpaceToken(),
        tokens.NumberToken('0'),
        tokens.WhiteSpaceToken(),
        tokens.NumberToken('0'),
        tokens.WhiteSpaceToken(),
        tokens.NoneToken(),
        tokens.WhiteSpaceToken(),
        tokens.AllToken(),
        tokens.WhiteSpaceToken(),
        tokens.AllToken()
    ];

    t.plan(result.length);

    collectTokens(tokenize,'0/3 0 0 ? * *').forEach((token, i) => t.equal(token.value, result[i].value, `Token should be (${result[i].type}, ${result[i].value})`));
});

test('tokenize empty is done', t => {
    t.plan(1);

    const iter = tokenize('');
    const cur = iter.next();

    t.ok(cur.done, 'Iterator should be done');
});

test('tokenize unknown token', t => {
    const result = [
        tokens.NumberToken('3'),
        tokens.UnknownToken('#'),
        tokens.NumberToken('1')
    ];

    t.plan(result.length);

    collectTokens(tokenize, '3#1').forEach((token, i) => t.equal(token.value, result[i].value, `Token should be (${result[i].type}, ${result[i].value})`));
});