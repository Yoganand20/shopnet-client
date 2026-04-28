import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { axiosInstance } from "@/services/axios";
import NavigationMenu from "@/components/NavigationMenu";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, UserIcon, FavouriteIcon } from "@hugeicons/core-free-icons";
import SearchBar from "./form/SearchBar";

function Logo() {
  return (
    <div className="shrink-0 content-center">
      <Link to="/home" className="text-xl font-serif font-bold text-foreground">
        ShopNet
      </Link>
    </div>
  );
}

export default function Navbar() {
  let categories: Category[] = [];
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get<Category[]>("/category/level/0").then((res) => {
      categories = res.data;
    });
  }, []);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement actual search navigation
  };
  return (
    <div className="h-12 flex flex-row justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
      {/* left side */}
      <Logo />
      {/* center */}
      <NavigationMenu categories={categories}></NavigationMenu>
      {/* right side */}
      <div className="flex flex-row justify-end items-center gap-2">
        {/* Search Icon */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSearchOpen(true)}
          className="h-8 w-8 p-0"
        >
          <HugeiconsIcon icon={Search01Icon} className="h-4 w-4" />
        </Button>

        {/* User Icon */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <HugeiconsIcon icon={UserIcon} className="h-4 w-4" />
        </Button>

        {/* Wishlist Icon */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4" />
        </Button>

        <ThemeToggle />
      </div>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search Products</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for products..."
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
