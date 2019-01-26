const R = require("ramda");

const digits = parseInt(process.argv.slice(2)[0]) || 3;
const baseNum = parseInt(R.join("")(new Array(digits).fill(9))); // gotta figure out how to do this
const lowNum = parseInt(R.join("")(new Array(digits - 1).fill(9)));

const isPalindrome = num =>
  R.equals(R.toString(num))(R.pipe(R.toString, R.reverse)(num));

const hasFoundPalindrome = ([a, lowNum, lastA, palindrome]) =>
  R.or(R.not(R.isNil(palindrome)))(R.or(R.lte(a)(lowNum))(R.lte(a)(lastA)));

const hasNotFoundPalindrome = ([a, lowNum, lastA, palindrome]) =>
  R.and(R.equals(palindrome)(null))(R.all(R.gt(a))([lowNum, lastA]));

const checkForPalindromes = (
  b = baseNum,
  maxPalindrome = 0,
  lastA = lowNum
) => {
  let a = baseNum;
  let palindrome = null;

  const result = R.until(hasFoundPalindrome)(([a, lowNum, lastA]) => {
    if (isPalindrome(a * b)) {
      return [a, lowNum, lastA, a * b];
    } else {
      return [a - 1, lowNum, lastA, null];
    }
  })([a, lowNum, lastA, null]);
  // while (hasNotFoundPalindrome([a, lowNum, lastA, palindrome])) {
  //   console.log(
  //     "hasFoundPalindrome",
  //     hasFoundPalindrome([a, lowNum, lastA, palindrome])
  //   );
  //   if (isPalindrome(a * b)) {
  //     palindrome = a * b;
  //   } else {
  //     a--;
  //   }
  // }
  // return [Math.max(palindrome, maxPalindrome), a, b];
  return [Math.max(result[3], maxPalindrome), result[0]];
};

let maxPalindrome = 0;
let biggestA = baseNum;
let biggestB = baseNum;
let b = baseNum;
let lastA = lowNum;

while (b > lowNum && b > lastA) {
  console.log(b, maxPalindrome, lastA);
  const [newMax, newA] = checkForPalindromes(b, maxPalindrome, lastA);

  if (newMax !== maxPalindrome && newMax > maxPalindrome) {
    biggestA = newA;
    biggestB = b;
  } else {
    b--;
  }

  maxPalindrome = newMax;
  lastA = Math.max(lastA, newA);
}
console.log("MAX", maxPalindrome, biggestA, biggestB);
