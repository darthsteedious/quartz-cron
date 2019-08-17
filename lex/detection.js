const constants = require('./contants');

const isDigit = s => /^\d$/.test(s);
const isToken = token => c => token === c;

const isWhitespaceToken = isToken(constants.Whitespace);
const isRangeToken = isToken(constants.Range);
const isSeparatorToken = isToken(constants.Separator);
const isStepToken = isToken(constants.Step);
const isAllToken = isToken(constants.All);
const isNoneToken = isToken(constants.None);

module.exports.isDigit = isDigit;
module.exports.isWhitespaceToken = isWhitespaceToken;
module.exports.isRangeToken = isRangeToken;
module.exports.isSeparatorToken = isSeparatorToken;
module.exports.isStepToken = isStepToken;
module.exports.isAllToken = isAllToken;
module.exports.isNoneToken = isNoneToken;
