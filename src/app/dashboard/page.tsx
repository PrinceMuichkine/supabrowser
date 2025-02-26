import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Bookmark, Settings, Clock, Globe } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-10 px-4 bg-bg text-text">
            <h1 className="text-4xl font-heading mb-8">Dashboard</h1>

            <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="history" className="flex items-center gap-2">
                        <History className="h-4 w-4" />
                        History
                    </TabsTrigger>
                    <TabsTrigger value="bookmarks" className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        Bookmarks
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="h-5 w-5 text-main" />
                                    Browsing History
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="Search history..."
                                        className="w-64"
                                    />
                                    <Button variant="outline" size="sm">
                                        Clear All
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                View and manage your browsing history
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Sample history items */}
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="flex items-center justify-between p-3 rounded-base hover:bg-bg">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-text/70" />
                                            <div>
                                                <div className="font-base">Example Website {item}</div>
                                                <div className="text-sm text-text/70">https://example.com/page{item}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bookmark className="h-5 w-5 text-main" />
                                Bookmarks
                            </CardTitle>
                            <CardDescription>
                                Manage your saved bookmarks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Sample bookmark items */}
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center justify-between p-3 rounded-base hover:bg-bg">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-text/70" />
                                            <div>
                                                <div className="font-base">Bookmarked Site {item}</div>
                                                <div className="text-sm text-text/70">https://bookmark{item}.com</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                Visit
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-500">
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5 text-main" />
                                Browser Settings
                            </CardTitle>
                            <CardDescription>
                                Customize your browser experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="grid gap-2">
                                    <h3 className="text-lg font-heading">General</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-base">Default Search Engine</label>
                                            <select className="w-full p-2 rounded-base border-2 border-border bg-bw">
                                                <option>Google</option>
                                                <option>Bing</option>
                                                <option>DuckDuckGo</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-base">Homepage</label>
                                            <Input defaultValue="https://supabrowser.com" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <h3 className="text-lg font-heading">Privacy</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-base">Clear browsing data on exit</label>
                                            <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-base">Block third-party cookies</label>
                                            <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-base">Do Not Track</label>
                                            <input type="checkbox" className="h-4 w-4 rounded-base border-2 border-border" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Reset to Default</Button>
                                    <Button>Save Settings</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 