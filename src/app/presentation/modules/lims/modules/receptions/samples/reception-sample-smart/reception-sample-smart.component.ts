import { Component, inject, OnInit, signal } from '@angular/core';
import { ReceptionSampleDumpComponent } from '../reception-sample-dump/reception-sample-dump.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { SuppliersListUseCases } from '@/domain/use-cases/common/suppliers-list.usecases';
import { Store } from '@ngrx/store';
import { selectCommonDepartments } from '@/store/selectors/common/common.selectors';
import { GlobalListsService } from '@/shared/services/global-lists.service';
import { IDepartmentsResponseEntity } from '@/domain/entities/common/departments-response.entity';

@Component({
  selector: 'svi-reception-sample-smart',
  imports: [ReceptionSampleDumpComponent],
  templateUrl: './reception-sample-smart.component.html',
  styleUrl: './reception-sample-smart.component.scss'
})

export class ReceptionSampleSmartComponent implements OnInit {
    private readonly getSuppliers = inject(SuppliersListUseCases);
    private globalListsService = inject(GlobalListsService);
    departments  =  signal<IDepartmentsResponseEntity[]>([]);
    ngOnInit(): void {
        this.suppliersQuery.refetch();
        this.departments.set(this.globalListsService.departments());

    }


    suppliersQuery = injectQuery(() => ({
        queryKey: ['SUPPLIERS'],
        queryFn: () => lastValueFrom(this.getSuppliers.getAll())
    }));


    get isLoadingSuppliers(): boolean {
        return this.suppliersQuery.status() === 'pending';
    }

    get suppliersData() {
        return this.suppliersQuery.data();
    }

    get hasError(): boolean {
        return this.suppliersQuery.status() === 'error';
    }

    get errorMessage(): string | null {
        const error = this.suppliersQuery.error();
        if (error instanceof Error) {
            return error.message;
        }
        return 'Error desconocido';
    }


}
