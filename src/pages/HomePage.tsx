import { HeroSection } from "@/components/HeroSection";
import ImageCarousel, { type CarouselData } from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const mockCarouselData: CarouselData[] = [
  {
    id: 1,
    title: "Alpine Serenity",
    imageUrl: "/test.PNG",
  },
  {
    id: 2,
    title: "Urban Nocturne",
    imageUrl: "/test.PNG",
  },
  {
    id: 3,
    title: "Coastal Whispers",
    imageUrl: "/test.PNG",
  },
  {
    id: 4,
    title: "Desert Solitude",
    imageUrl: "/test.PNG",
  },
  {
    id: 5,
    title: "Forest Echoes",
    imageUrl: "/test.PNG",
  },
  {
    id: 6,
    title: "Forest Echoes",
    imageUrl: "/test.PNG",
  },
  {
    id: 7,
    title: "Forest Echoes",
    imageUrl: "/test.PNG",
  },
  {
    id: 8,
    title: "Forest Echoes",
    imageUrl: "/test.PNG",
  },
];

const heroSectionImages = [
  {
    src: "/fnd.jpg",
    alt: "Product showcase 1",
    width: 1200,
    height: 600,
  },
  {
    src: "/hrx.jpg",
    alt: "Product showcase 2",
    width: 1200,
    height: 600,
  },
  {
    src: "/us polo assn.jpg",
    alt: "Product showcase 2",
    width: 1200,
    height: 600,
  },
  // More images...
];

// const SAMPLE_CAROUSEL_DATA = [
//   {
//     id: 1,
//     title: "Mountain View",
//     imageUrl: "https://picsum.photos/id/10/400/400",
//   },
//   {
//     id: 2,
//     title: "Forest Path",
//     imageUrl: "https://picsum.photos/id/11/400/400",
//   },
//   {
//     id: 3,
//     title: "Ocean Breeze",
//     imageUrl: "https://picsum.photos/id/12/400/400",
//   },
//   {
//     id: 4,
//     title: "City Lights",
//     imageUrl: "https://picsum.photos/id/13/400/400",
//   },
//   {
//     id: 5,
//     title: "Desert Sands",
//     imageUrl: "https://picsum.photos/id/14/400/400",
//   },
//   {
//     id: 6,
//     title: "River Flow",
//     imageUrl: "https://picsum.photos/id/15/400/400",
//   },
//   {
//     id: 7,
//     title: "Starry Night",
//     imageUrl: "https://picsum.photos/id/16/400/400",
//   },
//   {
//     id: 8,
//     title: "Green Valley",
//     imageUrl: "https://picsum.photos/id/17/400/400",
//   },
// ];

// const product1 = {
//   id: 123,
//   name: "string",
//   price: 1111,
//   brand: { id: 5, name: "test" },
//   category: { id: 5, name: "test" },
//   imageUrls: ["/icons.svg"],
// };

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 h-full w-full justify-center px-5 gap-5 pt-5">
      {/* HeroSection */}
      <HeroSection
        images={heroSectionImages}
        width="w-full"
        maxHeight="max-h-[40vh]"
        autoplayDelay={8000}
      />

      {/*  products galary*/}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">Discount Products</CardTitle>
          <CardAction>
            <Button>View All</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row">
          <ImageCarousel data={mockCarouselData} />
        </CardContent>
      </Card>
    </div>
  );
}
