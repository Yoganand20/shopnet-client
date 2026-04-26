import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  ShoppingCart01Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

interface WishlistItemsListProps {
  items: WishlistItem[];
  onRemoveItem: (id: number) => void;
  onMoveToCart: (id: number) => void;
}

interface WishlistSummaryProps {
  totalItems: number;
  estimatedTotal: number;
  onMoveAllToCart: () => void;
  isWishlistEmpty: boolean;
}

// --- Mock Data ---
const initialWishlistItems: WishlistItem[] = [
  {
    id: 102,
    name: "XPS 13 Laptop",
    brand: "Dell",
    price: 1299.5,
    imageUrl: "/images/dell-xps-1.jpg",
    inStock: true,
  },
  {
    id: 105,
    name: "Mechanical Keyboard",
    brand: "Keychron",
    price: 99.0,
    imageUrl: "/images/keychron.jpg",
    inStock: false,
  },
  {
    id: 106,
    name: "4K Gaming Monitor",
    brand: "LG",
    price: 450.0,
    imageUrl: "/images/lg-monitor.jpg",
    inStock: true,
  },
];

function WishlistItemsList({
  items,
  onRemoveItem,
  onMoveToCart,
}: WishlistItemsListProps) {
  return (
    <div className="flex-1 w-full">
      <div className="flex items-center gap-3 mb-6">
        <HugeiconsIcon icon={FavouriteIcon} className="size-8 text-red-500" />
        <h1 className="text-3xl font-extrabold">My Wishlist</h1>
        <span className="text-gray-500 font-medium text-lg mt-1">
          ({items.length} {items.length === 1 ? "item" : "items"})
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h2 className="text-xl font-bold text-gray-500">
            Your wishlist is empty
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-white dark:bg-gray-950 shadow-sm relative"
            >
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={`w-full h-full object-cover ${!item.inStock ? "opacity-50 grayscale" : ""}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/150x150?text=No+Image";
                  }}
                />
                {!item.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-white text-xs font-bold px-2 py-1 bg-black/60 rounded">
                      Out of Stock
                    </span>
                  </div>
                )}
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

                {/* Actions */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    disabled={!item.inStock}
                    onClick={() => onMoveToCart(item.id)}
                  >
                    <HugeiconsIcon
                      icon={ShoppingCart01Icon}
                      className="size-4 mr-2"
                    />
                    Move to Cart
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <HugeiconsIcon
                      icon={Delete01Icon}
                      className="size-4 sm:mr-1"
                    />
                    <span className="hidden sm:inline">Remove</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistSummary({
  totalItems,
  estimatedTotal,
  onMoveAllToCart,
  isWishlistEmpty,
}: WishlistSummaryProps) {
  return (
    <div className="w-full lg:w-100 shrink-0 lg:sticky top-24">
      <Card className="shadow-lg border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Wishlist Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-sm text-gray-500">
            Move items to your cart to check out. Out-of-stock items will not be
            added to the cart.
          </p>

          <Separator />

          {/* Value Breakdown */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Items</span>
              <span className="font-medium">{totalItems}</span>
            </div>
          </div>

          <Separator />

          {/* Final Estimated Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Estimated Value</span>
            <span className="text-2xl font-extrabold">
              ₹ {estimatedTotal.toFixed(2)}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-12 text-lg font-bold"
            disabled={isWishlistEmpty}
            onClick={onMoveAllToCart}
          >
            <HugeiconsIcon icon={ShoppingCart01Icon} className="size-5 mr-2" />
            Move In-Stock to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function WishlistPage() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (id: number) => {
    console.log(`Moved item ${id} to cart`);
    removeItem(id);
  };

  const moveAllInStockToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock);
    console.log("Moved following items to cart:", inStockItems);
    setWishlistItems((prev) => prev.filter((item) => !item.inStock));
  };

  // Calculations
  const estimatedTotal = wishlistItems.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-8 items-start">
      <WishlistItemsList
        items={wishlistItems}
        onRemoveItem={removeItem}
        onMoveToCart={moveToCart}
      />

      <WishlistSummary
        totalItems={wishlistItems.length}
        estimatedTotal={estimatedTotal}
        onMoveAllToCart={moveAllInStockToCart}
        isWishlistEmpty={wishlistItems.length === 0}
      />
    </div>
  );
}

export default WishlistPage;
