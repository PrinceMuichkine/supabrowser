"use client"

import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Bookmark, History, Settings, RefreshCw, ArrowLeft, ArrowRight as ArrowRightIcon, Home } from 'lucide-react';
import { Navbar } from "@/components/layout/navbar";

export default function BrowserPage() {
    return (
        <div className="relative min-h-screen bg-bg text-text overflow-hidden">
            <div className="container mx-auto px-4 py-4 pt-8 md:py-6 md:pt-12 mb-24 relative">
                <div className="flex flex-col h-[calc(100vh-200px)] bg-bg text-text rounded-base border-2 border-border shadow-shadow overflow-hidden">
                    {/* Browser Chrome */}
                    <div className="border-b-2 border-border p-2 bg-bw">
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex gap-2">
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <ArrowRightIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <Home className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex-1 flex items-center">
                                <div className="w-full relative">
                                    <Input
                                        className="w-full bg-bw border-border rounded-base pl-4 pr-10 py-2 text-sm text-text"
                                        placeholder="Enter URL or search"
                                        defaultValue="https://supabrowser.com"
                                    />
                                    <Button
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-[5px] bg-main text-white p-0"
                                        size="icon"
                                    >
                                        <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="hidden sm:flex gap-2">
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <History className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-text/70 hover:text-text">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b-2 border-border bg-bg">
                        <div className="flex items-center">
                            <Tabs defaultValue="tab1" className="w-full">
                                <TabsList className="bg-transparent h-10">
                                    <TabsTrigger
                                        value="tab1"
                                        className="data-[state=active]:bg-bw data-[state=active]:border-t-2 data-[state=active]:border-t-main rounded-none px-4 h-10 text-text"
                                    >
                                        supabrowser.com
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tab2"
                                        className="data-[state=active]:bg-bw data-[state=active]:border-t-2 data-[state=active]:border-t-main rounded-none px-4 h-10 text-text"
                                    >
                                        New Tab
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Button variant="ghost" size="icon" className="text-text/70 hover:text-text mr-2">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Browser Content */}
                    <div className="flex-1 bg-white">
                        <iframe
                            src="https://supabrowser.com"
                            className="w-full h-full border-none"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            title="Browser Content"
                        />
                    </div>

                    {/* Status Bar */}
                    <div className="border-t-2 border-border p-2 bg-bw text-text/70 text-xs flex justify-between">
                        <div>Connected to supabrowser.com</div>
                        <div className="hidden sm:block">Session ID: 12345678</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <Navbar />
        </div>
    );
} 