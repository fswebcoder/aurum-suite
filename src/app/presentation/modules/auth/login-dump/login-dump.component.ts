import { Component, computed, effect, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';
import { ButtonComponent } from '@/shared/components/form/button/button.component';
import { LoadingComponent } from '@/shared/components/loading/loading.component';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ICompany } from '@/shared/entities/company.entity';
import { FloatSelectComponent } from '@/shared/components/form/float-select/float-select.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { IBranding } from '@/shared/entities/branding.entity';

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
    LoadingComponent,
    FloatSelectComponent
  ],
  templateUrl: './login-dump.component.html',
  styleUrls: ['./login-dump.component.scss']
})
export class LoginDumpComponent implements OnInit, OnChanges {
  loginForm: FormGroup;
  urlVideo: string = 'SVI-Hero.mp4';

  emitLogin = output<ILoginParamsEntity>();
  inputCompanies = input<ICompany[]>();
  outputTheme = output<IBranding>();
  ouputSetCompany = output<string>();
  hasCompanies = computed(() => {
    return this.inputCompanies() && this.inputCompanies()!.length > 1;
  });

  setBranding(): void {
    const companies = this.inputCompanies();
    if (companies && companies.length === 1) {
      this.outputTheme.emit(companies[0].branding);
    }
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      company: ['']
    });
  }

  ngOnInit() {
    this.hasCompanies()
      ? this.loginForm.get('company')?.setValidators(Validators.required)
      : this.loginForm.get('company')?.clearValidators();
    this.loginForm.get('company')?.updateValueAndValidity();
    this.listenFormCompany();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputCompanies']) {
      this.setBranding();
      this.ouputSetCompany.emit(this.inputCompanies()![0].id.toString());
    }
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
      password: this.loginForm.value.password,
      ...(this.hasCompanies() && { company: this.loginForm.value.company })
    };
  }

  listenFormCompany() {
    this.loginForm.get('company')?.valueChanges.subscribe(value => {
      if (value) {
        this.outputTheme.emit(value.branding);
        this.ouputSetCompany.emit(value.id.toString());
      }
    });
  }
}
