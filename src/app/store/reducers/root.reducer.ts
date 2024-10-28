import { ItemData } from '@interfaces';
import { ActionReducer, INIT } from '@ngrx/store';
import { items as actions } from '@store/actions';

export const seederReducer = () => {
  return (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      const handledState = reducer(state, action);
      if (action.type === INIT) {
        try {
          const data: ItemData[] = JSON.parse(
            atob(localStorage.getItem('xbri-saved-items') || '{}')
          );
          const hIds = data?.map(({ id }) => {
            return id;
          });
          const ids = [...new Set(hIds)];

          let entities: ItemData | null = null;

          Object.entries(
            data?.map((_: ItemData) => {
              entities = {
                ...entities!,
                [_.id as string]: _
              };
            })
          );

          return {
            items: {
              ids,
              entities,
              control: {
                isLoading: false
              }
            }
          };
        } catch (e) {
          //not to do
        }
      } else if (action.type === actions.upsert.type) {
        const handled = {
          ...(action as any)?.data
        };

        let data = [{ ...handled }];

        try {
          data = JSON.parse(atob(localStorage.getItem('xbri-saved-items') || '{}'));
        } catch (e) {
          //not to do
        }

        data.push(handled);

        localStorage.setItem('xbri-saved-items', btoa(JSON.stringify(data)));
      } else if (action.type === actions.upsertAll.type) {
        let data = [];

        try {
          data = JSON.parse(atob(localStorage.getItem('xbri-saved-items') || '{}'));
        } catch (e) {
          //not to do
        }

        data.push((action as any)?.data);

        localStorage.setItem('xbri-saved-items', btoa(JSON.stringify(data[0])));
      } else if (action.type === actions.remove.type) {
        try {
          const data: ItemData[] = JSON.parse(
            atob(localStorage.getItem('xbri-saved-items') || '{}')
          );

          const entities: ItemData[] = [];

          Object.entries(
            data?.map((_: ItemData) => {
              if (_.id !== (action as any)?.itemId) {
                entities.push(_);
              }
            })
          );

          localStorage.setItem('xbri-saved-items', btoa(JSON.stringify(entities)));
        } catch (e) {
          //not to do
        }
      } else if (action.type === actions.removeAll.type) {
        try {
          const data: ItemData[] = JSON.parse(
            atob(localStorage.getItem('xbri-saved-items') || '{}')
          );

          const entities: ItemData[] = [];

          Object.entries(
            data?.map((_: ItemData) => {
              if (!(action as any).data.join('#').includes(_.id)) {
                entities.push(_);
              }
            })
          );

          localStorage.setItem('xbri-saved-items', btoa(JSON.stringify(entities)));
        } catch (e) {
          //not to do
        }
      }

      return handledState;
    };
  };
};
