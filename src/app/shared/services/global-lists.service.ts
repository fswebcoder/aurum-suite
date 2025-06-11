import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreState } from '../../store/store.state';

@Injectable({
  providedIn: 'root'
})
export class GlobalListsService {
  public readonly departments: Signal<any[]>;
  public readonly cities: Signal<any[]>;

  constructor(private store: Store<StoreState>) {
    this.departments = toSignal(
      this.store.select(state => state.common.departments),
      { initialValue: [] }
    );
    this.cities = toSignal(
      this.store.select(state => state.common.cities),
      { initialValue: [] }
    );
  }

  getDepartments(): Signal<any[]> {
    return this.departments;
  }

  getCities(): Signal<any[]> {
    return this.cities;
  }

}
