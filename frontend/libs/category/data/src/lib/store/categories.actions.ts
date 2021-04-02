import { createAction, props } from '@ngrx/store';
import { Category, ModelDescriptor } from '@workspace/shared/data';

export const getAll = createAction('[Categories] getall');
export const getAllSuccess = createAction(
  '[Categories] getAllSuccess',
  props<{ payload: ModelDescriptor<Category[]> }>()
);

export const categoryError = createAction(
  '[Categories] categoryError',
  props<{ payload: any }>()
);
