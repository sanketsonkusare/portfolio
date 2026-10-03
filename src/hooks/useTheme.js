import { useCallback, useEffect, useState } from "react";
import { otherTheme, readTheme, writeTheme } from "../lib/theme.js";

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

export function useTheme() {
  // index.html applies the saved theme before first paint; this keeps React in step with it.
  const [theme, setTheme] = useState(() => readTheme(safeStorage()));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = otherTheme(t);
      writeTheme(safeStorage(), next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
