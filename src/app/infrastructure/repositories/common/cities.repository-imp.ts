import { CitiesRepository } from "@/domain/repositories/common/cities.repository";
import { inject, Injectable } from "@angular/core";
import { CitiesDatasourceService } from "@/infrastructure/datasources/common/cities.datasource.service";
import { Observable } from "rxjs";
import { IGeneralResponse } from "projects/utilities/src/public-api";
import { ICitiesResponseEntity } from "@/domain/entities/common/cities-response.entity";

@Injectable({
    providedIn: 'root'
})
export class CitiesRepositoryImp implements CitiesRepository {
    private readonly citiesDatasourceService = inject(CitiesDatasourceService);

    getAll(): Observable<IGeneralResponse<ICitiesResponseEntity[]>> {
        return this.citiesDatasourceService.getAll();
    }
}