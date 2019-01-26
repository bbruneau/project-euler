const R = require("ramda");

const digits = parseInt(process.argv.slice(2)[0]) || 3;
const upperBound = parseInt(R.join("")(new Array(digits).fill(9))); // gotta figure out how to do this
const lowerBound = parseInt(R.join("")(new Array(digits - 1).fill(9)));

const isPalindrome = num =>
  R.equals(R.toString(num))(R.pipe(R.toString, R.reverse)(num));

const hasFoundPalindrome = ([a, palindrome, lowNum, lastA]) =>
  R.or(R.not(R.isNil(palindrome)))(R.or(R.lte(a)(lowNum))(R.lte(a)(lastA)));

const checkForPalindromes = (
  lastA,
  factorB,
  maxPalindrome,
  lowerBound,
  upperBound
) =>
  R.slice(0)(2)(
    R.until(hasFoundPalindrome)(([factorA]) =>
      R.ifElse(isPalindrome)(() => [
        factorA,
        R.max(R.multiply(factorA)(factorB))(maxPalindrome),
        lastA,
        lowerBound
      ])(() => [factorA - 1, null, lastA, lowerBound])(factorA * factorB)
    )([upperBound, null, lastA, lowerBound])
  );

const biggestPalindromeHasNotBeenFound = (lowNum, lastA, factorB) =>
  R.both(R.lte(lowNum))(R.lte(lastA))(factorB);

const foundBiggestPalindrome = ([lastA, factorB, lowNum]) =>
  R.either(R.gte(lowNum))(R.gte(lastA))(factorB);

const getBiggestPalindrome = (lowerBound, upperBound) =>
  R.slice(3)(6)(
    R.until(foundBiggestPalindrome)(
      ([lastA, factorB, lowNum, maxPalindrome, biggestA, biggestB]) => {
        const [newA, newMax] = checkForPalindromes(
          lastA,
          factorB,
          maxPalindrome,
          lowerBound,
          upperBound
        );

        if (newMax !== maxPalindrome && newMax > maxPalindrome) {
          return [R.max(newA)(lastA), factorB, lowNum, newMax, newA, factorB];
        } else {
          return [
            R.max(newA)(lastA),
            factorB - 1,
            lowNum,
            maxPalindrome,
            biggestA,
            biggestB
          ];
        }
      }
    )([lowerBound, upperBound, lowerBound, null, null, null])
  );

console.log(
  R.pipe(R.join(","), R.replace(/,/, " = "), R.replace(/,/, " * "))(
    getBiggestPalindrome(lowerBound, upperBound)
  )
);
