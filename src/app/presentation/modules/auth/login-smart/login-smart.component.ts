import { Component } from '@angular/core';
import { LoginDumpComponent } from '../login-dump/login-dump.component';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';

@Component({
  selector: 'app-login-smart',
  imports: [LoginDumpComponent],
  templateUrl: './login-smart.component.html',
  styleUrl: './login-smart.component.scss'
})
export class LoginSmartComponent {
  onLogin($event: ILoginParamsEntity) {
  }
}
