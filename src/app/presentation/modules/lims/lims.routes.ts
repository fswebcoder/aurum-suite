import { Routes } from '@angular/router';

export default [{
  path: 'recepcion-muestras',
  data: { breadcrumb: 'Recepcion muestras' },
  loadComponent: () =>
    import('@lims/modules/receptions/samples/reception-sample-smart/reception-sample-smart.component').then(
      c => c.ReceptionSampleSmartComponent
    )
}] as Routes
