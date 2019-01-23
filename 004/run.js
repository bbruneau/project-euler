const R = require("ramda");

const digits = parseInt(process.argv.slice(2)[0]) || 3;
const baseNum = parseInt(new Array(digits).fill(9).join(""));
const lowNum = parseInt(new Array(digits - 1).fill(9).join(""));

const isPalindrome = num => {
  const numStr = num.toString();
  const frontHalf = numStr.slice(0, numStr.length / 2);
  const backHalf = numStr
    .slice((numStr.length + num % 2) / 2)
    .split("")
    .reverse()
    .join("");
  return frontHalf === backHalf;
};

const checkForPalindromes = (
  b = baseNum,
  maxPalindrome = 0,
  lastA = lowNum
) => {
  let a = baseNum;
  let palindrome = null;

  while (palindrome === null && a > lowNum && a > lastA) {
    if (isPalindrome(a * b)) {
      palindrome = a * b;
    } else {
      a--;
    }
  }
  if (palindrome) console.log(palindrome, a, b);
  return [Math.max(palindrome, maxPalindrome), a];
};

let maxPalindrome = 0;
let biggestA = baseNum;
let biggestB = baseNum;
let b = baseNum;
let lastA = lowNum;

while (b > lowNum) {
  const [newMax, a] = checkForPalindromes(b, maxPalindrome, lastA);

  if (newMax !== maxPalindrome) {
    biggestB = b;
    biggestA = a;
    console.log(a, biggestB);
  } else {
    b--;
  }

  maxPalindrome = newMax;

  lastA = Math.max(lastA, a);
}
console.log("MAX", maxPalindrome, lastA, biggestB);
