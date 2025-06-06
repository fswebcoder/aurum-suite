import { Component, inject } from '@angular/core';
import { LoginDumpComponent } from '../login-dump/login-dump.component';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { LoadingService } from '@/shared/services/loading.service';
import { Store } from '@ngrx/store';
import { loginAction } from '@/store/actions/auth/auth.actions';

@Component({
  selector: 'app-login-smart',
  imports: [LoginDumpComponent],
  templateUrl: './login-smart.component.html',
  styleUrl: './login-smart.component.scss'
})
export class LoginSmartComponent {
    private loadingService: LoadingService = inject(LoadingService);
    private store: Store = inject(Store);

    onLogin($event: ILoginParamsEntity) {
      this.loadingService.setButtonLoading('login-button', true);
      this.loadingService.startLoading('login');
      this.store.dispatch(loginAction({ payload: $event }));
    }
}
