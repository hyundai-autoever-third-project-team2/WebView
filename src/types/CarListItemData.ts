interface CarListItemData {
  carId: number;
  imageUrl: string;
  brand: string;
  model_name: string;
  model_year: string;
  distance: number;
  price: number;
  discount_price: number;
  month_price: number;
  create_date: string;
  view_count: number;
}

type CarListResponse = CarListItemData[];

export type { CarListItemData, CarListResponse };
