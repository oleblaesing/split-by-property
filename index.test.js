const splitByProperty = require('./index.js').default;

describe('splitByProperty with boolean revisors', () => {
  it('works with numbers', () => {
    const result = splitByProperty(value => ({
      less: value < 0,
      equal: value === 0,
      more: value > 0,
    }))([4, 0.3, 5, -3.1, 0, 5, 10, -1]);

    expect(result).toEqual({
      less: [-3.1, -1],
      equal: [0],
      more: [4, 0.3, 5, 5, 10],
    });
  });

  it('works with strings', () => {
    const result = splitByProperty(value => ({
      empty: value === '',
      character: value.length === 1,
      regular: true,
    }))(['', 'hello', 'world', '!', '']);

    expect(result).toEqual({
      empty: ['', ''],
      character: ['!'],
      regular: ['', 'hello', 'world', '!', ''],
    });
  });

  it('works with arrays', () => {
    const result = splitByProperty((value, i) => {
      const empty = value.length === 0;

      return {
        empty,
        numbers: !empty && (value.filter(x => typeof x === 'number').length === value.length),
        even: (i % 2) === 0,
      };
    })([[9, 10], ['', 'test'], []]);

    expect(result).toEqual({
      empty: [[]],
      numbers: [[9, 10]],
      even: [[9, 10], []],
    });
  });

  it('works with objects', () => {
    const result = splitByProperty(value => ({
      hasHello: Object.keys(value).findIndex(key => key === 'hello') >= 0,
      isNumber: Object.keys(value).findIndex(key => typeof value[key] === 'number') >= 0,
    }))([{ hello: 'world' }, { test: 'asdf' }]);

    expect(result).toEqual({
      hasHello: [{ hello: 'world' }],
      isNumber: [],
    });
  });
});

describe('splitByProperty with function revisors', () => {
  it('works with numbers', () => {
    const result = splitByProperty(value => ({
      less: () => value < 0,
      equal: () => value === 0,
      more: () => value > 0,
    }))([4, 0.3, 5, -3.1, 0, 5, 10, -1]);

    expect(result).toEqual({
      less: [-3.1, -1],
      equal: [0],
      more: [4, 0.3, 5, 5, 10],
    });
  });

  it('works with strings', () => {
    const result = splitByProperty(value => ({
      empty: () => value === '',
      character: () => value.length === 1,
      regular: () => true,
    }))(['', 'hello', 'world', '!', '']);

    expect(result).toEqual({
      empty: ['', ''],
      character: ['!'],
      regular: ['', 'hello', 'world', '!', ''],
    });
  });

  it('works with arrays', () => {
    const result = splitByProperty((value, i) => {
      const empty = () => value.length === 0;

      return {
        empty,
        numbers: () => !empty() && (value.filter(x => typeof x === 'number').length === value.length),
        even: () => (i % 2) === 0,
      };
    })([[9, 10], ['', 'test'], []]);

    expect(result).toEqual({
      empty: [[]],
      numbers: [[9, 10]],
      even: [[9, 10], []],
    });
  });

  it('works with objects', () => {
    const result = splitByProperty(value => ({
      hasHello: () => Object.keys(value).findIndex(key => key === 'hello') >= 0,
      isNumber: () => Object.keys(value).findIndex(key => typeof value[key] === 'number') >= 0,
    }))([{ hello: 'world' }, { test: 'asdf' }]);

    expect(result).toEqual({
      hasHello: [{ hello: 'world' }],
      isNumber: [],
    });
  });
});
