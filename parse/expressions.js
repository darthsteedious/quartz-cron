const Number = (value) => ({
    eval: () => parseInt(value, 10)
});

const Range = (start, stop) => ({
    eval: () => {
        const end = stop.eval();
        const result = [];
        for (let i = start.eval(); i < end; i++) {
            result.push(i);
        }

        return result;
    }
});

const StepRange = (start, step, max) => ({
    eval: () => {
        const adder = step.eval();
        const result = [];

        for (let i = start.eval(); i <= max; i += adder)
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
