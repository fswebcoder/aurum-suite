import { IGeneralResponse, PaginatedData } from "../models/generics/generics";

// Respuesta paginada utilizando las interfaces anteriores
export type PaginatedResponse<T> = IGeneralResponse<PaginatedData<T>>;
