import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-white/90 hover:text-white hover:bg-white/10"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "light"
            ? "rotate-0 scale-100"
            : "rotate-90 scale-0 absolute"
        }`}
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100"
            : "-rotate-90 scale-0 absolute"
        }`}
      />
    </Button>
  );
};

export default ThemeToggle;
