import { ItemData } from '@interfaces';
import { createAction, props } from '@ngrx/store';

export const load = createAction('[Items] Load');
export const upsert = createAction('[Items] Upsert', props<{ data: ItemData }>());
export const upsertAll = createAction('[Items] Upsert All', props<{ data: ItemData[] }>());
export const remove = createAction('[Items] Remove', props<{ itemId: string }>());
export const removeAll = createAction('[Items] Remove All', props<{ data: string[] }>());
export const generateFakeData = createAction('[Items] Generate Fake Data');
