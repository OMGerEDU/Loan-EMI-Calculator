

import React, { useEffect } from "react";
import { LanguageProvider } from "../components/context/LanguageContext";
import { AccessibilityProvider, useAccessibility } from "../components/context/AccessibilityContext";
import Navbar from "../components/layout/Navbar";
import AccessibilityMenu from "../components/layout/AccessibilityMenu";
import Footer from "../components/layout/Footer";
import CookieConsent from "../components/layout/CookieConsent";

// Wrapper to apply accessibility settings
function AccessibilityWrapper({ children }) {
  const { settings } = useAccessibility();

  return (
    <div className={`
      ${settings.nightMode ? "night-mode" : ""}
      ${settings.largeText ? "large-text" : ""}
      ${settings.focusOutlines ? "focus-outlines" : ""}
      ${settings.highlightLinks ? "highlight-links" : ""}
      ${settings.largeCursor ? "large-cursor" : ""}
      ${settings.reduceAnimations ? "reduce-animations" : ""}
    `}>
      {children}
    </div>
  );
}

// Main layout
export default function Layout({ children }) {
  // Apply custom styles based on accessibility and language settings
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <AccessibilityWrapper>
          {/* Apply global styles for accessibility */}
          <style jsx global>{`
            :root {
              --primary: #047857;
              --primary-light: #6EE7B7;
              --accent: #F59E0B;
              --text: #111827;
              --background: #FFFFFF;
              --background-secondary: #F9FAFB;
            }

            /* Night mode */
            .night-mode {
              --primary: #10B981;
              --primary-light: #065F46;
              --accent: #FBBF24;
              --text: #FFFFFF; /* Changed from #E5E7EB to full white */
              --background: #111827;
              --background-secondary: #1F2937;
              color-scheme: dark;
            }

            .night-mode {
              background-color: var(--background);
              color: var(--text);
            }

            .night-mode .bg-white {
              background-color: var(--background-secondary);
            }
            
            .night-mode .border {
              border-color: #374151;
            }

            .night-mode .text-gray-900 {
              color: #FFFFFF; /* Changed from #E5E7EB to full white */
            }
            
            .night-mode .text-gray-600,
            .night-mode .text-gray-500,
            .night-mode .text-gray-400 {
              color: #D1D5DB; /* Brightened for better visibility */
            }

            /* Focus outlines */
            .focus-outlines button:focus,
            .focus-outlines a:focus,
            .focus-outlines input:focus,
            .focus-outlines select:focus,
            .focus-outlines textarea:focus {
              outline: 3px solid var(--accent) !important;
              outline-offset: 2px !important;
            }

            /* Link highlighting */
            .highlight-links a:not(.no-highlight) {
              text-decoration: underline !important;
              font-weight: 500 !important;
              color: var(--primary) !important;
            }

            /* Large cursor */
            .large-cursor,
            .large-cursor * {
              cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>') 0 0, auto !important;
            }

            /* Reduce animations */
            .reduce-animations * {
              animation: none !important;
              transition: none !important;
            }

            /* RTL support */
            [dir="rtl"] .flex-row {
              flex-direction: row-reverse;
            }

            [dir="rtl"] .space-x-3 > * + * {
              margin-right: 0.75rem;
              margin-left: 0;
            }

            [dir="rtl"] .space-x-4 > * + * {
              margin-right: 1rem;
              margin-left: 0;
            }
          `}</style>

          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <AccessibilityMenu />
          <CookieConsent />
        </AccessibilityWrapper>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

