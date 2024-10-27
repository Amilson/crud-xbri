import { ItemData } from '@interfaces';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Items] Load');
export const upsert = createAction('[Items] Upsert', props<{ data: ItemData }>());
export const remove = createAction('[Items] Remove', props<{ itemId: string }>());
