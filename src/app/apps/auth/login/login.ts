import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { FloatInpuComponent } from '@/shared/components/float-inpu/float-inpu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    InputIcon,
    IconField,
    FloatInpuComponent
  ],
  template: `
    <video
      autoplay
      loop
      muted
      class="absolute top-0 left-0 w-full h-full object-cover
"
    >
      <source [src]="urlVideo" type="video/mp4" />
      Tu navegador no soporta videos.
    </video>
    <div class="min-h-screen flex flex-col bg-cover relative ">
      <div class="self-center mt-auto mb-auto bg-cover blur-xs">
        <div
          class="text-center z-50 flex flex-col border rounded-xl border-surface
             bg-white/10 dark:bg-surface-400/10 p-8 backdrop-blur-md shadow-lg"
        >
          <span class="text-2xl font-semibold text-center p-12">
            <img
              src="Sun-Valley-color-Horizontal.png"
              width="200"
              alt=""
              srcset=""
            />
          </span>

          <div class="w-full flex flex-col gap-4 px-4">
          <app-float-inpu ></app-float-inpu>

            <p-icon-field>
              <p-inputicon class="pi pi-key" />
              <input
                pInputText
                type="password"
                class="w-full"
                placeholder="Password"
              />
            </p-icon-field>
            <button
              pButton
              pRipple
              [routerLink]="['/']"
              class="w-full mt-4 px-4"
              label="LOGIN"
            ></button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  urlVideo: string = 'SVI-Hero.mp4';
}
