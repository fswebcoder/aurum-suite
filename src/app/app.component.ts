import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { HYDRATE } from './store/hydratation/actions/hydratation.actions';
import { StoreState } from './store/store.state';
import { ICompany } from './shared/entities/company.entity';
import { selectAuthBranding, selectAuthCompanies } from './store/selectors/auth.selectors';
import { IBranding } from './shared/entities/branding.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ToastModule],
  template: `<p-toast
      [autoZIndex]="true"
      [breakpoints]="{ '400px': 1, '500px': 2 }"
      [position]="'top-right'"
    /><router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(private store: Store<StoreState>) {}

  ngOnInit() {
    this.store.dispatch(HYDRATE());
    this.getBranding();
  }

  getBranding() {
    this.store.select(selectAuthBranding).subscribe(branding => {
      console.log('branding', branding);
      this.setThemeColor(branding);
    });
  }

  setThemeColor(company: IBranding) {
    const root = document.documentElement;
    root.style.setProperty(`--primaryColor`, company!.primaryColor || '#6F3C0D');
    root.style.setProperty(`--secundaryColor`, company!.secondaryColor || '#6F3C0D');
  }
}
