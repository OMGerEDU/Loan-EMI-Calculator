import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { Check } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const { settings } = useAccessibility();
  
  return (
    <section className="py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 
              className={`text-4xl md:text-5xl font-bold text-gray-900 ${
                settings.largeText ? "text-5xl md:text-6xl" : ""
              }`}
            >
              {t({ 
                en: "Instant EMI Calculator", 
                he: "מחשבון EMI מידי" 
              })}
            </h1>
            
            <p className={`text-xl text-gray-600 ${settings.largeText ? "text-2xl" : ""}`}>
              {t({ 
                en: "Plan your loan with confidence. Calculate monthly payments, view amortization schedules, and make informed financial decisions.", 
                he: "תכנן את ההלוואה שלך בביטחון. חשב תשלומים חודשיים, צפה בלוחות סילוקין וקבל החלטות פיננסיות מושכלות." 
              })}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">
                  {t({ 
                    en: "Fast and accurate EMI calculations", 
                    he: "חישובי EMI מהירים ומדויקים" 
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">
                  {t({ 
                    en: "Detailed amortization schedule", 
                    he: "לוח סילוקין מפורט" 
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">
                  {t({ 
                    en: "Visual breakdown of loan components", 
                    he: "פירוט חזותי של מרכיבי ההלוואה" 
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:flex hidden justify-center">
            <img 
              src="https://images.unsplash.com/photo-1638913662295-9630035ef770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
              alt={t({ en: "Loan calculator illustration", he: "איור מחשבון הלוואות" })}
              className="rounded-lg shadow-xl max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}