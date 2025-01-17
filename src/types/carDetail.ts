export interface CarDetailResponse {
  created_at: string;
  price: number;
  discount_price: number;
  progress: string;
  agency_id: number;
  agency_name: string;
  latitude: number;
  longitude: number;
  carId: number;
  view_count: number;
  like_count: number;
  car_number: string;
  color: string;
  cruise_control: boolean;
  distance: number;
  heated_seat: boolean;
  hud: boolean;
  line_out_warning: boolean;
  navigation: boolean;
  parking_distance_warning: boolean;
  sunroof: boolean;
  ventilated_seat: boolean;
  brand: string;
  car_type: string;
  displacement: number;
  fuel: string;
  fuel_efficiency: number;
  gear: string;
  model_name: string;
  model_year: string;
  carImages: string[];
  fixedImages: string[];
  recommendCars: RecommendCar[];
}

export type CarComparisonData = Omit<CarDetailResponse, "recommendCars">;

interface RecommendCar {
  carId: number;
  imageUrl: string;
  brand: string;
  model_name: string;
  price: number;
  discount_price: number;
}
