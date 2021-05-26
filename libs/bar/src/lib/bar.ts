export type Nil = null | undefined;

export function isNull(value: any): value is null {
  return value === null;
}

export function isUndefined(value: any): value is undefined {
  return value === undefined && typeof value === 'undefined';
}

export function isNil(value: any): value is Nil {
  return value === null || value === undefined;
}

export function isNotNil<T = any>(value: T | Nil): value is T {
  return !isNil(value);
}

export function isNan(value: any): boolean {
  return isNaN(value);
}

export function isObject(value: any): boolean {
  return isNotNil(value) && typeof value === 'object' && Object(value) === value;
}

export function isBoolean(value: any): value is boolean {
  return isNotNil(value) && (value === true || value === false);
}

export function groupBy<T>(collection: Array<T>, path: string): { [key: string]: T } {
  return collection.reduce((r, v, i, a, k = v?.[path]) => ((r?.[k] ?? (r[k] = [])).push(v), r), {});
}