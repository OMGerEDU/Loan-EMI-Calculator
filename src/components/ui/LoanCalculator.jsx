
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import { HelpCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoanCalculator({ onResultsCalculated }) {
  const { t, direction } = useLanguage();
  const { settings } = useAccessibility();
  
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(10);
  const [loading, setLoading] = useState(false);

  // Function to calculate EMI
  const calculateEMI = async () => {
    setLoading(true);
    try {
      // Calculate EMI
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
      const time = parseFloat(loanTerm) * 12; // Total months
      
      // Calculate EMI: P * r * (1+r)^n / ((1+r)^n – 1)
      const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalPayment = emi * time;
      const totalInterest = totalPayment - principal;
      
      // Create amortization schedule
      const schedule = [];
      let balance = principal;
      
      for (let month = 1; month <= time; month++) {
        const interestPayment = balance * rate;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;
        
        schedule.push({
          month,
          emi: emi,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance > 0 ? balance : 0,
        });
      }
      
      // Pass results to parent component
      onResultsCalculated({
        monthlyPayment: emi,
        totalPayment,
        totalInterest,
        schedule,
        principal
      });
    } catch (error) {
      console.error("Error calculating EMI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className={`shadow-lg ${settings.nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`${settings.nightMode ? 'text-gray-100' : 'text-primary'} text-2xl ${settings.largeText ? "text-3xl" : ""}`}>
            {t({ en: "EMI Calculator", he: "מחשבון EMI" })}
          </CardTitle>
          <CardDescription className={settings.nightMode ? 'text-gray-400' : 'text-gray-600'}>
            {t({ 
              en: "Calculate your monthly loan payments and view amortization schedule", 
              he: "חשב את תשלומי ההלוואה החודשיים שלך וצפה בלוח סילוקין"
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-amount" className={`${settings.largeText ? "text-lg" : ""} ${settings.nightMode ? 'text-gray-200' : ''}`}>
                {t({ en: "Loan Amount (₪)", he: "סכום הלוואה (₪)" })}
              </Label>
              <span className="text-primary font-medium">{loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider 
                id="loan-amount"
                min={10000}
                max={1000000}
                step={10000}
                value={[loanAmount]}
                onValueChange={(vals) => setLoanAmount(vals[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value) || 0)}
                className="w-24"
                min={10000}
                max={1000000}
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Label htmlFor="interest-rate" className={`${settings.largeText ? "text-lg" : ""} ${settings.nightMode ? 'text-gray-200' : ''}`}>
                  {t({ en: "Annual Interest Rate (%)", he: "ריבית שנתית (%)" })}
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full p-0">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Interest rate info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {t({ 
                          en: "Annual interest rate is the rate charged by the lender for borrowing the money, expressed as a percentage of the loan amount.", 
                          he: "שיעור הריבית השנתי הוא השיעור שגובה המלווה עבור השאלת הכסף, מבוטא כאחוז מסכום ההלוואה."
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-primary font-medium">{interestRate}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider 
                id="interest-rate"
                min={0.1}
                max={20}
                step={0.1}
                value={[interestRate]}
                onValueChange={(vals) => setInterestRate(vals[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-24"
                min={0.1}
                max={20}
                step={0.1}
              />
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-term" className={`${settings.largeText ? "text-lg" : ""} ${settings.nightMode ? 'text-gray-200' : ''}`}>
                {t({ en: "Loan Term (Years)", he: "תקופת ההלוואה (שנים)" })}
              </Label>
              <span className="text-primary font-medium">{loanTerm} {t({ en: "years", he: "שנים" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider 
                id="loan-term"
                min={1}
                max={30}
                step={1}
                value={[loanTerm]}
                onValueChange={(vals) => setLoanTerm(vals[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
                className="w-24"
                min={1}
                max={30}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
        <Button
          onClick={calculateEMI}
          className={`w-full ${
            settings.nightMode 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-primary hover:bg-primary/90 text-black'
          }`}
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-b-2 rounded-full" />
              {t({ en: "Calculating...", he: "מחשב..." })}
            </>
          ) : (
            t({ en: "Calculate EMI", he: "חשב החזר חודשי" })
          )}
        </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
