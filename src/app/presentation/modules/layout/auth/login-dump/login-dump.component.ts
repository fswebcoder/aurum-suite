import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FloatInputComponent } from '@/shared/components/form/float-input/float-input.component';

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
    FloatLabelModule
  ],
  templateUrl: './login-dump.component.html',
  styleUrls: ['./login-dump.component.scss']
})
export class LoginDumpComponent implements OnInit {
    loginForm: FormGroup;
    urlVideo: string = 'SVI-Hero.mp4';

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit() {
        // La inicialización se hace en el constructor
    }
}
