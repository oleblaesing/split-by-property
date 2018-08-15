interface ApproveFunctions {
  [key: string]: () => boolean;
}

interface Splitted {
  [key: string]: any[];
}

export default function (items: any[], callback: (item: any, index?: number) => ApproveFunctions): Splitted {
  const approveFunctions = Object.keys(callback(null, null));

  const result = approveFunctions.reduce((acc, key) => ({ ...acc, [key]: [] }), {});

  return items.reduce((acc: Splitted, item, i) => {
    approveFunctions.forEach((key) => {
      const appliedApproveFunctions = callback(item, i);
      const approveFunction = appliedApproveFunctions[key];

      if (approveFunction()) {
        acc[key] = acc[key].concat([item]);
      }
    });

    return acc;
  }, result);
}
