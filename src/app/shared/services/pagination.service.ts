import { computed, Injectable, signal } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

export interface PaginationState {
  first: number;
  rows: number;
  totalRecords: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private readonly _paginationState = signal<PaginationState>({
    first: 0,
    rows: 5,
    totalRecords: 0,
    page: 1
  });

  // Signals computados
  readonly paginationState = computed(() => this._paginationState());
  readonly currentPage = computed(() => this._paginationState().page);
  readonly pageSize = computed(() => this._paginationState().rows);
  readonly totalPages = computed(() => Math.ceil(this._paginationState().totalRecords / this._paginationState().rows));

  // Métodos para actualizar el estado
  updatePagination(event: PaginatorState): void {
    this._paginationState.update(state => ({
      ...state,
      first: event.first ?? 0,
      rows: event.rows ?? 10,
      page: (event.first ?? 0) / (event.rows ?? 10) + 1
    }));
  }

  setTotalRecords(total: number): void {
    this._paginationState.update(state => ({
      ...state,
      totalRecords: total
    }));
  }

  resetPagination(): void {
    this._paginationState.set({
      first: 0,
      rows: 10,
      totalRecords: 0,
      page: 1
    });
  }

  // Método para obtener los parámetros de paginación para la API
  getPaginationParams() {
    const state = this._paginationState();
    return {
      page: state.page,
      limit: state.rows
    };
  }
}
