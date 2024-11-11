// Define interfaces
export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Staff {
  id: number;
  name: string;
}

export interface VegetarianDish {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: string[];
}

export interface Order {
  orderId: number;
  customerId: number;
  items: number[]; // Array of dish IDs
  status: "Active" | "Pending";
}

// Mock data
export const customers: Customer[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

export const staff: Staff[] = [
  { id: 1, name: "Emma Williams" },
  { id: 2, name: "Liam Davis" },
  { id: 3, name: "Olivia Martinez" },
];

export const vegetarianDishes: VegetarianDish[] = [
  {
    id: 1,
    name: "Vegetarian Pizza",
    price: 9.99,
    description: "Veggie pizza",
    ingredients: ["Tomato", "Mozzarella", "Basil", "Olives"],
  },
  {
    id: 2,
    name: "Pasta Primavera",
    price: 8.99,
    description: "Veggie pasta",
    ingredients: ["Pasta", "Bell Peppers", "Zucchini", "Tomato Sauce"],
  },
  {
    id: 3,
    name: "Veggie Burger",
    price: 7.99,
    description: "Veggie burger",
    ingredients: ["Bun", "Lettuce", "Tomato", "Vegetarian Patty"],
  },
];

export const menu: VegetarianDish[] = vegetarianDishes; // Menu is an array of objects with the VegetarianDish interface

export const activeOrders: Order[] = [
  { orderId: 1, customerId: 1, items: [1, 2], status: "Active" },
  { orderId: 2, customerId: 2, items: [3], status: "Active" },
];

export const pendingOrders: Order[] = [
  { orderId: 3, customerId: 3, items: [2, 3], status: "Pending" },
  { orderId: 4, customerId: 1, items: [1], status: "Pending" },
];
