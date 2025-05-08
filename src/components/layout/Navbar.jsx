import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { settings, toggleSetting } = useAccessibility();

  return (
    <nav className={`sticky top-0 z-50 ${settings.nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center mr-2">
            <span className="text-white font-bold">E</span>
          </div>
          <span className={`text-xl font-bold ${settings.nightMode ? 'text-white' : 'text-primary'}`}>
            {t({ en: "EMI Calculator", he: "מחשבון EMI" })}
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Language flags */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => language !== "en" && toggleLanguage()}
              aria-label="Switch to English"
              className={`w-9 h-9 p-0.5 overflow-hidden ${
                language === "en" ? 'bg-white dark:bg-gray-600 shadow-sm' : 'bg-transparent'
              }`}
            >
              <img 
                src="https://flagcdn.com/w40/gb.png"
                alt="English"
                className={`w-full h-full object-cover ${language !== "en" ? 'opacity-70' : ''}`}
              />
            </Button>
            
            <Button
              variant={language === "he" ? "default" : "ghost"}
              size="sm"
              onClick={() => language !== "he" && toggleLanguage()}
              aria-label="Switch to Hebrew"
              className={`w-9 h-9 p-0.5 overflow-hidden ${
                language === "he" ? 'bg-white dark:bg-gray-600 shadow-sm' : 'bg-transparent'
              }`}
            >
              <img 
                src="https://flagcdn.com/w40/il.png"
                alt="עברית"
                className={`w-full h-full object-cover ${language !== "he" ? 'opacity-70' : ''}`}
              />
            </Button>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleSetting("nightMode")}
            aria-label={t({ 
              en: "Toggle theme", 
              he: "החלף ערכת נושא" 
            })}
            className={settings.nightMode ? 'text-white' : ''}
          >
            {settings.nightMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}