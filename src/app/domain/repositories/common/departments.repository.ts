import { IDepartmentsResponseEntity } from "@/domain/entities/common/departments-response.entity";
import { IGetAll } from "@/shared/interfaces/get-all.interface";
import { IGeneralResponse } from "projects/utilities/src/public-api";
import { Observable } from 'rxjs';

export abstract class DepartmentsRepository implements  IGetAll<IDepartmentsResponseEntity> {
    abstract getAll(): Observable<IGeneralResponse<IDepartmentsResponseEntity[]>>;
}
