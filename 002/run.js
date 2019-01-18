const R = require("ramda");

const max = process.argv.slice(2)[0] || 4000000;

const compareAndSum = number => currentSum =>
  number % 2 === 0 ? number + currentSum : currentSum;

const getNextValArr = ([firstNum, secondNum, sumOfEvenNums]) => [
  secondNum,
  R.add(firstNum)(secondNum),
  compareAndSum(firstNum + secondNum)(sumOfEvenNums)
];

console.log(
  R.takeLast(1)(
    R.until(([_, secondNum]) => R.gte(secondNum)(max))(getNextValArr)([1, 1, 0])
  )[0]
);
