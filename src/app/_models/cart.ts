import { CartItem } from './cart-item';

export interface Cart {
    total: number;
    item: CartItem[];
}