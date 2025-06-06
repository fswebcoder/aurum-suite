import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { ISetCompanyResponseEntity } from '@/domain/entities/auth/set-company-response.entity';
import { LoginRepository } from '@/domain/repositories/auth/auth.repository';
import { LoginDatasourceService } from '@/infrastructure/datasources/auth/auth-datasource.service';
import { inject } from '@angular/core';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { Observable } from 'rxjs';

export class LoginRepositoryImpl implements LoginRepository {
  private loginDatasource = inject(LoginDatasourceService);

  login(credentials: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>> {
    return this.loginDatasource.login(credentials);
  }

  setCompany(companyId: string): Observable<IGeneralResponse<ISetCompanyResponseEntity>> {
    return this.loginDatasource.setCompany(companyId);
  }

  getPermissions(companyId: string): Observable<IGeneralResponse<any>> {
    return this.loginDatasource.getPermissions(companyId);
  }
}
