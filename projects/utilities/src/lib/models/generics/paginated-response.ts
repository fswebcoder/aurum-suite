import { IGeneralResponse } from "./general-response";
import { PaginatedData } from "./paginated-data";

// Respuesta paginada utilizando las interfaces anteriores
export type IpaginatedResponse<T> = IGeneralResponse<PaginatedData<T>>;
