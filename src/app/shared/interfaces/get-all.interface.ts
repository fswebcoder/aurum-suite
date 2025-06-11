import { Observable } from "rxjs";
import { IGeneralResponse, PaginatedData, PaginationParams } from "projects/utilities/src/public-api";

export interface IGetAll<T, IsPaginated extends boolean = false> {
    getAll(params?: IsPaginated extends true ? PaginationParams : void): Observable<IGeneralResponse<IsPaginated extends true ? PaginatedData<T> : T[]>>;
}