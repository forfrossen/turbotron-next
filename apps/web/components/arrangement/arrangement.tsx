export const Arrangement = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex flex-col w-full mx-2 gap-2 flex-grow-1">{children}</div>;
};
