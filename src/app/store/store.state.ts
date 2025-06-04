import { RouterState } from "@angular/router";
import { AuthState } from "./models/auth/auth.model";


export interface StoreState {
    router: RouterState;
    auth: AuthState;

  }
