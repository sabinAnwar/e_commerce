import { useEffect, useRef, useState } from "react";
import type { Product } from "../types";
import { useCart } from "./useCart";
import { flyToCart } from "../utils/flyToCart";

export function useAddToCart() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAdd = (product: Product, quantity = 1) => {
    if (imgRef.current) flyToCart(imgRef.current);
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setAdded(false), 1200);
  };

  return { imgRef, added, handleAdd };
}
