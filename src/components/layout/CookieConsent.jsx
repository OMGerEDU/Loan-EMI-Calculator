import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already accepted cookies
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      // Show banner after a delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">
                {t({ en: "Cookie Notice", he: "הודעת עוגיות" })}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {t({ 
                  en: "We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.", 
                  he: "אנו משתמשים בעוגיות כדי לשפר את החוויה שלך. על ידי המשך השימוש באתר זה, אתה מסכים לשימוש שלנו בעוגיות." 
                })}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 self-end sm:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="text-gray-500"
            >
              {t({ en: "Decline", he: "דחה" })}
            </Button>
            <Button 
              size="sm"
              onClick={acceptCookies}
              className="bg-primary hover:bg-primary/90"
            >
              {t({ en: "Accept", he: "קבל" })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}