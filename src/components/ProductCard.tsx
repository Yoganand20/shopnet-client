import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart, ShoppingCart } from "@hugeicons/core-free-icons";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const onAddToCart = async (product: Product) => {
    console.log(product);
  };

  const onAddToWishlist = async (product: Product) => {
    console.log(product);
  };

  const onViewProduct = async (product: Product) => {
    console.log(product);
  };

  return (
    <Card
      onClick={() => onViewProduct(product)}
      id={product.id.toString()}
      className="overflow-hidden py-0 gap-3"
    >
      <CardHeader className="relative w-full h-36 px-0">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <CardAction className="z-1 p-1">
          <Button
            variant="ghost"
            className="border-none h-10 w-10 p-0"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product);
            }}
          >
            <HugeiconsIcon icon={Heart} className="size-6!" color="maroon" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-3">
        <div className="space-y-0.5">
          <div className="font-bold text-xs text-muted-foreground uppercase tracking-wide">
            {product.brand.name}
          </div>
          <CardTitle className="text-base leading-tight line-clamp-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-lg font-bold">
            ₹{product.price}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="px-3 pb-3 space-x-1.5">
        <Button
          className="flex-1 text-xs h-8 px-2 "
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <HugeiconsIcon icon={ShoppingCart} className="size-6!" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
