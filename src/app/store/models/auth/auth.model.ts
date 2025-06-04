export interface AuthState {
    isAutenticated: boolean;
    loading: boolean;
    error: any;
    companies: any[];
    companyId: string | null;
    token: string | null;
    user: any | null;
}

export const initialAuthState: AuthState = {
    isAutenticated: false,
    loading: false,
    error: null,
    companies: [],
    companyId: null,
    token: null,
    user: null
};
