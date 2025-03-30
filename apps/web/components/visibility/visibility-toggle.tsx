"use client";

import { Button } from "@repo/ui/components/button";
import { useAtom } from "jotai";
import { Eye, EyeClosed } from "lucide-react";
import { visibilityAtom } from "./atom";

export const VisibilityToggle = () => {
  const [isVisible, setIsVisible] = useAtom(visibilityAtom);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick} title={"toggle visibility"}>
      {isVisible ?
        <EyeClosed />
      : <Eye />}
    </Button>
  );
};
