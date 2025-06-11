import { CitiesRepository } from "@/domain/repositories/common/cities.repository";
import { DepartmentsRepository } from "@/domain/repositories/common/departments.repository";
import { SuppliersListRepository } from "@/domain/repositories/common/suppliers-list.repository";
import { CitiesRepositoryImp } from "@/infrastructure/repositories/common/cities.repository-imp";
import { DepartmentsRepositoryImp } from "@/infrastructure/repositories/common/department.repository-imp";
import { SuppliersListRepositoryImp } from "@/infrastructure/repositories/common/suppliers-list.repository-imp";
import { Provider } from "@angular/core";

export function commonProvider(): Provider[] {
    return [
        {
            provide: SuppliersListRepository,
            useClass: SuppliersListRepositoryImp
        },
        {
            provide: DepartmentsRepository,
            useClass: DepartmentsRepositoryImp
        },
        {
            provide: CitiesRepository,
            useClass: CitiesRepositoryImp
        }
    ]
}