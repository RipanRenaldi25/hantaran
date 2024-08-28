export interface IBoxes {
  id: string;
  name: string;
  image_url: string;
  price: number;
  created_at: string;
  updated_at: string;
  colors?: string[];
  decoration?: string[];
}

export interface IBoxesResponse {
  boxes: IBoxes[];
  total: number;
  page: number;
}

export interface IOrder {
  id: string;
  userId: string;
  price: string;
  status: string;
  paymentMethod: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}
