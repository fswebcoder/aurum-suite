import { LoadingComponent } from '@/shared/components/loading/loading.component';

export default [
  {
    path: 'recepcion-dore',
    data: { breadcrumb: 'Recepcion muestras' },

    component: () =>
      import('@lims/modules/receptions/samples/reception-sample-smart/reception-sample-smart.component').then(
        c => c.ReceptionSampleSmartComponent
      )
  }
];
