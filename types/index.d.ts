declare function getObj<T extends object>(obj: T): T;
type ObjLength = {
    length: number;
};
declare function getLength<T extends ObjLength>(obj: T): number;
declare function compare<T extends {
    length: number;
}, U extends {
    length: number;
}>(a: T, b: U): number;
declare const result: number;
declare const result2: number;
type TreeNode = {
    value: string;
};
type LeafNode = TreeNode & {
    isLeaf: true;
};
type InnerNode = TreeNode & {
    children: TreeNode[];
};
declare const a: TreeNode;
declare const b: LeafNode;
declare const c: InnerNode;
declare function mapNode<T extends TreeNode>(node: T, fn: (node: string) => string): T & {
    value: string;
};
declare const a1: TreeNode & {
    value: string;
};
declare const b1: TreeNode & {
    isLeaf: true;
} & {
    value: string;
};
declare const c1: TreeNode & {
    children: TreeNode[];
} & {
    value: string;
};
