import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingState } from '../interfaces/loading-state.interface';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingState = new BehaviorSubject<LoadingState>({});

    /**
     * Inicia el estado de carga para una sección específica
     * @param section Nombre de la sección
     */
    startLoading(section: string): void {
        const currentState = this.loadingState.value;
        this.loadingState.next({
            ...currentState,
            [section]: true
        });
    }

    /**
     * Detiene el estado de carga para una sección específica
     * @param section Nombre de la sección
     */
    stopLoading(section: string): void {
        const currentState = this.loadingState.value;
        this.loadingState.next({
            ...currentState,
            [section]: false
        });
    }

    /**
     * Obtiene el estado de carga de una sección específica
     * @param section Nombre de la sección
     */
    isLoading$(section: string): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.loadingState.subscribe(state => {
                observer.next(state[section] || false);
            });
        });
    }

    /**
     * Obtiene el estado actual de carga de una sección
     * @param section Nombre de la sección
     */
    isLoadingSync(section: string): boolean {
        return this.loadingState.value[section] || false;
    }
}
