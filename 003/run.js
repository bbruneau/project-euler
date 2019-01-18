const R = require("ramda");

const max = parseInt(process.argv.slice(2)[0]) || 600851475143;

// const sieveForPrime = (primes = [2]) => {
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

const sieveForPrime = (prevPrimes = [2]) =>
  R.head(
    R.until(([primes]) => R.gt(primes.length)(prevPrimes.length))(
      ([primes, possiblePrime]) =>
        !primes.some(prime => possiblePrime % prime === 0)
          ? [[...primes, possiblePrime], null]
          : [primes, possiblePrime + 1]
    )([prevPrimes, R.last(prevPrimes) + 1])
  );

// initialValues: [
//   testedPrimes: Array<number>,
//   lastProduct: number,
//   highestPrimeFactor?: number
// ]
const initialValues = [[2], max, null];

const checkForPrimeFactor = ([primes, lastProduct, highestPrimeFactor]) => {
  const prime = R.last(primes);

  if (lastProduct % prime === 0) {
    lastProduct = lastProduct / prime;
    highestPrimeFactor = prime;
  }

  primes = sieveForPrime(primes);
  console.log(primes);

  return [primes, lastProduct, highestPrimeFactor];
};

console.log(
  R.last(
    R.until(([primes, lastProduct]) => R.gt(R.last(primes))(lastProduct))(
      checkForPrimeFactor
    )(initialValues)
  )
);
