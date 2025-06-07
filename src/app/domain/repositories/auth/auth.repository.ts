import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { IPermissionsResponseEntity } from '@/domain/entities/auth/permissions-response.entity';
import { ISetCompanyResponseEntity } from '@/domain/entities/auth/set-company-response.entity';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { Observable } from 'rxjs';

export abstract class LoginRepository {
  abstract login(params: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>>;
  abstract setCompany(companyId: string): Observable<IGeneralResponse<ISetCompanyResponseEntity>>;
  abstract getPermissions(companyId: string): Observable<IGeneralResponse<IPermissionsResponseEntity>>;
}
