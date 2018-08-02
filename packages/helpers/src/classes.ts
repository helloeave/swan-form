import isObject from 'lodash/isObject';

export type ClassesArgs = (string | false | null | 0 | undefined)[] | { [key: string]: boolean } | string;

export default function classes(obj: ClassesArgs) {
  if (Array.isArray(obj)) {
    return obj.filter(Boolean).join(' ');
  }

  if (isObject(obj)) {
    return (
      Object.keys(obj)
        // @ts-ignore: this is an object
        .map(k => Boolean(obj[k]) && k)
        .filter(Boolean)
        .join(' ')
    );
  }

  if (typeof obj === 'string') {
    return obj;
  }

  return '';
}
