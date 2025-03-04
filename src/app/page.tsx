"use client"

import { TopBanner } from '@/components/ui/top-banner';
import CookieConsent from '@/components/ui/tracking-cookie';
import { Navbar } from '@/components/layout/navbar';
import { ButtonExpandDocs, ButtonExpandBrowser } from '@/components/ui/button-expand';

export default function Home() {

  return (
    <div className="relative min-h-screen bg-bg text-text overflow-hidden">
      {/* Top Banner */}
      <TopBanner />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 pt-16 md:py-12 md:pt-20 mb-24 relative">
        {/* Spacer to push content down */}
        <div className="h-[40px] md:h-[60px]"></div>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8">
          {/* Left Column - Hero Section */}
          <div className="w-full md:w-1/2 pt-4 md:pt-16 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-3 md:mb-4">
              Browser agents
              <div className="dark:text-[#FFDF00] text-[#FF073A] font-heading">at scale</div>
            </h1>
            <p className="text-base sm:text-lg mb-6 md:mb-8 text-text/70 max-w-md">
              Enable AI to browse the web for you and build complex automated workflows in minutes.
            </p>
            <div className="flex flex-wrap justify-start gap-3 md:gap-4">
              <ButtonExpandDocs />
              <ButtonExpandBrowser />
            </div>
          </div>

          {/* Right Column - Browser Demo
          <div className="w-full md:w-1/2 pt-8 md:pt-4 mt-4 md:mt-0">
            <div className="rounded-base border-2 border-border overflow-hidden shadow-shadow max-w-[500px] mx-auto md:mx-0 md:ml-auto">
              <div className="bg-bw p-1.5 sm:p-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1 sm:gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[5px] bg-[#FF073A]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[5px] bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[5px] bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-xs sm:text-sm text-text/70">app.supabrowser.com</div>
              </div>
              <div className="bg-bw p-4 sm:p-8 h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-black dark:text-white text-2xl sm:text-3xl md:text-4xl font-heading mb-2 md:mb-4">supabrowser.com</div>
                  <p className="text-black dark:text-white text-sm sm:text-base">Your browser code would run here</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Cookie Consent */}
        <CookieConsent />
      </div>
    </div>
  );
}
