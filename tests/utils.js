const collectTokens = (tokenize, str) => {
    const result = [];
    for (let t of tokenize(str)) {
        result.push(t);
    }

    return result;
};

module.exports.collectTokens = collectTokens;