import { ItemData } from '@interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { items as actions } from '@store/actions';

export const featureKey = 'items';

export interface State extends EntityState<ItemData> {
  control: {
    isLoading: boolean;
  };
}

export const adapter: EntityAdapter<ItemData> = createEntityAdapter<ItemData>({
  selectId: (item: ItemData) => {
    return item.id!;
  }
});

export const initialState: State = adapter.getInitialState({
  control: {
    isLoading: false
  }
});

export const reducer = createReducer(
  initialState,
  on(actions.upsert, (state, action) => {
    return adapter.upsertOne(action.data, {
      ...state
    });
  }),
  on(actions.upsertAll, (state, action) => {
    return adapter.upsertMany(action.data, {
      ...state
    });
  }),
  on(actions.removeAll, (state, action) => {
    return adapter.removeMany(action.data, {
      ...state
    });
  }),
  on(actions.remove, (state, action) => {
    return adapter.removeOne(action.itemId, {
      ...state
    });
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
