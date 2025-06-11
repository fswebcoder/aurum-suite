import { IsupplierListResponseEntity } from "@/domain/entities/common/suppliers-list-response.entity";
import { IGetAll } from "@/shared/interfaces/get-all.interface";
import { IGeneralResponse } from "projects/utilities/src/public-api";
import { Observable } from "rxjs";

export abstract class SuppliersListRepository implements IGetAll<IsupplierListResponseEntity, false> {
    abstract getAll(): Observable<IGeneralResponse<IsupplierListResponseEntity[]>>;
}