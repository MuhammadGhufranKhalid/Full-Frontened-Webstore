// src/hooks/useDebounce.js
// Generic debounce hook — delays updating the returned value until the
// input has stopped changing for `delay` ms.

import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
