interface ApprovalFunction {
  (): boolean;
}

interface ApproveFunctions {
  [key: string]: ApprovalFunction | boolean;
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
      const approved = typeof approveFunction === 'function' ? approveFunction() : approveFunction;

      if (approved) {
        acc[key] = acc[key].concat([item]);
      }
    });

    return acc;
  }, result);
}
