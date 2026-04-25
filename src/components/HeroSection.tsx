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
import Autoplay from "embla-carousel-autoplay";
import AutoHeight from "embla-carousel-auto-height";

interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface HeroSectionProps {
  images: ImageData[];
  width?: string; // e.g. "max-w-7xl", "w-full", "600px"
  maxHeight?: string; // e.g. "max-h-96", "max-h-[500px]", "600px"
  autoplayDelay?: number;
  showArrows?: boolean; // Show/hide navigation arrows
  showDots?: boolean; // Show/hide navigation dots
}

export function HeroSection({
  images,
  width = "w-full",
  maxHeight = "h-fit",
  autoplayDelay = 8000,
  showArrows = true,
  showDots = true,
}: HeroSectionProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
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
    return null;
  }

  // Check if maxHeight is a Tailwind class or CSS value
  const isCustomCSSValue = maxHeight && !maxHeight.startsWith("max-h-");
  const maxHeightClass = isCustomCSSValue ? "" : maxHeight;
  const maxHeightStyle = isCustomCSSValue ? { maxHeight } : {};

  return (
    <div
      className={`relative mx-auto ${width} ${maxHeightClass}`}
      style={maxHeightStyle}
    >
      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          align: "center",
        }}
        className={`w-full ${maxHeightClass}`}
        style={maxHeightStyle}
        plugins={[
          Autoplay({
            delay: autoplayDelay,
          }),
          AutoHeight(),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <Card
                className={`py-0 border-0 shadow-lg overflow-hidden ${maxHeightClass}`}
                style={maxHeightStyle}
              >
                <CardContent
                  className={`p-0 relative ${maxHeightClass}`}
                  style={maxHeightStyle}
                >
                  <div
                    className={`relative w-full ${maxHeightClass}`}
                    style={maxHeightStyle}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width || 800}
                      height={image.height || 400}
                      className={`w-full h-auto object-cover ${maxHeightClass}`}
                      style={maxHeightStyle}
                      sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw`}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows - Conditionally Rendered */}
      {showArrows && (
        <div className="absolute inset-0 z-20 flex items-center justify-between px-12 pointer-events-none">
          <Button
            onClick={() => scrollToIndex(currentIndex - 1)}
            className="pointer-events-auto rounded-full w-8 h-8 md:w-12 md:h-12 p-0 bg-white/80 dark:bg-black/80 hover:bg-white/90 hover:dark:bg-black/80 text-gray-800 dark:text-white shadow-lg transition-all duration-200"
          >
            <HugeiconsIcon
              className="size-8! md:size-10!"
              icon={CircleArrowLeft01Icon}
            />
          </Button>
          <Button
            onClick={() => scrollToIndex(currentIndex + 1)}
            className="pointer-events-auto rounded-full w-8 h-8 md:w-12 md:h-12 p-0 bg-white/80 dark:bg-black/80 hover:bg-white/90 hover:dark:bg-black/80 text-gray-800 dark:text-white shadow-lg transition-all duration-200"
          >
            <HugeiconsIcon
              className="size-8! md:size-10!"
              icon={CircleArrowRight01Icon}
            />
          </Button>
        </div>
      )}

      {/* Navigation Dots - Conditionally Rendered */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? "bg-white dark:bg-black shadow-lg"
                  : "bg-white/50 hover:bg-white/70 dark:bg-black/50 hover:dark:bg-black/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
