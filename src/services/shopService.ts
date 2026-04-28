import { axiosInstance } from "./axios";
import type { CartItem, Order, Address } from "../lib/types";

export const fetchCart = async (): Promise<CartItem[]> => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

export const placeOrder = async (orderData: {
  addressId: string;
  paymentMethod: string;
  items: CartItem[];
}): Promise<Order> => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const fetchAddresses = async (): Promise<Address[]> => {
  const response = await axiosInstance.get("/addresses");
  return response.data;
};

export const addAddress = async (address: Omit<Address, "id">): Promise<Address> => {
  const response = await axiosInstance.post("/addresses", address);
  return response.data;
};