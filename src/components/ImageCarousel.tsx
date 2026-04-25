import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

export interface CarouselData {
  id: number;
  title: string;
  imageUrl: string;
}

interface ImageCarouselProps<T> {
  data: T[];
}

export function ImageCarousel({ data }: ImageCarouselProps<CarouselData>) {
  return (
    <div className="w-full m-auto mx-15">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="sm:basis-1/2 md:basis-1/4 lg:basis-1/6 xl:basis-1/7"
            >
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-white text-xs font-medium truncate text-center">
                        {item.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
