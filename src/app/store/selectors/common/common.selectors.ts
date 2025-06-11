import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommonState } from "@/store/models/common/common.model";

export const selectCommonState = createFeatureSelector<CommonState>('common');

export const selectCommonDepartments = createSelector(
    selectCommonState,
    (state: CommonState) => state.departments
);

export const selectCommonCities = createSelector(
    selectCommonState,
    (state: CommonState) => state.cities
);


