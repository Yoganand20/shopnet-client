import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CircleArrowLeft01Icon,
  CircleArrowRight01Icon,
} from "@hugeicons/core-free-icons";

interface ImageData {
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ImageData[];
  showArrows?: boolean;
}

export function ProductImageGallery({
  images,
  showArrows = true,
}: ProductImageGalleryProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCarouselState();
    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {/* Main 1:1 Image Carousel */}
      <div className="relative w-full group">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            loop: true,
            align: "center",
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                {/* aspect-square enforces the 1:1 ratio */}
                <Card className="border-0 shadow-none overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900">
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-square">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <div className="absolute inset-0 z-10 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => scrollToIndex(currentIndex - 1)}
              className="pointer-events-auto rounded-full w-10 h-10 p-0 bg-white/80 dark:bg-black/80 hover:bg-white hover:dark:bg-black text-gray-800 dark:text-white shadow-md backdrop-blur-sm transition-all"
            >
              <HugeiconsIcon className="size-6!" icon={CircleArrowLeft01Icon} />
            </Button>
            <Button
              onClick={() => scrollToIndex(currentIndex + 1)}
              className="pointer-events-auto rounded-full w-10 h-10 p-0 bg-white/80 dark:bg-black/80 hover:bg-white hover:dark:bg-black text-gray-800 dark:text-white shadow-md backdrop-blur-sm transition-all"
            >
              <HugeiconsIcon className="size-6!" icon={CircleArrowRight01Icon} />
            </Button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`relative shrink-0 w-12 h-12 sm:w-15 sm:h-15 rounded-lg overflow-hidden snap-start transition-all duration-200 border-2 ${
                currentIndex === index
                  ? "border-black dark:border-white ring-2 ring-black/10 dark:ring-white/10"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover bg-gray-50 dark:bg-gray-900"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}