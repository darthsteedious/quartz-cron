const types = require('../lex/types');
const expressions = require('./expressions');
const errors = require('./errors');
const { parseRange, parseStepRange } = require('./common');

const MIN_SECONDS = 0;
const MAX_SECONDS = 59;

const SecondsExpression = value => ({ eval: () => value.eval() });

const parseSeconds = (iter, cur) => {
    let pos = 0;
    let current = cur;
    let token = current.value;

    if (token.type === types.All) {
        pos++;
        current = iter.next();
        token = current.value;

        if (!token)
            throw errors.UnexpectedEndOfInput(pos);

        if (token.type !== types.WhiteSpace)
            throw errors.UnexpectedTokenError(pos, token ? token.value : token, [' ']);

        return {
            offset: pos + 1,
            expression: SecondsExpression(expressions.All(MIN_SECONDS, MAX_SECONDS))
        };
    }

    if (token.type !== types.Number)
        throw errors.UnexpectedTokenError(pos, token.value, [`0-${MAX_SECONDS}`, '*']);

    const number = expressions.Number(token.value);
    pos += token.value;

    current = iter.next();
    token = current.value;
    if (current.done) throw errors.UnexpectedEndOfInput(pos);

    pos++;
    let expression = null;
    if (token.type === types.Step || token.type === types.Range) {
        const parseFunc = token.type === types.Step ? parseStepRange : parseRange;
        const { offset, expression: resultExpr } = parseFunc(number, iter, pos, MAX_SECONDS);
        pos = offset;
        expression = SecondsExpression(resultExpr);
    }

    current = iter.next();
    token = current.value;

    if (!token)
        throw errors.UnexpectedEndOfInput(pos);

    if (token.type !== types.WhiteSpace)
        throw errors.UnexpectedTokenError(pos++, token.value, [' ']);

    return {
        offset: pos + 1,
        expression
    };
};

module.exports = parseSeconds;
module.exports.MAX_SECONDS = MAX_SECONDS;
module.exports.MIN_SECONDS = MIN_SECONDS;
