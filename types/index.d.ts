declare function sameTypeSwap<T>(arr: [T, T]): T[];
declare const result1: number[];
declare function swap<T, U>(arr: [T, U]): [U, T];
declare const result2: [string, number];
declare const result3: [boolean, {
    id: number;
    name: string;
}];
declare const arr: number[];
declare const newArr1: number[];
declare const newArr2: string[];
declare function map<T, U>(arr: T[], callback: (item: T, index?: number) => U): U[];
declare const result4: number[];
declare const result5: string[];
