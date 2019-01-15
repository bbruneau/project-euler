const R = require("ramda");

const max = process.argv.slice(2)[0] || 1000;

console.log(
  (max =>
    R.mapAccum(
      (acc, val) => (val % 3 === 0 || val % 5 === 0 ? [acc + val] : [acc])
    )(0)(R.times(R.identity)(max))[0])(max)
);
