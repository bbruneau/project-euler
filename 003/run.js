const R = require("ramda");

const max = parseInt(process.argv.slice(2)[0]) || 600851475143;

// const appendNextPrime = (primes = [2]) => {
//   const primesCount = primes.length;
//   let cv = primes[primesCount - 1] + 1;

//   while (primes.length === primesCount) {
//     if (!primes.some(prime => cv % prime === 0)) {
//       primes.push(cv);
//     }

//     cv++;
//   }
//   return primes;
// };

const appendNextPrime = (prevPrimes = [2]) =>
  R.until(([primes]) => R.gt(primes.length)(prevPrimes.length))(
    ([primes, possiblePrime]) =>
      !primes.some(prime => possiblePrime % prime === 0)
        ? [[...primes, possiblePrime], null]
        : [primes, possiblePrime + 1]
  )([prevPrimes, R.takeLast(1)(prevPrimes)[0] + 1])[0];

// initialValues: [
//   testedPrimes: Array<number>,
//   highestPrimeFactor?: number,
//   lastProduct: number
// ]
const initialValues = [[2], null, max];

const checkForPrimeFactor = ([primes, highestPrimeFactor, lastProduct]) => {
  const prime = R.takeLast(1)(primes)[0];

  if (lastProduct % prime === 0) {
    lastProduct = lastProduct / prime;
    highestPrimeFactor = prime;
  }

  primes = appendNextPrime(primes);
  console.log(primes);

  return [primes, highestPrimeFactor, lastProduct];
};

console.log(
  R.takeLast(2)(
    R.until(([primes, _, lastProduct]) =>
      R.gt(R.takeLast(1)(primes))(lastProduct)
    )(checkForPrimeFactor)(initialValues)
  )[0]
);
