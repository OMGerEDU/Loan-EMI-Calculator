import React, { createContext, useContext, useState, useEffect } from "react";

// Create language context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    // Update direction based on language
    setDirection(language === "he" ? "rtl" : "ltr");
    // Update document direction
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    // Store language preference
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  // Text translation function
  const t = (textObj) => {
    if (!textObj) return "";
    return textObj[language] || textObj["en"] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}