import { makeEnvironmentProviders } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {  provideStore as provideNgRx } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { META_REDUCERS, STORE_REDUCERS } from '@/store/store.reducers';
import { STORE_EFFECTS } from '@/store/store.effects';
import { provideEffects } from '@ngrx/effects';

export function provideStore() {
  return makeEnvironmentProviders([
    provideNgRx(STORE_REDUCERS, { metaReducers: META_REDUCERS }),
    provideEffects(STORE_EFFECTS),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]);
}
