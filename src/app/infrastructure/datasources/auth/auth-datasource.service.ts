import { BaseHttpService } from '@/core/providers/base-http.service';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from 'src/app.config';
import { Observable } from 'rxjs';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { LoginRepository } from '@/domain/repositories/auth/auth.repository';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { ISetCompanyResponseEntity } from '@/domain/entities/auth/set-company-response.entity';

@Injectable({
  providedIn: 'root'
})
export class LoginDatasourceService extends BaseHttpService<ILoginResponseEntity> implements LoginRepository {
  private env = inject(ENVIRONMENT);
  protected baseUrl = `${this.env.services.security}auth`;

  login(credentials: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>> {
    return this.post<IGeneralResponse<ILoginResponseEntity>>(credentials, '/login');
  }

  setCompany(companyId: string): Observable<IGeneralResponse<ISetCompanyResponseEntity>> {
    return this.post<IGeneralResponse<ISetCompanyResponseEntity>>({ companyId }, '/set-company');
  }

  getPermissions(companyId: string): Observable<IGeneralResponse<any>> {
    return this.get<IGeneralResponse<any>>(`/user/permissions/${companyId}`);
  }
}
