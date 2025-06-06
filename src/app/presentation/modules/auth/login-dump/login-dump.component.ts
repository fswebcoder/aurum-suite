import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';
import { DatePikerComponent } from '@/shared/components/form/date-piker/date-piker.component';
import { ButtonComponent } from '@/shared/components/form/button/button.component';
import { LoadingService } from '@/shared/services/loading.service';
import { LoadingComponent } from '@/shared/components/loading/loading.component';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';

@Component({
  selector: 'app-login-dump',
  standalone: true,
  imports: [
    ButtonModule,
    FloatInputComponent,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    RippleModule,
    FloatLabelModule,
    ButtonComponent,
    LoadingComponent
  ],
  templateUrl: './login-dump.component.html',
  styleUrls: ['./login-dump.component.scss']
})
export class LoginDumpComponent implements OnInit {
    loginForm: FormGroup;
    urlVideo: string = 'SVI-Hero.mp4';
    private loadingService: LoadingService = inject(LoadingService);

    emitLogin =  output<ILoginParamsEntity>();

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    ngOnInit() {

    }

    validateForm() {
        if (this.loginForm.valid) {
            const params = this.generateParams();
            this.emitLogin.emit(params);
        }
    }
    generateParams() {
        return {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
    }
}
