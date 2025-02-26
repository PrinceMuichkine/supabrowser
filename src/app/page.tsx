import Link from 'next/link';
import { Globe, BookOpen, Zap, Shield, Database, BrainCircuit, ShieldCheck, Layers } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-bg text-text">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-heading mb-6 bg-gradient-to-r from-main via-[#c4e6ff] to-[#c8f7c5] text-transparent bg-clip-text">
          Browser Infrastructure for your AI Apps and Agents
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-text/70">
          supabrowser is a platform for running and scaling headless browsers in secure, isolated containers. Built for web automation and AI-driven use cases.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/browser"
            className="px-8 py-3 bg-main text-mtext font-heading rounded-base flex items-center gap-2 hover:translate-y-[-2px] transition-all shadow-shadow hover:shadow-none"
          >
            Launch Browser <Zap className="h-5 w-5" />
          </Link>
          <Link
            href="/docs"
            className="px-8 py-3 bg-bw border-2 border-border text-text font-heading rounded-base flex items-center gap-2 hover:translate-y-[-2px] transition-all shadow-shadow hover:shadow-none"
          >
            View Docs <BookOpen className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Browser Demo Section */}
      <div className="w-full max-w-6xl mx-auto mb-24">
        <div className="rounded-base border-2 border-border overflow-hidden shadow-shadow">
          <div className="bg-bw p-2 flex items-center gap-2 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm text-text/70">app.supabrowser.com</div>
          </div>
          <div className="bg-bw p-4 h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-main text-6xl font-heading mb-4">supabrowser.com</div>
              <p className="text-text/70">Your browser code would run here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="text-center">
          <div className="text-5xl font-heading mb-2">&lt; 500ms</div>
          <div className="text-text/70 uppercase tracking-wider">START TIME</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-heading mb-2">100k+</div>
          <div className="text-text/70 uppercase tracking-wider">SESSIONS</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-heading mb-2">1M+</div>
          <div className="text-text/70 uppercase tracking-wider">PAGES SCRAPED</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-heading text-center mb-4">What you can build with supabrowser</h2>
        <p className="text-xl text-center text-text/70 mb-12">
          From web scraping to AI-driven interactions, discover how supabrowser powers your most complex workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-main" />
                Browser Automation
              </CardTitle>
              <CardDescription className="text-text/70">
                Run headless browsers to automate tasks like web scraping, testing, and form filling.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-400" />
                Data Extraction
              </CardTitle>
              <CardDescription className="text-text/70">
                Use browsers to scrape and structure web data at scale for analysis and insights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-purple-400" />
                AI Agent Operations
              </CardTitle>
              <CardDescription className="text-text/70">
                Integrate with AI agents to enable browsing, data collection, and interaction with web apps.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Captcha Handling
              </CardTitle>
              <CardDescription className="text-text/70">
                Automatically solve captchas to streamline automation workflows.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-green-400" />
                Stealth Browsing
              </CardTitle>
              <CardDescription className="text-text/70">
                Operate browsers in stealth mode to bypass bot detection and stay undetected.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-bw border-border text-text">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-orange-400" />
                Session Management
              </CardTitle>
              <CardDescription className="text-text/70">
                Manage browser sessions with logging, debugging, and secure resource isolation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-bw border-2 border-border rounded-base p-8 flex flex-col md:flex-row items-center justify-between shadow-shadow">
          <div>
            <div className="bg-main text-mtext p-2 w-12 h-12 flex items-center justify-center rounded-base mb-4 shadow-shadow">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-3xl font-heading mb-2">Get started today!</h3>
            <p className="text-text/70">Launch your browser in seconds. No credit card required.</p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
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
      </div>
    </main>
  );
}
