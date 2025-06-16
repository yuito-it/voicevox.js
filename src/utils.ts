export const toSnakeCaseKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCaseKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: any, key) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      acc[snakeKey] = toSnakeCaseKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

export const toCamelCaseKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, g) => g.toUpperCase());
      acc[camelKey] = toCamelCaseKeys(value);
      return acc;
    }, {});
  }
  return obj;
};
