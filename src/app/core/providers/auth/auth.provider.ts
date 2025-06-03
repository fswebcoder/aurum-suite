import { LoginRepository } from "@/domain/repositories/auth/login.repository";
import { LoginRepositoryImpl } from "@/infrastructure/repositories/auth/login.repository-imp";
import { Provider } from "@angular/core";

export  function authProvider():Provider[] {
    return [
        {
            provide: LoginRepository,
            useClass: LoginRepositoryImpl
        }
    ]
}