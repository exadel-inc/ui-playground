/** Class for processing attribute's tokens. */
export default class TokenListUtils {
  static split(attrValue: string | null): string[] {
    return attrValue?.split(/\s+/) || [];
  }

  static join(values: any[]): string {
    return values.join(' ');
  }

  /** Check if all array elements are equal. */
  static hasSameElements(values: any[]): boolean {
    return values.every(val => val === values[0]);
  }

  /** Check whether two arrays have same elements or not. */
  static equals<T>(arr1: T[], arr2: T[]): boolean {
    return TokenListUtils.contains(arr1, arr2) && TokenListUtils.contains(arr2, arr1);
  }

  /** Check if array contains all elements from subArray. */
  static contains<T>(array: T[], subArray: T[]): boolean {
    const set = new Set(array);
    return subArray.every(val => set.has(val));
  }

  /** Get array which contains only common elements from arrays. */
  static intersection<T>(...arrays: T[][]): T[] {
    const sets = arrays.map(arr => new Set(arr));
    return Array.from(sets.reduce((intersect, set) => {
      intersect.forEach(val => !set.has(val) && intersect.delete(val));
      return intersect;
    }, sets[0]));
  }

  /** Remove all element appearances from array. */
  static remove<T>(array: T[], element: T): T[] {
    return array.filter(el => el !== element);
  }
}
