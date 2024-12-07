import { snakeToCamel } from './caseConverter';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const convertKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }

  if (obj && typeof obj === 'object') {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((result: any, key) => {
      const camelKey = snakeToCamel(key);
      result[camelKey] = obj[key];
      return result;
    }, {});
  }

  return obj;
};
