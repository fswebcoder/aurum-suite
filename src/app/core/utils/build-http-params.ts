import { HttpParams } from '@angular/common/http';
import { orderBy } from 'lodash';

/**
 * Construye HttpParams de manera segura y escalable.
 * Admite valores primitivos y arrays.
 */
export const buildHttpParams = (args?: Record<string, any>): HttpParams => {
  let params = new HttpParams();

  if (!args) return params;

  for (const [key, value] of orderBy(Object.entries(args), '[0]')) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v !== null && v !== undefined) {
          params = params.append(key, String(v));
        }
      });
    } else {
      params = params.set(key, String(value));
    }
  }

  return params;
};
