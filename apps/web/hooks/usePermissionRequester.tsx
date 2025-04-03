"use client";
import { useEffect } from "react";

export const usePermissionRequester = () => {
  useEffect(() => {
    navigator.permissions
      .query({ name: "midi" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          console.log("MIDI permission granted");
        } else if (permissionStatus.state === "prompt") {
          console.log("MIDI permission prompt");
        } else {
          console.error("MIDI permission denied");
        }
      })
      .catch((error) => {
        console.error("Failed to query MIDI permission:", error);
      });
  }, []);
};
