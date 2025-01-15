interface CarListItemData {
  carId: number;
  imageUrl: string;
  brand: string;
  modelName: string;
  modelYear: string;
  distance: number;
  price: number;
  discountPrice: number;
  monthPrice: number;
  createDate: string;
  viewCount: number;
}

type CarListResponse = CarListItemData[];

export type { CarListItemData, CarListResponse };
