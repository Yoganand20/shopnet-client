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
