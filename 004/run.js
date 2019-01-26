const R = require("ramda");

const digits = parseInt(process.argv.slice(2)[0]) || 3;
const baseNum = parseInt(R.join("")(new Array(digits).fill(9))); // gotta figure out how to do this
const lowNum = parseInt(R.join("")(new Array(digits - 1).fill(9)));

const isPalindrome = num =>
  R.equals(R.toString(num))(R.pipe(R.toString, R.reverse)(num));

const hasFoundPalindrome = ([a, palindrome, lowNum, lastA]) =>
  R.or(R.not(R.isNil(palindrome)))(R.or(R.lte(a)(lowNum))(R.lte(a)(lastA)));

const checkForPalindromes = (
  lastA = lowNum,
  factorB = baseNum,
  maxPalindrome = 0 // => [factorA of resultant palindrome, palindrome | null]
) =>
  R.slice(0)(2)(
    R.until(hasFoundPalindrome)(([factorA, _, lowNum, lastA]) =>
      R.ifElse(isPalindrome)(() => [
        factorA,
        R.max(R.multiply(factorA)(factorB))(maxPalindrome),
        lowNum,
        lastA
      ])(() => [factorA - 1, null, lowNum, lastA])(factorA * factorB)
    )([baseNum, null, lowNum, lastA])
    // [factorA, palindrome | null, factor's lower bound, last factor A result]
  );

let maxPalindrome = 0;
let biggestA = baseNum;
let biggestB = baseNum;
let factorB = baseNum;
let lastA = lowNum;

while (R.both(R.lte(lowNum))(R.lte(lastA))(factorB)) {
  const [newA, newMax] = checkForPalindromes(lastA, factorB, maxPalindrome);

  if (newMax !== maxPalindrome && newMax > maxPalindrome) {
    maxPalindrome = newMax;
    biggestA = newA;
    biggestB = factorB;
  } else {
    factorB--;
  }

  lastA = Math.max(lastA, newA);
}

console.log("MAX", maxPalindrome, biggestA, biggestB);
