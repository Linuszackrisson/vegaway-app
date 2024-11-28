interface Item {
  category: string;
  description: string;
  imageUrl: string;
  menuId: string;
  name: string;
  price: number;
}

export interface Order {
  orderId: string;
  createdAt: number;
  isConfirmed: string;
  customerEmail: string;
  totalPrice: number;
  items: Item[];
  note?: string;
}

export interface FetchOrdersResponse {
  message: string;
  orders: Order[];
}

/*
 * Författare: Isak
 *
 * Exporterar ett interface för api response vid fetch av orders
 */
