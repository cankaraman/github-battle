import React from "react";

const themeContext = React.createContext();

export default themeContext;
export const ThemeConsumer = themeContext.Consumer;
export const ThemeProvider = themeContext.Provider;
