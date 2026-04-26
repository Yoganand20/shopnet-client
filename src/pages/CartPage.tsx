import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01Icon,
  MinusSignIcon,
  PlusSignIcon,
  ShoppingCart01Icon,
  Location01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartItemListProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  isCartEmpty: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: 101,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.0,
    quantity: 1,
    imageUrl: "/images/iphone15pro-1.jpg",
  },
  {
    id: 103,
    name: "WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    price: 398.0,
    quantity: 1,
    imageUrl: "/images/sony-headphones.jpg",
  },
  {
    id: 104,
    name: "Basic Wired Mouse",
    brand: "Logitech",
    price: 15.99,
    quantity: 2,
    imageUrl: "/images/logitech-mouse.jpg",
  },
];

function CartItemList({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemListProps) {
  return (
    <div className="flex-1 w-full">
      <div className="flex items-center gap-3 mb-6">
        <HugeiconsIcon icon={ShoppingCart01Icon} className="size-8" />
        <h1 className="text-3xl font-extrabold">Shopping Cart</h1>
        <span className="text-gray-500 font-medium text-lg mt-1">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h2 className="text-xl font-bold text-gray-500">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-white dark:bg-gray-950 shadow-sm relative"
            >
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for missing images in mock data
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/150x150?text=No+Image";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-sm text-gray-500">{item.brand}</div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="font-extrabold text-xl mt-2">
                    ₹ {item.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity & Delete Controls */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <HugeiconsIcon icon={MinusSignIcon} className="size-4" />
                    </Button>
                    <div className="w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                    </Button>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <HugeiconsIcon
                      icon={Delete01Icon}
                      className="size-4 mr-1"
                    />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Total Line Item Price (Desktop only) */}
              <div className="hidden sm:block absolute right-6 top-6 font-bold text-lg">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderSummary({
  subtotal,
  shipping,
  discount,
  total,
  isCartEmpty,
}: OrderSummaryProps) {
  return (
    <div className="w-full lg:w-100 shrink-0 lg:sticky top-24">
      <Card className="shadow-lg border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Price Breakdown */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `₹ ${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-medium">- ₹ {discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Final Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-extrabold">
              ₹ {total.toFixed(2)}
            </span>
          </div>
          <Separator />

          {/* Coupon Code */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <HugeiconsIcon icon={Tag01Icon} className="size-4" />
              Apply Coupon
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                className="flex-1 uppercase"
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <Separator />
          {/* Pincode Verification */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <HugeiconsIcon icon={Location01Icon} className="size-4" />
              Delivery Pincode
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Pincode"
                maxLength={6}
                className="flex-1"
              />
              <Button variant="secondary">Check</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-12 text-lg font-bold"
            disabled={isCartEmpty}
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Handlers for cart actions
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = subtotal > 500 ? 50 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-8 items-start">
      <CartItemList
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        discount={discount}
        total={total}
        isCartEmpty={cartItems.length === 0}
      />
    </div>
  );
}

export default CartPage;
