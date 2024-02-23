'use client'

import { useEffect,useState } from "react";

import ThemeContext from "@/app/context/themeContext";

const ThemeProvider = ({children}:{children :React.ReactNode}) => {
    const themeFromStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme") ? JSON.parse(localStorage.getItem("hotel-theme")!):false;
    const [darkTheme,setDarkTheme] = useState<boolean>();
};