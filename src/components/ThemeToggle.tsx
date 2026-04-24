import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const handleClick = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button variant="outline" size="icon-lg" onClick={handleClick}>
      {theme == "dark" ? (
        <HugeiconsIcon icon={Sun} size={32} strokeWidth={2} />
      ) : (
        <HugeiconsIcon icon={Moon} size={32} strokeWidth={2} />
      )}
    </Button>
  );
}
