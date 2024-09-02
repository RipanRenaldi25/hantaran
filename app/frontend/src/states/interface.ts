export interface IBoxes {
  id: string;
  name: string;
  image_url: string;
  price: number;
  created_at: string;
  updated_at: string;
  color?: string;
  decoration?: string;
}
export type IMapBoxResponse = IBoxResponseWithColorAndDecoration & {
  decorations: { id: string; name: string }[];
  colors: { id: string; name: string }[];
};

export interface IBoxesResponse {
  boxes: IBoxes[];
  total: number;
  page: number;
}

export interface IBoxResponseWithColorAndDecoration {
  id: string;
  box_name: string;
  box_image_url: string;
  price: number;
  color_id: string;
  color_name: string;
  decoration_id: string;
  decoration_name: string;
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

export interface IOwnedCart {
  box_id: string;
  box_name: string;
  cart_id: string;
  color_id: string;
  color_name: string;
  decoration_id: string;
  decoration_name: string;
  quantity: number;
  user_id: string;
}

export type ICartItem = IBoxes & { quantity: number };

export interface ICart {
  items: ICartItem[];
}

export interface IUserWithProfileAndAddress {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  avatar: string;
  city: string;
  postal_code: string;
  street: string;
  details: string;
}
