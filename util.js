const isDigit = s => /^\d/.test(s);
const lpartial = (fn, ...args) => (...rest) => fn(...args, ...rest);
const rpartial = (fn, ...args) => (...rest) => fn(...rest, ...args);

module.exports.isDigit = isDigit;
module.exports.lpartial = lpartial;
module.exports.rpartial = rpartial;