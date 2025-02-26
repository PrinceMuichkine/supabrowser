import Link from 'next/link';
import { Globe, BookOpen, Zap, Database, BrainCircuit } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopBanner } from '@/components/ui/top-banner';
import CookieConsent from '@/components/ui/tracking-cookie';
import { Navbar } from '@/components/layout/navbar';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      {/* Top Banner */}
      <TopBanner />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left Column - Hero Section */}
          <div className="w-full md:w-1/2 pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4">
              Browser Infrastructure for
              <div className="text-main font-heading">AI Apps</div>
            </h1>
            <p className="text-lg mb-8 text-text/70 max-w-md">
              supabrowser is a platform for running and scaling headless browsers in secure, isolated containers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/browser"
                className="px-6 py-3 bg-main text-mtext font-heading rounded-base flex items-center gap-2 hover:translate-y-[-2px] transition-all shadow-shadow hover:shadow-none"
              >
                Launch Browser <Zap className="h-5 w-5" />
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3 bg-bw border-2 border-border text-text font-heading rounded-base flex items-center gap-2 hover:translate-y-[-2px] transition-all shadow-shadow hover:shadow-none"
              >
                View Docs <BookOpen className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Browser Demo */}
          <div className="w-full md:w-1/2 pt-4">
            <div className="rounded-base border-2 border-border overflow-hidden shadow-shadow">
              <div className="bg-bw p-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-sm text-text/70">app.supabrowser.com</div>
              </div>
              <div className="bg-bw p-8 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-main text-4xl font-heading mb-4">supabrowser.com</div>
                  <p className="text-text/70">Your browser code would run here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-heading text-center mb-10">What you can build</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-bw border-border text-text">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-main" />
                  Browser Automation
                </CardTitle>
                <CardDescription className="text-text/70">
                  Run headless browsers to automate tasks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-bw border-border text-text">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-blue-400" />
                  Data Extraction
                </CardTitle>
                <CardDescription className="text-text/70">
                  Scrape and structure web data at scale
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-bw border-border text-text">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-6 w-6 text-purple-400" />
                  AI Agent Operations
                </CardTitle>
                <CardDescription className="text-text/70">
                  Enable AI agents to browse the web
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>


        {/* Navigation */}
        <Navbar />

        {/* Cookie Consent */}
        <CookieConsent />
      </div>
    </div>
  );
}
