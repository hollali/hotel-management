"use client";

import { useContext } from "react";
import ThemeContext from "@/app/context/themeContext";

export function useTheme() {
  const { darkTheme } = useContext(ThemeContext);
  return { isDark: darkTheme };
}
