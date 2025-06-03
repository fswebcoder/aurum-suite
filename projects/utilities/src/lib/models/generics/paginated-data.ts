import { PaginationMetadata } from "./pagination-metadata";

// Tipo genérico para colecciones paginadas
export type PaginatedData<T> = {
  items: T[];
  meta: PaginationMetadata;
}