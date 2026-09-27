export  interface QueryParams { 
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}