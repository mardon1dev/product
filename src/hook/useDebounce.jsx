import { useState, useEffect } from "react";

const useDebounce = (value, delay, setIsLoading) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, setIsLoading]);

  return debouncedValue;
};

export default useDebounce;
