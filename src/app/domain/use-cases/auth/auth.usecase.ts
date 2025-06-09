import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';
import { IPermissionsResponseEntity } from '@/domain/entities/auth/permissions-response.entity';
import { ISetCompanyResponseEntity } from '@/domain/entities/auth/set-company-response.entity';
import { LoginRepository } from '@/domain/repositories/auth/auth.repository';
import { inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IGeneralResponse } from 'projects/utilities/src/public-api';
import { map, Observable, of } from 'rxjs';

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
    return this.loginRepository.getPermissions(companyId).pipe(
      map(res => {
        const menuItems = this.transFormMenuItem(res.data.applications);

        return {
          ...res,
          data: {
            menuItems
          }
        }
      })
    );
  }

  transFormMenuItem(applications: any[]): any[] {
    console.log({applications});
    return applications.map((application: any) => ({
      label: application.name,
      items: this.mapResources(application.resources)
    }));
  }

  private mapResources(resources: any[]): MenuItem[] {
    return resources.map(resource => {
      const subresources = this.mapSubresources(resource.subresources);

      if (subresources.length === 1 && subresources[0].label === resource.name) {
        const subresource = resource.subresources[0];
        return {
          id: subresource.id,
          label: subresource.name,
          icon: resource.icon,
          routerLink: [subresource.path],
          actions: subresource.action ? [subresource.action] : []
        };
      }

      return {
        id: resource.id,
        label: resource.name,
        icon: resource.icon,
        items: subresources
      };
    });
  }


  private mapSubresources(subresources: any[]): MenuItem[] {
    return subresources.map(subresource => ({
      id: subresource.id,
      label: subresource.name,
      icon: subresource.icon,
      routerLink: [subresource.path],
      actions: subresource.action ? [subresource.action] : []
    }));
  }
}


