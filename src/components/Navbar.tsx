import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { axiosInstance } from "@/lib/axios";
import NavigationMenu from "@/components/NavigationMenu";
import { useEffect } from "react";

function Logo() {
  return (
    <div className="shrink-0 content-center">
      <Link to="/home" className="text-xl font-serif font-bold text-foreground">
        ShopNet
      </Link>
    </div>
  );
}
export interface Category {
  id: number;
  name: string;
  description?: string;
  level?: number;
}

export default function Navbar() {
  let categories: Category[] = [];
  useEffect(() => {
    axiosInstance.get<Category[]>("/category/level/0").then((res) => {
      categories = res.data;
    });
  }, []);
  return (
    <div className="h-12 flex flex-row justify-between items-center z-100">
      <Logo />

      <NavigationMenu categories={categories}></NavigationMenu>
      <div className="flex flex-row justify-end items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}
