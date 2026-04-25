import ProductFilterForm from "@/components/form/ProductFilterForm";
import { ProductCard } from "@/components/ProductCard";

const product1 = {
  id: 123,
  name: "string",
  price: 1111,
  brand: { id: 5, name: "test" },
  category: { id: 5, name: "test" },
  imageUrls: ["/icons.svg"],
};

const sampleBounds = {
  brand: ["Apple", "Samsung", "Sony", "Dell", "Bose", "Logitech"],
  category: ["Smartphones", "Laptops", "Audio", "Accessories", "Wearables"],
  minPrice: 0,
  maxPrice: 5000,
};

function ListingPage() {
  return (
    <div className="flex flex-col min-w-full flex-1">
      {/* Header : optional */}
      <div className="h-20 p-2">
        <div className="text-3xl font-extrabold">Products</div>
      </div>
      <div className=" flex flex-1 flex-row">
        {/* filters */}
        <div className="w-64 flex flex-col p-3 sticky top-10 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* filters will be shown here */}
          <ProductFilterForm bounds={sampleBounds} />
        </div>

        {/* Product list */}
        <div className="flex-1 p-3">
          {/* products will be shown here */}
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
              return <ProductCard product={product1} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListingPage;
