export type UnknownObject = Record<string, any>;

export const serialize = (object: UnknownObject): string => {
  const str = [];
  for (const p in object) {
    if (Object.prototype.hasOwnProperty.call(object, p)) {
      if (object[p] || typeof object[p] === 'boolean' || object[p] === null) {
        if (Array.isArray(object[p]) && !object[p].length) continue;

        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`);
      }
    }
  }
  return str.join('&');
};

export const deepCopy = <T>(obj: T): T => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.slice().map((item) => deepCopy(item)) as unknown as T;
    }

    const newObj: Record<string | number | symbol, unknown> = {
      ...(obj || {}),
    };

    for (const key of Object.keys(newObj)) {
      newObj[key] = deepCopy(newObj[key]);
    }

    return newObj as T;
  }

  return obj;
};

export const removeEmptyValues = <T>(value: T): Partial<T> => {
  const obj = deepCopy(value);
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string' && !value) {
      delete obj[key];
    }
    if (Array.isArray(value) && !value.length) {
      delete obj[key];
    }
  }
  return obj;
};
