import { Routes } from '@angular/router';

export default [
    {
        path: 'recepcion-muestras',
        data: { breadcrumb: 'Recepcion muestras' },
        loadComponent: () =>
          import('@lims/modules/receptions/samples/reception-sample-smart/reception-sample-smart.component').then(
            c => c.ReceptionSampleSmartComponent
          )
      },
    {
  path: 'recepcion-laboratorio',
  data: { breadcrumb: 'Recepción laboratorio' },
  loadComponent: () =>
    import('@lims/modules/receptions/laboratory/laboratory-smart/laboratory-smart.component').then(
      c => c.LaboratorySmartComponent
    )
}


] as Routes
