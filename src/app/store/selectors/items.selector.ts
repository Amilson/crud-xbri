import { ItemData, SummaryData } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { items } from '@store/reducers';

declare type State = items.State;

export const selectState = createFeatureSelector<items.State>(items.featureKey);

export const selectAll = createSelector(selectState, items.selectAll);

export const selectAllBySearch = (props: {
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: boolean;
}) => {
  return createSelector(selectAll, (entities: ItemData[]): ItemData[] => {
    const filterByName = (value: string) => {
      if (!!props.name) {
        return `${value}`.toUpperCase().includes(props.name.toUpperCase());
      }
      return true;
    };
    const filterByCategory = (value: string) => {
      if (!!props.category) {
        return `${value}`.toUpperCase() == props.category.toUpperCase();
      }
      return true;
    };
    const filterByQuantity = (value: number) => {
      if (!!props.quantity) {
        return value >= props.quantity;
      }
      return true;
    };
    const filterByPrice = (value: number) => {
      if (!!props.price) {
        return value >= props.price;
      }
      return true;
    };
    const filterByStatus = (value: boolean) => {
      return value === props.status;
    };

    const results = entities.filter((_: ItemData) => {
      return (
        filterByName(_.name!) &&
        filterByCategory(_.category!) &&
        filterByQuantity(_.quantity!) &&
        filterByPrice(_.price!) &&
        filterByStatus(_.status!)
      );
    });

    return results;
  });
};

export const selectOne = (props: { id: string }) => {
  return createSelector(selectAll, (entities: ItemData[]): ItemData => {
    const result = entities.find((_: ItemData) => {
      return _.id === props.id;
    });

    return result!;
  });
};

export const selectSummary = () => {
  return createSelector(selectAll, (entities: ItemData[]): SummaryData | null => {
    const qtd = entities?.length;
    const actives = entities.filter(({ status }) => {
      return status === true;
    });
    const inactives = entities.filter(({ status }) => {
      return !status;
    });

    const qtdActives = actives?.length || 0;
    const averageActives = (qtdActives / qtd) * 100;
    const sumQtdActives = actives?.reduce((sum, item) => {
      return sum + Number(item.quantity) || 0;
    }, 0);
    const qtdInactives = inactives?.length || 0;
    const averageInactives = (qtdInactives / qtd) * 100 || 0;
    const sumQtdInactives = inactives.reduce((sum, item) => {
      return sum + Number(item.quantity) || 0;
    }, 0);

    return {
      qtd,
      qtdActives,
      qtdInactives,
      sumQtdActives,
      averageActives,
      averageInactives,
      sumQtdInactives
    };
  });
};
