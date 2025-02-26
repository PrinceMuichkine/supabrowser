"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Bookmark, Settings, Clock, Globe, SquareDashedBottomCode } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardPage() {
    return (
        <div className="relative min-h-screen bg-bg text-text overflow-hidden">
            <div className="container mx-auto px-4 py-4 pt-8 md:py-6 md:pt-12 mb-24 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-[5px] flex items-center justify-center bg-iconBg-dashboard dark:bg-darkIconBg-dashboard mr-4">
                            <SquareDashedBottomCode className="h-6 w-6 text-iconColor-dashboard dark:text-darkIconColor-dashboard" />
                        </div>
                        <h1 className="text-4xl font-heading">Dashboard</h1>
                    </div>

                    <Tabs defaultValue="history" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="history" className="flex items-center gap-2 text-text">
                                <History className="h-4 w-4" />
                                <span className="hidden sm:inline">History</span>
                            </TabsTrigger>
                            <TabsTrigger value="bookmarks" className="flex items-center gap-2 text-text">
                                <Bookmark className="h-4 w-4" />
                                <span className="hidden sm:inline">Bookmarks</span>
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex items-center gap-2 text-text">
                                <Settings className="h-4 w-4" />
                                <span className="hidden sm:inline">Settings</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="history">
                            <Card className="bg-bw border-border">
                                <CardHeader>
                                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-text">
                                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                                            <History className="h-5 w-5 text-main" />
                                            Browsing History
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                            <Input
                                                placeholder="Search history..."
                                                className="w-full sm:w-64 text-text"
                                            />
                                            <Button variant="outline" size="sm" className="mt-2 sm:mt-0 text-text">
                                                Clear All
                                            </Button>
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="text-text/70">
                                        View and manage your browsing history
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Sample history items */}
                                        {[1, 2, 3, 4, 5].map((item) => (
                                            <div key={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-base hover:bg-bg">
                                                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                                    <Globe className="h-5 w-5 text-text/70" />
                                                    <div>
                                                        <div className="font-base text-text">Example Website {item}</div>
                                                        <div className="text-sm text-text/70">https://example.com/page{item}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 ml-8 sm:ml-0">
                                                    <div className="flex items-center text-sm text-text/70">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {item} hour{item !== 1 ? 's' : ''} ago
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Bookmark className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="bookmarks">
                            <Card className="bg-bw border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-text">
                                        <Bookmark className="h-5 w-5 text-main" />
                                        Bookmarks
                                    </CardTitle>
                                    <CardDescription className="text-text/70">
                                        Manage your saved bookmarks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Sample bookmark items */}
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-base hover:bg-bg">
                                                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                                    <Globe className="h-5 w-5 text-text/70" />
                                                    <div>
                                                        <div className="font-base text-text">Bookmarked Site {item}</div>
                                                        <div className="text-sm text-text/70">https://bookmark{item}.com</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 ml-8 sm:ml-0">
                                                    <Button variant="outline" size="sm" className="text-text">
                                                        Visit
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-[#FF073A]">
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card className="bg-bw border-border">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-text">
                                        <Settings className="h-5 w-5 text-main" />
                                        Browser Settings
                                    </CardTitle>
                                    <CardDescription className="text-text/70">
                                        Customize your browser experience
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="grid gap-2">
                                            <h3 className="text-lg font-heading text-text">General</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-base text-text">Default Search Engine</label>
                                                    <select className="w-full p-2 rounded-base border-2 border-border bg-bw text-text">
                                                        <option>Google</option>
                                                        <option>Bing</option>
                                                        <option>DuckDuckGo</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-base text-text">Homepage</label>
                                                    <Input defaultValue="https://supabrowser.com" className="text-text" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <h3 className="text-lg font-heading text-text">Privacy</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-base text-text">Clear browsing data on exit</label>
                                                    <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-base text-text">Block third-party cookies</label>
                                                    <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" defaultChecked />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-base text-text">Do Not Track</label>
                                                    <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" className="text-text">Reset to Default</Button>
                                            <Button>Save Settings</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Navigation */}
            <Navbar />
        </div>
    );
} 