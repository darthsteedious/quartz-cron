const tokenize = require('./lex');

const collectTokens = tokenize => {
    const result = [];
    for (let t of tokenize) {
        result.push(t);
    }

    return result;
};

console.dir(collectTokens(tokenize('0 0 0 ? * *')));