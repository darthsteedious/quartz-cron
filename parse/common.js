const errors = require('./errors');
const types = require('../lex/types');
const { Additionals, StepRange, Range, Number } = require('./expressions');

const getNextToken = iter => iter.next().value;

const createRangeParser = (selector, text) => (lhs, iter, pos, max) => {
    let token = getNextToken(iter);

    if (token.type !== types.Number)
        throw errors.UnexpectedTokenError(pos, token.value, [`0-${max}`]);

    const rhsLen = token.value.length;
    const rhs = Number(token.value);
    if (rhs.eval() > max)
        throw new Error(`${text} cannot exceed the maximum of ${max}`);

    pos += rhsLen;

    return {
        offset: pos,
        expression: selector({ lhs, rhs, max })
    }
};

const parseRange = createRangeParser(({ lhs, rhs }) => Range(lhs, rhs), 'Range end value');
const parseStepRange = createRangeParser(({ lhs, rhs, max }) => StepRange(lhs, rhs, max), 'Step value');

module.exports.parseRange = parseRange;
module.exports.parseStepRange = parseStepRange;