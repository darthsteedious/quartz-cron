const {
    isDigit,
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

function* tokenize(str) {
    const iter = getStringIter(str);
    let cur = iter.next();
    while (!cur.done) {
        if (isDigit(cur.value)) {
            let digitValue = cur.value;
            // Pull from iterator while there are still digits
            while (isDigit(cur.value)) {
                cur = iter.next();
                if (cur.done) {
                    yield tokens.NumberToken(digitValue, 10);
                    return;
                }

                if (isDigit(cur.value)) {
                    digitValue += cur.value;
                } else {
                    yield tokens.NumberToken(digitValue);
                    break;
                }
            }
        }

        if (isRangeToken(cur.value)) {
            yield tokens.RangeToken();
        } else if (isSeparatorToken(cur.value)) {
            yield tokens.SeparatorToken();
        } else if (isStepToken(cur.value)) {
            yield tokens.StepToken();
        } else if (isAllToken(cur.value)) {
            yield tokens.AllToken();
        } else if (isNoneToken(cur.value)) {
            yield tokens.NoneToken();
        } else if (isWhitespaceToken(cur.value)) {
            yield tokens.WhiteSpaceToken();
        } else {
            yield tokens.UnknownToken(cur.value);
        }

        cur = iter.next();
    }
}

module.exports = tokenize;
