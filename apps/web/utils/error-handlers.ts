export const errorHandler = (error: unknown) => {
  console.error("Error fetching teams by user ID:", error);
  return [];
};
