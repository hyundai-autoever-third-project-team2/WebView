export interface CarData {
  id: number;
  brand: string;
  model: string;
  price: string;
  views: number;
  lastDate: number;
  modelYear: string;
  dist: string;
  carNumber: string;
  fuel: string;
  gear: string;
  gasMileage: string;
  carType: string;
  displacement: string;
  color: string;
  imageUrlList: string[];
  options: boolean[];
  fixedLogImageList: string[];
}

export default CarData;
