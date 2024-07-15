declare function createArray<T = number>(length: number, value: T): T[];
declare const arr: string[];
type A<T = string> = {
    value: T;
};
declare const a: A<number>;
declare const b: A;
interface MyEvent<T = HTMLDivElement | null> {
    target: T;
    type: string;
}
declare const myEvent: MyEvent;
declare const myEvent2: MyEvent<HTMLButtonElement | null>;
