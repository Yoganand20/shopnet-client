import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart, ShoppingBag } from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductImageGallery } from "@/components/ProductImageGalary";

export const sampleProducts: Product[] = [
  {
    id: 101,
    name: "iPhone 15 Pro",
    description:
      "The latest flagship smartphone from Apple featuring a titanium design and A17 Pro chip.",
    price: 999.0,
    brand: {
      id: 1,
      name: "Apple",
    },
    category: {
      id: 10,
      name: "Smartphones",
      description: "Mobile communication devices",
      level: 2,
    },
    imageUrls: ["/test.PNG", "/test.PNG"],
    attributes: [
      {
        attributeId: 501,
        attributeType: "Color",
        attributeDescription: "Exterior finish color",
        value: "Natural Titanium",
      },
      {
        attributeId: 502,
        attributeType: "Storage",
        attributeDescription: "Internal flash memory capacity",
        value: "256GB",
      },
      {
        attributeId: 503,
        attributeType: "RAM",
        attributeDescription: "Random Access Memory",
        value: "12GB",
      },
      {
        attributeId: 504,
        attributeType: "RAM",
        attributeDescription: "Random Access Memory",
        value: "12GB",
      },
      {
        attributeId: 505,
        attributeType: "RAM",
        attributeDescription: "Random Access Memory",
        value: "12GB",
      },
      {
        attributeId: 506,
        attributeType: "RAM",
        attributeDescription: "Random Access Memory",
        value: "12GB",
      },
    ],
  },
  {
    id: 102,
    name: "XPS 13 Laptop",
    description: "Ultra-portable and powerful laptop for professionals.",
    price: 1299.5,
    brand: {
      id: 2,
      name: "Dell",
    },
    category: {
      id: 20,
      name: "Laptops",
      description: "Portable computing devices",
      level: 2,
    },
    imageUrls: ["/images/dell-xps-1.jpg"],
    attributes: [
      {
        attributeId: 601,
        attributeType: "Processor",
        attributeDescription: "Central Processing Unit",
        value: "Intel Core i7-1355U",
      },
      {
        attributeId: 602,
        attributeType: "RAM",
        attributeDescription: "Random Access Memory",
        value: "16GB LPDDR5",
      },
    ],
  },
  {
    id: 103,
    name: "WH-1000XM5 Wireless Headphones",
    price: 398.0,
    brand: {
      id: 3,
      name: "Sony",
    },
    category: {
      id: 30,
      name: "Audio",
      level: 1,
    },
    imageUrls: ["/images/sony-headphones.jpg"],
    attributes: [
      {
        attributeId: 701,
        attributeType: "Connectivity",
        attributeDescription: "Connection interface",
        value: "Bluetooth 5.2",
      },
      {
        attributeId: 702,
        attributeType: "Feature",
        attributeDescription: "Special capabilities",
        value: "Active Noise Cancellation",
      },
    ],
  },
  {
    id: 104,
    name: "Basic Wired Mouse",
    description: "Reliable plug-and-play optical mouse.",
    price: 15.99,
    brand: {
      id: 4,
      name: "Logitech",
    },
    category: {
      id: 40,
      name: "Accessories",
      description: "Computer peripherals and add-ons",
      level: 2,
    },
    imageUrls: ["/images/logitech-mouse.jpg"],
  },
];

function fetchProduct(id: string) {
  console.log(id);
  return sampleProducts[0] as Product;
}

function ProductPage() {
  const { id } = useParams();
  if (!id) {
    return <>Invalid product</>;
  }
  const product = fetchProduct(id);
  console.log(product);
  const galleryImages =
    product.imageUrls?.map((url, index) => ({
      src: url,
      alt: `${product.name} - View ${index + 1}`,
    })) || [];
  return (
    <div className="flex flex-row ">
      <div className="sticky top-17 w-160 h-160 ">
        <ProductImageGallery images={galleryImages} />
      </div>
      <div className="flex-1 ps-10">
        {/* header: category,name,brand, */}
        <div>
          {/* TODO: Category should point to product list with all the products in same category*/}
          <div className="text-gray-500 text-sm">{product.category.name}</div>
          <div className="font-extrabold text-4xl">{product.name}</div>
          {/* TODO: Brand should point to product list with all the brands products */}
          <div className="text-gray-500">{product.brand.name}</div>
        </div>
        <Separator className="my-3" orientation="horizontal" />
        {/* Price */}
        <div className="flex flex-row gap-4">
          <div className="font-extrabold text-2xl">₹ {product.price}</div>
          {/* Old price, discount can be added here */}
        </div>
        <Separator className="my-3" orientation="horizontal" />
        {/* Product Description */}
        <div>
          {/* <div className="text-md font-bold">About</div> */}
          <div className="text-sm">{product.description}</div>
        </div>
        <Separator className="my-3" orientation="horizontal" />

        {/* TODO: Variants */}
        {/* Delivery Options */}
        <div className="flex flex-col gap-3">
          <div className="text-md font-bold">Delivery Options</div>
          <div>
            <div className="flex flex-row gap-3">
              <Input
                id="pincode"
                placeholder="Enter Pincode"
                className="w-36"
                minLength={6}
                maxLength={6}
              />
              <Button type="button">Check</Button>
            </div>
            <div className="text-xs pt-1">
              Please enter PIN code to check delivery time & Pay on Delivery
              Availability
            </div>
          </div>
        </div>
        <Separator className="my-3" orientation="horizontal" />

        {/* Add to Cart and wishlist button */}
        <div className="flex flex-row gap-5 py-5">
          <Button id="add-to-cart-btn" className="w-50 h-10">
            <HugeiconsIcon icon={ShoppingBag} />
            Add to Cart
          </Button>
          <Button id="wishlist-btn" className="w-50 h-10">
            <HugeiconsIcon icon={Heart} />
            Wishlist
          </Button>
        </div>
        <ul className="text-sm py-5">
          <li>Only Pay on delivery available</li>
          <li>Easy 7 days returns and exchanges</li>
        </ul>
        {/* TODO: Offers */}

        {/* Product Details */}
        <div className="flex flex-col">
          <Accordion
            multiple
            defaultValue={["productDetails"]}
            className="max-w-lg"
          >
            <AccordionItem value="productDetails">
              <AccordionTrigger className="text-lg font-bold">
                Product Details
              </AccordionTrigger>
              <AccordionContent>
                {/* Attributes Table */}
                {product.attributes && product.attributes.length > 0 ? (
                  <table className="w-full text-sm text-left">
                    <tbody>
                      {product.attributes.map((attr) => (
                        <tr key={attr.attributeId}>
                          <td className="py-2 pr-4 font-medium text-gray-900 dark:text-gray-200 w-1/3 align-top">
                            {attr.attributeType}
                          </td>
                          <td className="py-2 text-gray-600 dark:text-gray-400 align-top">
                            {attr.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-sm text-gray-500 italic py-2">
                    No additional details available for this product.
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
