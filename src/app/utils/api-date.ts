export function parseUtcDate(value: string | Date): Date {
  if (value instanceof Date) {
    return value;
  }

  const hasTimezone = /(?:Z|[+-]\d{2}:\d{2})$/i.test(value);
  return new Date(hasTimezone ? value : `${value}Z`);
}

export function mapUtcDateFields<T extends object>(value: T, fields: readonly (keyof T)[]): T {
  const result = { ...value };

  for (const field of fields) {
    const fieldValue = result[field];
    if (typeof fieldValue === 'string' || fieldValue instanceof Date) {
      Object.assign(result, { [field]: parseUtcDate(fieldValue) });
    }
  }

  return result;
}