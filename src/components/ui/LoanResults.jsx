
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAccessibility } from "../context/AccessibilityContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { ArrowDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LoanResults({ results }) {
  const { t, language, direction } = useLanguage();
  const { settings } = useAccessibility();

  // Define colors based on theme
  const COLORS = settings.nightMode 
    ? ['#059669', '#F59E0B'] // Dark mode colors
    : ['#047857', '#D97706']; // Light mode colors

  if (!results) return null;

  const monthlyPayment = results.monthlyPayment;
  const totalPayment = results.totalPayment;
  const totalInterest = results.totalInterest;
  
  // Create data for pie chart
  const pieData = [
    {
      name: t({ en: 'Principal', he: 'קרן' }),
      value: results.principal
    },
    {
      name: t({ en: 'Interest', he: 'ריבית' }),
      value: results.totalInterest
    }
  ];

  // Get the first 12 months for the initial view
  const initialSchedule = results.schedule.slice(0, 12);

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <Card className={`shadow-lg ${settings.nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`${settings.nightMode ? 'text-gray-100' : 'text-primary'} ${settings.largeText ? "text-3xl" : "text-2xl"}`}>
            {t({ en: "Loan Summary", he: "סיכום הלוואה" })}
          </CardTitle>
          <CardDescription className={settings.nightMode ? 'text-gray-400' : 'text-gray-600'}>
            {t({ 
              en: "Based on your inputs, here's a breakdown of your loan", 
              he: "בהתבסס על הנתונים שהזנת, להלן פירוט ההלוואה שלך" 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${
                settings.nightMode 
                  ? 'bg-emerald-900/30 border-emerald-800 text-emerald-300' 
                  : 'bg-green-50 border-green-100 text-green-600'
              }`}>
                <p className="text-sm">
                  {t({ en: "Monthly EMI", he: "החזר חודשי" })}
                </p>
                <p className={`font-bold ${settings.largeText ? "text-3xl" : "text-2xl"}`}>
                  ₪{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${
                  settings.nightMode 
                    ? 'bg-gray-900/50 border-gray-700 text-gray-300' 
                    : 'bg-gray-50 border-gray-100 text-gray-600'
                }`}>
                  <p className="text-sm">
                    {t({ en: "Total Principal", he: "סך הקרן" })}
                  </p>
                  <p className={`font-semibold ${settings.largeText ? "text-xl" : "text-lg"}`}>
                    ₪{results.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  settings.nightMode 
                    ? 'bg-amber-900/30 border-amber-800 text-amber-300' 
                    : 'bg-amber-50 border-amber-100 text-amber-600'
                }`}>
                  <p className="text-sm">
                    {t({ en: "Total Interest", he: "סך הריבית" })}
                  </p>
                  <p className={`font-semibold ${settings.largeText ? "text-xl" : "text-lg"}`}>
                    ₪{results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
                
                <div className={`col-span-2 p-4 rounded-lg border ${
                  settings.nightMode 
                    ? 'bg-blue-900/30 border-blue-800 text-blue-300' 
                    : 'bg-blue-50 border-blue-100 text-blue-600'
                }`}>
                  <p className="text-sm">
                    {t({ en: "Total Payment", he: "סך כל התשלום" })}
                  </p>
                  <p className={`font-semibold ${settings.largeText ? "text-xl" : "text-lg"}`}>
                    ₪{results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₪${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: settings.nightMode ? '#1f2937' : '#fff',
                      border: `1px solid ${settings.nightMode ? '#374151' : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      color: settings.nightMode ? '#e5e7eb' : '#111827'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className={`${settings.largeText ? "text-base" : "text-sm"} ${
                        settings.nightMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amortization Table */}
      <Card className={`shadow-lg ${settings.nightMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardHeader>
          <CardTitle className={`${settings.nightMode ? 'text-gray-100' : 'text-gray-900'} ${settings.largeText ? "text-2xl" : "text-xl"}`}>
            {t({ en: "Amortization Schedule", he: "לוח סילוקין" })}
          </CardTitle>
          <CardDescription className={settings.nightMode ? 'text-gray-400' : 'text-gray-600'}>
            {t({ 
              en: "Month-by-month breakdown of your loan payments", 
              he: "פירוט חודשי של תשלומי ההלוואה שלך" 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className={settings.nightMode ? 'text-gray-400' : 'text-gray-500'}>
                {t({ 
                  en: "Showing first year of payments. Expand below to see full schedule.", 
                  he: "מציג את השנה הראשונה של התשלומים. הרחב למטה כדי לראות את הלוח המלא." 
                })}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Month", he: "חודש" })}</TableHead>
                  <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "EMI", he: "החזר חודשי" })}</TableHead>
                  <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Principal", he: "קרן" })}</TableHead>
                  <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Interest", he: "ריבית" })}</TableHead>
                  <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Balance", he: "יתרה" })}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialSchedule.map((payment) => (
                  <TableRow key={payment.month} className={settings.nightMode ? 'bg-gray-700 border-gray-600' : ''}>
                    <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>{payment.month}</TableCell>
                    <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                    <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="full-schedule">
              <AccordionTrigger className={`text-primary ${settings.nightMode ? 'hover:text-emerald-300' : ''}`}>
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  {t({ en: "View Full Amortization Schedule", he: "צפה בלוח הסילוקין המלא" })}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Month", he: "חודש" })}</TableHead>
                        <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "EMI", he: "החזר חודשי" })}</TableHead>
                        <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Principal", he: "קרן" })}</TableHead>
                        <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Interest", he: "ריבית" })}</TableHead>
                        <TableHead className={settings.nightMode ? 'text-gray-300' : 'text-gray-700'}>{t({ en: "Balance", he: "יתרה" })}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.schedule.map((payment) => (
                        <TableRow key={payment.month} className={settings.nightMode ? 'bg-gray-700 border-gray-600' : ''}>
                          <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>{payment.month}</TableCell>
                          <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                          <TableCell className={settings.nightMode ? 'text-gray-200' : 'text-gray-500'}>₪{payment.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      {/* Tips Section */}
      <Card className={`shadow-lg ${settings.nightMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
        <CardHeader>
          <CardTitle className={`${settings.nightMode ? 'text-gray-100' : 'text-gray-900'} ${settings.largeText ? "text-2xl" : "text-xl"}`}>
            {t({ en: "Pro Tips to Lower Your Interest", he: "טיפים מקצועיים להורדת הריבית שלך" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg shadow-sm ${settings.nightMode ? 'bg-gray-700 text-gray-300' : 'bg-white'}`}>
              <h3 className="font-semibold text-primary mb-2">
                {t({ en: "Improve Your Credit Score", he: "שפר את דירוג האשראי שלך" })}
              </h3>
              <p className="text-sm text-gray-600">
                {t({ 
                  en: "A higher credit score can help you qualify for lower interest rates. Pay bills on time and reduce existing debt.", 
                  he: "דירוג אשראי גבוה יותר יכול לעזור לך להיות זכאי לשיעורי ריבית נמוכים יותר. שלם חשבונות בזמן והפחת חובות קיימים."
                })}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg shadow-sm ${settings.nightMode ? 'bg-gray-700 text-gray-300' : 'bg-white'}`}>
              <h3 className="font-semibold text-primary mb-2">
                {t({ en: "Make a Larger Down Payment", he: "בצע מקדמה גדולה יותר" })}
              </h3>
              <p className="text-sm text-gray-600">
                {t({ 
                  en: "A larger down payment reduces the loan amount, which may qualify you for a lower interest rate and reduces total interest paid.", 
                  he: "מקדמה גדולה יותר מפחיתה את סכום ההלוואה, מה שעשוי להביא אותך לשיעור ריבית נמוך יותר ומפחית את סך הריבית המשולמת."
                })}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg shadow-sm ${settings.nightMode ? 'bg-gray-700 text-gray-300' : 'bg-white'}`}>
              <h3 className="font-semibold text-primary mb-2">
                {t({ en: "Shop Around for Lenders", he: "חפש בין מלווים שונים" })}
              </h3>
              <p className="text-sm text-gray-600">
                {t({ 
                  en: "Different lenders offer different rates. Get quotes from multiple lenders to find the best rate available to you.", 
                  he: "מלווים שונים מציעים שיעורים שונים. קבל הצעות ממספר מלווים כדי למצוא את השיעור הטוב ביותר הזמין עבורך."
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
