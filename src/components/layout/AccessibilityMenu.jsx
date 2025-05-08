import React, { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Accessibility,
  Eye,
  Type,
  Link as LinkIcon,
  MousePointer,
  Moon,
  ZapOff,
  X 
} from "lucide-react";

export default function AccessibilityMenu() {
  const { t, direction } = useLanguage();
  const { settings, toggleSetting, isMenuOpen, toggleMenu, closeMenu } = useAccessibility();
  const menuRef = useRef(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMenu]);

  return (
    <>
      {/* Accessibility Button */}
      <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
        <SheetTrigger asChild>
          <Button
            aria-label={t({ en: "Accessibility Menu", he: "תפריט נגישות" })}
            className="fixed left-4 bottom-4 z-40 rounded-full w-12 h-12 shadow-lg bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Accessibility className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
          side={direction === "rtl" ? "right" : "left"}
          className={`w-80 ${direction}`}
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-primary" />
              {t({ en: "Accessibility Options", he: "אפשרויות נגישות" })}
            </SheetTitle>
            <SheetDescription>
              {t({ 
                en: "Customize your viewing experience", 
                he: "התאם את חווית הצפייה שלך" 
              })}
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 py-6">
            {/* Focus Outlines */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Eye className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="focus-outlines" className="text-sm font-medium">
                    {t({ en: "Focus Outlines", he: "מתאר מיקוד" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Show outlines on focused elements", 
                      he: "הצג מתארים על אלמנטים ממוקדים" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="focus-outlines"
                checked={settings.focusOutlines}
                onCheckedChange={() => toggleSetting("focusOutlines")}
              />
            </div>
            
            {/* Large Text */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Type className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="large-text" className="text-sm font-medium">
                    {t({ en: "Large Text", he: "טקסט גדול" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Increase text size for better readability", 
                      he: "הגדל את גודל הטקסט לקריאות טובה יותר" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="large-text"
                checked={settings.largeText}
                onCheckedChange={() => toggleSetting("largeText")}
              />
            </div>
            
            {/* Highlight Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <LinkIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="highlight-links" className="text-sm font-medium">
                    {t({ en: "Highlight Links", he: "הדגש קישורים" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Make links more visible with highlighting", 
                      he: "הפוך קישורים לנראים יותר עם הדגשה" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="highlight-links"
                checked={settings.highlightLinks}
                onCheckedChange={() => toggleSetting("highlightLinks")}
              />
            </div>
            
            {/* Large Cursor */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <MousePointer className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="large-cursor" className="text-sm font-medium">
                    {t({ en: "Large Cursor", he: "סמן גדול" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Use a larger cursor for easier visibility", 
                      he: "השתמש בסמן גדול יותר לנראות קלה יותר" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="large-cursor"
                checked={settings.largeCursor}
                onCheckedChange={() => toggleSetting("largeCursor")}
              />
            </div>
            
            {/* Night Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Moon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="night-mode" className="text-sm font-medium">
                    {t({ en: "Night Mode", he: "מצב לילה" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Use a darker theme for reduced eye strain", 
                      he: "השתמש בערכת נושא כהה יותר להפחתת מאמץ העיניים" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="night-mode"
                checked={settings.nightMode}
                onCheckedChange={() => toggleSetting("nightMode")}
              />
            </div>
            
            {/* Reduce Animations */}
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <ZapOff className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <Label htmlFor="reduce-animations" className="text-sm font-medium">
                    {t({ en: "Reduce Animations", he: "הפחת אנימציות" })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({ 
                      en: "Turn off animations for reduced motion", 
                      he: "כבה אנימציות להפחתת תנועה" 
                    })}
                  </p>
                </div>
              </div>
              <Switch
                id="reduce-animations"
                checked={settings.reduceAnimations}
                onCheckedChange={() => toggleSetting("reduceAnimations")}
              />
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">
                {t({ en: "Close", he: "סגור" })}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}