const Number = (value) => ({
    eval: () => parseInt(value, 10)
});

const Range = (lhs, rhs) => ({
    eval: () => {
        const end = rhs.eval();
        const result = [];
        for (let i = lhs.eval(); i <= end; i++) {
            result.push(i);
        }

        return result;
    }
});

const StepRange = (lhs, rhs, max) => ({
    eval: () => {
        const adder = rhs.eval();
        const result = [];

        for (let i = lhs.eval(); i <= max; i += adder)
            result.push(i);

        return result;
    }
});

const Additionals = (...values) => ({
    eval: () => {
        return values.flatMap(v => {
            const result = v.eval();
            if (Array.isArray(result)) return result;

            return [result];
        })
    }
});

const All = (min, max) => ({
    eval: () => {
        const result = [];
        for (let i = min; i <= max; i++)
            result.push(i);

        return result;
    }
});

const None = () => ({ eval: () => null });

module.exports.Additionals = Additionals;
module.exports.All = All;
module.exports.Number = Number;
module.exports.Range = Range;
module.exports.StepRange = StepRange;
module.exports.None = None;
