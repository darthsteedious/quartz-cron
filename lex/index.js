const { isDigit } = require('../util');
const {
    isWhitespaceToken,
    isStepToken,
    isSeparatorToken,
    isRangeToken,
    isAllToken,
    isNoneToken
} = require('./detection');
const tokens = require('./tokens');

function* getStringIter(str) {
    for (let c of str) yield c;
}

function tokenize(str) {
    const iter = getStringIter(str);
    let cur = iter.next();
    const result = [];
    while (!cur.done) {
        if (isDigit(cur.value)) {
            let digitValue = cur.value;
            // Pull from iterator while there are still digits
            while (isDigit(cur.value)) {
                cur = iter.next();
                if (cur.done) return result;

                if (isDigit(cur.value)) {
                    digitValue += cur.value;
                } else {
                    result.push(tokens.DigitToken(digitValue));
                    break;
                }
            }
        }


        if (isRangeToken(cur.value)) {
            result.push(tokens.RangeToken());
        } else if (isSeparatorToken(cur.value)) {
            result.push(tokens.SeparatorToken)
        } else if (isStepToken(cur.value)) {
            result.push(tokens.StepToken())
        } else if (isAllToken(cur.value)) {
            result.push(tokens.AllToken());
        } else if (isNoneToken(cur.value)) {
            result.push(tokens.NoneToken());
        } else if (isWhitespaceToken(cur.value)) {
            result.push(tokens.WhiteSpaceToken());
        } else {
            result.push(tokens.UnknownToken(cur.value));
        }

        cur = iter.next();
    }

    return result;
}

module.exports = tokenize;
