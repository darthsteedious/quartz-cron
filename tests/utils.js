const collectTokens = (tokenize, str) => {
    const result = [];
    for (let t of tokenize(str)) {
        result.push(t);
    }

    return result;
};

const arrayToGen = function* (tokens) {
    for (let token of tokens) {
        yield token;
    }
};

const rangeExc = (start, stop, step=1) => {
    let i = start;
    const result = [];
    while (i < stop) {
        result.push(i);
        i += step;
    }

    return result;
};

const rangeInc = (start, stop, step=1) => rangeExc(start, stop + 1, step);

module.exports.arrayToGen = arrayToGen;
module.exports.collectTokens = collectTokens;
module.exports.rangeExc = rangeExc;
module.exports.rangeInc = rangeInc;