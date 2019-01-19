const R = require("ramda");

const max = parseInt(process.argv.slice(2)[0]) || 600851475143;

// initialValues: [
//   testedPrimes: Array<number>,
//   lastProduct: number,
//   highestPrimeFactor?: number
// ]
const initialValues = [[2], max, null];

const numberHasNoPrimeFactors = ([primes, possiblePrime]) =>
  R.none(prime => R.equals(R.modulo(possiblePrime)(prime))(0));
const addPrimeToPrimesList = ([primes, possiblePrime]) => [
  R.flatten([primes, possiblePrime]),
  null
];
const incrementPossiblePrime = ([primes, possiblePrime]) => [
  primes,
  R.add(possiblePrime)(1)
];

const sieveForPrime = (prevPrimes = [2]) =>
  R.head(
    R.until(([primes]) => R.gt(primes.length)(prevPrimes.length))(
      R.ifElse(numberHasNoPrimeFactors)(addPrimeToPrimesList)(
        incrementPossiblePrime
      )
    )([prevPrimes, R.add(R.last(prevPrimes))(1)])
  );

const isPrimeFactor = (primes, lastProduct, highestPrimeFactor) =>
  R.equals(R.modulo(lastProduct)(R.last(primes)))(0);

const setNewPrimeFactor = (primes, lastProduct) => [
  sieveForPrime(primes),
  R.divide(lastProduct)(R.last(primes)),
  R.last(primes)
];

const incrementPotentialPrimeFactor = (
  primes,
  lastProduct,
  highestPrimeFactor
) => [sieveForPrime(primes), lastProduct, highestPrimeFactor];

const getNextPrimeFactor = ([primes, lastProduct, highestPrimeFactor]) =>
  R.ifElse(isPrimeFactor)(setNewPrimeFactor)(incrementPotentialPrimeFactor)(
    primes,
    lastProduct,
    highestPrimeFactor
  );

const lastPrimeIsGTELastProduct = ([primes, lastProduct]) =>
  R.gt(R.last(primes))(lastProduct);

console.log(
  R.last(R.until(lastPrimeIsGTELastProduct)(getNextPrimeFactor)(initialValues))
);
