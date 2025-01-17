interface CarViewTransactionData { //사용자 입장에서 구매
    car_sales_id : number,
    sales_date : Date,
    progress : string,
    brand : string,
    model_name : string,
    order_number : string,
    price : number,
    imageUrl: string
}

interface CarViewUserCarTransactionData{ //사용자 입장에서 판매
    car_purchase_id:number,
    purchase_date:Date,
    progress:string,
    brand:string,
    model_name:string,
    price:number,
    imageUrl:string
}


type CarViewTransactionListResponse = CarViewTransactionData[];
type CarViewUserCarTransactionListResponse = CarViewUserCarTransactionData[];

export type {CarViewTransactionData, CarViewUserCarTransactionData, CarViewTransactionListResponse, CarViewUserCarTransactionListResponse}