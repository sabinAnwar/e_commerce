import { useEffect, useState } from "react";
import type { Product } from "../types";

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prevId, setPrevId] = useState(id);

  if (id !== prevId) {
    setPrevId(id);
    setProduct(null);
    setError(null);
  }

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data: Product) => setProduct(data))
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    return () => controller.abort();
  }, [id]);

  return { product, error, loading: !product && !error };
}
