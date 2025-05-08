import React, { createContext, useContext, useState, useEffect } from "react";
import { AccessibilitySettings } from "@/api/entities";
import { User } from "@/api/entities";

// Create accessibility context
const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    focusOutlines: false,
    largeText: false,
    highlightLinks: false,
    largeCursor: false,
    nightMode: false,
    reduceAnimations: false
  });

  // Load settings from user data
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const user = await User.me();
        if (user.accessibilitySettings) {
          setSettings(user.accessibilitySettings);
        }
      } catch (error) {
        // User not logged in or no settings saved
        const savedSettings = localStorage.getItem("accessibilitySettings");
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      }
    };

    loadSettings();
  }, []);

  // Save settings
  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("accessibilitySettings", JSON.stringify(newSettings));
    
    try {
      const user = await User.me();
      await User.updateMyUserData({ accessibilitySettings: newSettings });
    } catch (error) {
      // User not logged in, just save to localStorage
    }
  };

  // Toggle a specific setting
  const toggleSetting = (setting) => {
    const newSettings = {
      ...settings,
      [setting]: !settings[setting]
    };
    saveSettings(newSettings);
  };

  // Toggle the accessibility menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AccessibilityContext.Provider 
      value={{ 
        settings, 
        toggleSetting, 
        isMenuOpen, 
        toggleMenu,
        closeMenu: () => setIsMenuOpen(false)
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

// Custom hook for using the accessibility context
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}