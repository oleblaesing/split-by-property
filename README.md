Note: Array grouping will become native in ECMAScript soon: https://github.com/tc39/proposal-array-grouping.

# split-by-property

[![npm license](https://img.shields.io/npm/v/split-by-property.svg)]()
[![npm downloads total](https://img.shields.io/npm/dt/split-by-property.svg)]()
[![npm license](https://img.shields.io/npm/l/split-by-property.svg)]()

Split your arrays by a set of given property checks. It runs through your array just once! 🙃

## Getting Started

After installing the package:

```sh
npm install split-by-property
```

You can require it like so:

```js
import splitByProperty from 'split-by-property';
```

And use it this way:

```js
const splitNumbers = splitByProperty((value, i) => ({
  lessThanZero: value < 0,
  equalToZero: value === 0,
  moreThanZero: value > 0,
  evenPosition: (i % 2) === 0,
}));

const splittedNumbers = splitNumbers([4, 0.3, 5, -3.1, 0, 5, 10, -1]);

console.log(splittedNumbers);
// {
//   lessThanZero: [-3.1, -1],
//   equalToZero: [0],
//   moreThanZero: [4, 0.3, 5, 5, 10],
//   evenPosition: [4, 5, 0, 10],
// }
```

## Upgrade from 1.x to 2.x

The package uses now a curried model. Instead of passing the array and the discriminator function directly into the package, you should now pass the discriminator function in to create a function that can receive your array.

Before:

```js
splitByProperty([], () => {});
```

Now:

```js
splitByProperty(() => {})([]);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
