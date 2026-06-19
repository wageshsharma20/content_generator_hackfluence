export function getStoredProduct() {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("product");

  if (!data) return null;

  return JSON.parse(data);
}