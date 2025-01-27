export interface CarService {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface ServicePackage {
  id?: string;
  name: string;
  description: string;
  totalPrice: number;
  duration: number;
  services: CarService[];
} 