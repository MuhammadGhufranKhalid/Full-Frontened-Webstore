// src/hooks/useFetch.js
// Generic custom hook wrapping any async fetcher function with consistent
// loading/error/data state. Every data hook in this app builds on this one.

import { useState, useEffect, useCallback } from "react";

export function useFetch(fetcherFn, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const result = await fetcherFn();
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, status, error, refetch: run };
}
