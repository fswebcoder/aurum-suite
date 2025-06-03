import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { LoginRepository } from '@/domain/repositories/auth/login.repository';
import { UseCase } from '@/shared/interfaces/use-case.interface';
import { inject, Injectable } from '@angular/core';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { Observable } from 'rxjs';

@Injectable()
export class LoginUseCase implements UseCase<IGeneralResponse<any>, ILoginParamsEntity> {
    private readonly loginRepository = inject(LoginRepository);

    execute(params: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>> {
        return this.loginRepository.login(params);
    }
}
