export interface IProduct{
    id: number,
    name: string,
    price: number,
    stock: number,
    type: string
}
export interface IProductForm {
    onClear(modal: string): void;
}