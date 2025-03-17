import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputIcon } from 'primeng/inputicon';
import { FloatInpuComponent } from '@/shared/components/float-inpu/float-inpu.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { DividerModule } from 'primeng/divider';
import { PrimeNG } from 'primeng/config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LABEL_BUTTONS } from '@/shared/constants/label-buttons.constant';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { SelectComponent } from '@/shared/components/select/select.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, FloatInpuComponent, ButtonComponent, DividerModule, DialogModule, CardModule, SelectComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [PrimeNG, TranslateService, TranslateModule]
})
export class LoginComponent {
    urlVideo: string = 'SVI-Hero.mp4';
    buttonLabel: string = LABEL_BUTTONS.ACCEPT;
    visible: boolean = false;
    cities: any[];
    constructor(
        private config: PrimeNG,
        private translateService: TranslateService
    ) {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    ngOnInit() {
        this.translateService.setDefaultLang('es');
        this.translateService.get('BUTTONS.ACCEPT').subscribe((res: string) => {
            this.buttonLabel = res;
        });
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe((res) => this.config.setTranslation(res));
    }

    showDialog() {
        this.visible = true;
    }
}
