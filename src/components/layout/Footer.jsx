import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowUp, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} OMGerEDU
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t({ 
                en: "All calculations are approximate and may vary from actual loan terms.", 
                he: "כל החישובים הם משוערים ועשויים להשתנות מתנאי ההלוואה בפועל." 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/OMGerEDU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            <a 
              href="https://linkedin.com/in/omger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={scrollToTop}
              aria-label={t({ en: "Back to top", he: "חזרה למעלה" })}
              className="flex items-center gap-1"
            >
              <ArrowUp className="h-4 w-4" />
              {t({ en: "Top", he: "למעלה" })}
            </Button>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400 text-center">
          {t({ 
            en: "This calculator is for informational purposes only. Contact financial institutions for accurate loan information.", 
            he: "מחשבון זה הוא למטרות מידע בלבד. צור קשר עם מוסדות פיננסיים לקבלת מידע מדויק על הלוואות." 
          })}
        </div>
      </div>
    </footer>
  );
}