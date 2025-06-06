import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginDumpComponent } from '../login-dump/login-dump.component';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { LoadingService } from '@/shared/services/loading.service';
import { Store } from '@ngrx/store';
import { loginAction, setCompanyAction, setThemeAction } from '@/store/actions/auth/auth.actions';
import { selectAuthCompanies } from '@/store/selectors/auth.selectors';
import { ICompany } from '@/shared/entities/company.entity';
import { IBranding } from '@/shared/entities/branding.entity';

@Component({
  selector: 'app-login-smart',
  imports: [LoginDumpComponent],
  templateUrl: './login-smart.component.html',
  styleUrl: './login-smart.component.scss'
})
export class LoginSmartComponent implements OnInit {
  private loadingService: LoadingService = inject(LoadingService);
  private store: Store = inject(Store);
  listCompanies = signal<ICompany[]>([]);

  onLogin($event: ILoginParamsEntity) {
    this.loadingService.setButtonLoading('login-button', true);
    this.loadingService.startLoading('login');
    this.store.dispatch(loginAction({ payload: $event }));
  }

  ngOnInit(): void {
    this.getCompaniesWithStore();
  }

  getCompaniesWithStore() {
    console.log('getCompaniesWithStore');
    this.store.select(selectAuthCompanies).subscribe(companies => {
      if (companies.length > 0) {
        console.log('companies', companies);
        this.listCompanies.set(companies);
      }
    });
  }

  setTheme(theme: IBranding) {
    console.log('theme', theme);
    this.store.dispatch(setThemeAction({ payload: theme }));
    this.setThemeColor(theme);
  }

  setThemeColor(theme: IBranding) {
    console.log('theme', theme);
    const root = document.documentElement;
    root.style.setProperty(`--primaryColor`, theme.primaryColor);
    root.style.setProperty(`--secundaryColor`, theme.secondaryColor);
  }

  getPermission(permission: string) {
    this.store.dispatch(setCompanyAction({ payload: permission }));
  }
}
