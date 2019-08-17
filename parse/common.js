const errors = require('./errors');
const types = require('../lex/types');
const { Additionals, StepRange, Range, Number } = require('./expressions');

const parseStepRange = (n, iter, pos, max) => {
    let current = iter.next();
    let token = current.value;
    pos++;

    if (token.type !== types.Number)
        throw errors.UnexpectedTokenError(pos, token.value, ['0-9']);

    const stepLen = token.value.length;
    const step = Number(token.value);
    if (step > max)
        throw new Error(`Step value cannot exceed the maximum of ${max}`);

    current = iter.next();
    token = current.value;
    pos += stepLen;

    if (!token)
        throw errors.UnexpectedEndOfInput(pos);

    if (token.type !== types.WhiteSpace)
        throw errors.UnexpectedTokenError(pos, token.value, exports[' ']);

    return {
        offset: pos,
        expression: StepRange(n, step, max)
    }
};


module.exports.parseStepRange = parseStepRange;