export interface ITourClient {
    name:string,
    description:string,
    tourOperator:string,
    price:string,
    img:string,
}

export interface ITour extends ITourClient{
    id?:string,
    type?: string,
    date?: string
}
