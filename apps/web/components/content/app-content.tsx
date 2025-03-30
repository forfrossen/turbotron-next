import React from "react";

const AppContent = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className="flex flex-1 flex-col gap-4 p-4">
    <div className="grid auto-rows-min gap-4 md:grid-cols-1">{children}</div>
  </div>
);

export default AppContent;
