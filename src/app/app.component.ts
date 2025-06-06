import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { HYDRATE } from './store/hydratation/actions/hydratation.actions';
import { StoreState } from './store/store.state';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule],
    template: `<p-toast [autoZIndex]="true" [breakpoints]="{ '400px': 1, '500px': 2 }" [position]="'top-right'" /><router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    constructor(private store: Store<StoreState>) {}

    ngOnInit() {
        this.store.dispatch(HYDRATE());
    }
}
