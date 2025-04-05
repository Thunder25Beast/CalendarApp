// src/hooks/use-toast.js
import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(({ title, description, variant }) => {
    alert(`${title}: ${description}`);
  }, []);
  return { toast };
}
