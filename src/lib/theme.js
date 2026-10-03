const THEMES = ["dark", "light"];
export const DEFAULT_THEME = "dark";

export function readTheme(storage) {
  try {
    const saved = storage?.getItem("theme");
    return THEMES.includes(saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function writeTheme(storage, theme) {
  try {
    storage?.setItem("theme", theme);
  } catch {
    // Storage can be blocked (private window); the theme just won't be remembered.
  }
}

export const otherTheme = (theme) => (theme === "dark" ? "light" : "dark");
