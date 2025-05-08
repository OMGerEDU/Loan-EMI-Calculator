import React, { useState } from "react";
import { useLanguage } from "../components/context/LanguageContext";
import HeroSection from "../components/layout/HeroSection";
import LoanCalculator from "../components/ui/LoanCalculator";
import LoanResults from "../components/ui/LoanResults";

export default function Home() {
  const { t } = useLanguage();
  const [results, setResults] = useState(null);
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        <LoanCalculator onResultsCalculated={setResults} />
        
        {results && <LoanResults results={results} />}
      </div>
    </div>
  );
}