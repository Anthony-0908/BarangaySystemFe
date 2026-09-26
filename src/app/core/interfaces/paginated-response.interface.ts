export interface Pagination {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedResponse<T> {
  records: T[];
  pagination: Pagination;
}