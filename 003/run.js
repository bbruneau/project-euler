const R = require("ramda");

const max = parseInt(process.argv.slice(2)[0]) || 600851475143;

// initialValues: [
//   testedPrimes: Array<number>,
//   lastProduct: number,
//   highestPrimeFactor?: number
// ]
const initialValues = [[2], max, null];

const sieveForPrime = (prevPrimes = [2]) =>
  R.head(
    R.until(([primes]) => R.gt(primes.length)(prevPrimes.length))(
      ([primes, possiblePrime]) =>
        R.ifElse(R.none(prime => R.equals(R.modulo(possiblePrime)(prime))(0)))(
          () => [R.flatten([primes, possiblePrime]), null]
        )(() => [primes, R.add(possiblePrime)(1)])(primes)
    )([prevPrimes, R.add(R.last(prevPrimes))(1)])
  );

const checkForPrimeFactor = ([primes, lastProduct, highestPrimeFactor]) => {
  return R.ifElse((primes, lastProduct, highestPrimeFactor) =>
    R.equals(R.modulo(lastProduct)(R.last(primes)))(0)
  )(() => [
    sieveForPrime(primes),
    lastProduct / R.last(primes),
    R.last(primes)
  ])(() => [sieveForPrime(primes), lastProduct, highestPrimeFactor])(
    primes,
    lastProduct,
    highestPrimeFactor
  );
};

console.log(
  R.last(
    R.until(([primes, lastProduct]) => R.gt(R.last(primes))(lastProduct))(
      checkForPrimeFactor
    )(initialValues)
  )
);
