export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  level?: number;
}

export interface ProductAttribute {
  attributeId: number;
  attributeType: string;
  attributeDescription: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  brand: Brand;
  category: Category;
  imageUrls: string[];
  attributes?: ProductAttribute[];
}

export interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  address: Address;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: Date;
}
