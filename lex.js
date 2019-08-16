`const { isDigit } = require('./util');

const WhiteSpace = 'whitespace';
const Digit = 'digit';
const Range = 'range';
const Separator = 'separator';
const Step = 'step';
const All = 'all';
const None = 'none';
const Unknown = 'unknown';


const lpartial = (fn, ...args) => (...rest) => fn(...args, ...rest);
const rpartial = (fn, ...args) => (...rest) => fn(...rest, ...args);

const createTokenBuilder = type => value => ({ value, type });

const WhiteSpaceToken = lpartial(createTokenBuilder(WhiteSpace),  ' ');
const DigitToken = createTokenBuilder(Digit);
const RangeToken = lpartial(createTokenBuilder(Range), '-');
const SeparatorToken = lpartial(createTokenBuilder(Separator), ',');
const StepToken = lpartial(createTokenBuilder(Step), '/');
const AllToken = lpartial(createTokenBuilder(All), '*');
const NoneToken = lpartial(createTokenBuilder(None), '?');
const UnknownToken = createTokenBuilder(Unknown);

const isToken = token => c => {
    return token === c;
};

const isWhitespaceToken = isToken(' ');
const isRangeToken = isToken('-');
const isSeparatorToken = isToken(',');
const isStepToken = isToken('/');
const isAllToken = isToken('*');
const isNoneToken = isToken('?');

function* getStringIter(str) {
    for (let c of str) {
        yield c;
    }
}




function tokenize(str) {
    const iter = getStringIter(str);
    let cur = iter.next();
    // console.dir(cur);
    const tokens = [];
    while (!cur.done) {
        if (isDigit(cur.value)) {
            let digitValue = cur.value;
            // Pull from iterator while there are still digits
            while (isDigit(cur.value)) {
                cur = iter.next();
                if (cur.done) return tokens;

                if (isDigit(cur.value)) {
                    digitValue += cur.value;
                } else {
                    tokens.push(DigitToken(digitValue));
                    break;
                }
            }
        }


        if (isRangeToken(cur.value)) {
            tokens.push(RangeToken());
        } else if (isSeparatorToken(cur.value)) {
            tokens.push(SeparatorToken)
        } else if (isStepToken(cur.value)) {
            tokens.push(StepToken())
        } else if (isAllToken(cur.value)) {
            tokens.push(AllToken());
        } else if (isNoneToken(cur.value)) {
            tokens.push(NoneToken());
        } else if (isWhitespaceToken(cur.value)) {
            tokens.push(WhiteSpaceToken());
        } else {
            tokens.push(UnknownToken(cur.value));
        }

        cur = iter.next();
    }

    return tokens;
}

module.exports = tokenize;`