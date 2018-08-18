# split-by-property

Split your arrays by a set of given property checks

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
const arrayToSplit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const splittedArray = splitByProperty(arrayToSplit, (value, i) => ({
  even: value % 2 === 0
  odd: value % 2 === 1,
}));

console.log(splittedArray);
// {
//   even: [2, 4, 6, 8, 10],
//   odd: [1, 3, 5, 7, 9],
// }
```

You can also return an object containing functions as opposed to booleans:

```js
const arrayToSplit = [4, 0.3, 5, -3.1, 0, 5, 10, -1];

const splittedArray = splitByProperty(arrayToSplit, (value, i) => ({
  less: () => value < 0,
  equal: () => value === 0,
  more: () => value > 0,
  evenPosition: () => (i % 2) === 0,
}));

console.log(splittedArray);
// {
//   less: [-3.1, -1],
//   equal: [0],
//   more: [4, 0.3, 5, 5, 10],
//   evenPosition: [4, 5, 0, 10],
// }
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
