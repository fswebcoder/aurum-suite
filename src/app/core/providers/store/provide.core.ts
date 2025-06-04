import { makeEnvironmentProviders } from '@angular/core';
import { provideEnvironmentNgxMask } from 'ngx-mask'; // Adjust the module path if necessary
import { provideStore } from './provide.store';

export function provideCore() {
  return makeEnvironmentProviders([provideEnvironmentNgxMask(), provideStore()]);
}
