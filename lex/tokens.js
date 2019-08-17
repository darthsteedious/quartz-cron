const types = require('./types');
const constants = require('./contants');
const { lpartial } = require('../util');

const createTokenBuilder = type => value => ({ value, type });

const WhiteSpaceToken = lpartial(createTokenBuilder(types.WhiteSpace),  constants.Whitespace);
const NumberToken = createTokenBuilder(types.Number);
const RangeToken = lpartial(createTokenBuilder(types.Range), constants.Range);
const SeparatorToken = lpartial(createTokenBuilder(types.Separator), constants.Separator);
const StepToken = lpartial(createTokenBuilder(types.Step), constants.Step);
const AllToken = lpartial(createTokenBuilder(types.All), constants.All);
const NoneToken = lpartial(createTokenBuilder(types.None), constants.None);
const UnknownToken = createTokenBuilder(types.Unknown);


module.exports = {
    WhiteSpaceToken,
    NumberToken,
    RangeToken,
    SeparatorToken,
    StepToken,
    AllToken,
    NoneToken,
    UnknownToken
};
