"use client";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Button } from "@repo/ui/components/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const mounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div>Current theme: {mounted && resolvedTheme}</div>
      <Button variant="outline" size="icon" onClick={handleToggleTheme} title="toggle dark mode">
        {mounted && resolvedTheme === "dark" ?
          <Sun />
        : <Moon />}
      </Button>
    </>
  );
};
