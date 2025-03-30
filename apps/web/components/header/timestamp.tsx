"use client";

import { useLayoutEffect, useState } from "react";

export function Timestamp() {
  const [time, setTime] = useState<string>("");
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    setTime(new Date().toLocaleTimeString());
  }, []);
  if (time) {
    return "current time: " + time;
  }
  return null;
}
