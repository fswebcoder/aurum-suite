import { BaseHttpService } from "@/core/providers/base-http.service";
import { ILoginResponseEntity } from "@/domain/entities/auth/login-response.entity";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENT } from "src/app.config";
import { Observable } from "rxjs";
import { ILoginParamsEntity } from "@/domain/entities/auth/login-params.entity";
import { LoginRepository } from "@/domain/repositories/auth/login.repository";
import { IGeneralResponse } from "projects/utilities/src/public-api";

@Injectable({
    providedIn: 'root'
})
export class LoginDatasourceService extends BaseHttpService<ILoginResponseEntity> implements LoginRepository {
    private env = inject(ENVIRONMENT);
    protected baseUrl = `${this.env.services.security}auth`;

    login(credentials: ILoginParamsEntity): Observable<IGeneralResponse<ILoginResponseEntity>> {
        return this.post<IGeneralResponse<ILoginResponseEntity>>(credentials, '/login');
    }
}
