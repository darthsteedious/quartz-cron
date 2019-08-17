const UnexpectedTokenError = (pos, supplied, expected) => {
    const expectedList = expected.map(e => JSON.stringify(e)).join(',');
    return new Error(`Unexpected token '${JSON.stringify(supplied)}' at pos ${pos}. Expected one of [${expectedList}]`);
};

const UnexpectedEndOfInput = (pos) => new Error(`Unexpected end of input after position ${pos}`);

module.exports.UnexpectedEndOfInput = UnexpectedEndOfInput;
module.exports.UnexpectedTokenError = UnexpectedTokenError;