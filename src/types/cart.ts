import { Medicine } from "./medicine.type";
import { OrderItem } from "./order.type";

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface CheckoutFormValues {
  address: string;
  phone: string;
}



export interface OrderData {
  customerId: string;
  shippingAddress: string;
  contactNumber: string;
  items: OrderItem[];
  totalAmount: number;
}

