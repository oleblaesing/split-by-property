type RevisorFunction = () => boolean;
type Revisor = RevisorFunction | boolean;
type DiscriminatorSource = { [key: string]: Revisor };
type DiscriminatorTarget = { [key: string]: any[] };
type DiscriminatorSourceCreator = (item: any, index?: number) => DiscriminatorSource;
type DiscriminatorTargetCreator = (items: any[]) => DiscriminatorTarget;
type RevisorApplier = (result: DiscriminatorTarget, item: any, i: number) => DiscriminatorTarget;

function createRevisorApplier(createDiscriminatorSource: DiscriminatorSourceCreator): RevisorApplier {
  return function (result: DiscriminatorTarget, item: any, i: number): DiscriminatorTarget {
    const discriminatorSource = createDiscriminatorSource(item, i);
    const discriminatorSourceKeys = Object.keys(discriminatorSource);

    discriminatorSourceKeys.forEach((key) => {
      if (result[key] === undefined) {
        result[key] = [];
      }

      const revisor = discriminatorSource[key];
      const accepted = typeof revisor === 'function' ? revisor() : revisor;

      if (accepted) {
        result[key] = result[key].concat([item]);
      }
    });

    return result;
  }
}

export default function (createDiscriminatorSource: DiscriminatorSourceCreator): DiscriminatorTargetCreator {
  return function (items: any[]): DiscriminatorTarget {
    const applyRevisor = createRevisorApplier(createDiscriminatorSource);

    return items.reduce(applyRevisor, {});
  }
}
