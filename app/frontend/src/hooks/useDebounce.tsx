import React, { useEffect, useState } from 'react';

export const useDebounce = (defaultValue: string) => {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(defaultValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [defaultValue]);

  return [value, setValue];
};
