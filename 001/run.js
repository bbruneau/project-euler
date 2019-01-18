const R = require("ramda");

const max = process.argv.slice(2)[0] || 1000;

const checkIntAndSum = val => currentSum =>
  val % 3 === 0 || val % 5 === 0 ? currentSum + val : currentSum;

const getNextValArr = ([currentNum, sum]) => [
  currentNum + 1,
  checkIntAndSum(currentNum)(sum)
];

console.log(
  R.takeLast(1)(
    R.until(([count]) => R.gte(count)(max))(getNextValArr)([0, 0])
  )[0]
);
