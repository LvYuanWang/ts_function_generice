declare function uniqueArray<T>(arr: Array<T>): Array<T>;
declare const arr1: number[];
declare const arr2: string[];
declare const arr3: number[];
declare const arr4: string[];
type User = {
    id: number | string;
    name: string;
    tel: string;
    address: string;
};
type Computer = {
    id: number | string;
    name: string;
    brand: string;
    price: number;
};
type ResultData<T> = {
    message: string;
    code: number;
    data: T;
};
type UserData = ResultData<User>;
type ComputerData = ResultData<Computer>;
declare const userResultData: UserData;
declare const computerResultData: ComputerData;
type MyEvent<T> = {
    target: T;
    type: string;
};
interface TimeEvent<T> {
    event: MyEvent<T>;
    from: Date;
    to: Date;
}
declare const myEvent: MyEvent<HTMLButtonElement | null>;
declare const timerEvent: TimeEvent<HTMLDivElement | null>;
declare function triggerEvent<T>(event: MyEvent<T>): void;
type Nullable<T> = T | null | undefined;
declare let str: Nullable<string>;
