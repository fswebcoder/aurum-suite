import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { ISetCompanyResponseEntity } from '@/domain/entities/auth/set-company-response.entity';
import { LoginRepository } from '@/domain/repositories/auth/auth.repository';
import { inject, Injectable } from '@angular/core';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase implements LoginRepository {
  private readonly loginRepository = inject(LoginRepository);

  login(params: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>> {
    return this.loginRepository.login(params);
  }

  setCompany(companyId: string): Observable<IGeneralResponse<ISetCompanyResponseEntity>> {
    return this.loginRepository.setCompany(companyId);
  }

  getPermissions(companyId: string): Observable<IGeneralResponse<any>> {
    return this.loginRepository.getPermissions(companyId);
  }
}
