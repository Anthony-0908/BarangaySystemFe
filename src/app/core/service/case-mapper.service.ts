// src/app/core/services/case-mapper.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseMapperService {
  // Convert camelCase → snake_case (for sending to Laravel)
  toSnakeCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(v => this.toSnakeCase(v));

    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[newKey] = this.toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }

  // Convert snake_case → camelCase (for responses/errors from Laravel)
  toCamelCase(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(v => this.toCamelCase(v));

    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
      acc[newKey] = this.toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
}
