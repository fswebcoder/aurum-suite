import { IDepartmentsResponseEntity } from '@/domain/entities/common/departments-response.entity';
import { DepartmentsRepository } from '@/domain/repositories/common/departments.repository';
import { DepartmentsListDatasourceService } from '@/infrastructure/datasources/common/departments-list.datasource.service';
import { inject, Injectable } from '@angular/core';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsRepositoryImp implements DepartmentsRepository {
  private readonly departmentsListDatasourceService = inject(DepartmentsListDatasourceService);

  getAll(): Observable<IGeneralResponse<IDepartmentsResponseEntity[]>> {
    return this.departmentsListDatasourceService.getAll();
  }
}
