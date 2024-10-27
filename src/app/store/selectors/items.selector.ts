import { ItemData } from '@interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { items } from '@store/reducers';

declare type State = items.State;

export const selectState = createFeatureSelector<items.State>(items.featureKey);

export const selectAll = createSelector(selectState, items.selectAll);

export const selectOne = (props: { id: string }) => {
  return createSelector(selectAll, (entities: ItemData[]): ItemData => {
    const result = entities.find((_: ItemData) => {
      return _.id === props.id;
    });

    return result!;
  });
};
