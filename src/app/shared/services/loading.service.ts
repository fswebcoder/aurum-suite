import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingState } from '../interfaces/loading-state.interface';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingState = new BehaviorSubject<LoadingState>({});
    private buttonLoadingState = new BehaviorSubject<Record<string, boolean>>({});

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

    /**
     * Establece el estado de loading para un botón específico
     * @param buttonId Identificador único del botón
     * @param loading Estado de loading
     */
    setButtonLoading(buttonId: string, loading: boolean): void {
        const currentState = this.buttonLoadingState.value;
        this.buttonLoadingState.next({
            ...currentState,
            [buttonId]: loading
        });
    }

    /**
     * Obtiene el estado de loading de un botón específico
     * @param buttonId Identificador único del botón
     */
    isButtonLoading$(buttonId: string): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.buttonLoadingState.subscribe(state => {
                observer.next(state[buttonId] || false);
            });
        });
    }

    /**
     * Obtiene el estado actual de loading de un botón
     * @param buttonId Identificador único del botón
     */
    isButtonLoadingSync(buttonId: string): boolean {
        return this.buttonLoadingState.value[buttonId] || false;
    }
}
