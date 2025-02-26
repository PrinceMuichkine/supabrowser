"use client"

import { Github, Home, BookOpen, LayoutDashboard, Globe } from "lucide-react"
import { FloatingDock } from "../ui/dock"

export function Navbar() {
    const navItems = [
        {
            title: "Home",
            href: "/",
            icon: <Home className="h-6 w-6" />,
        },
        {
            title: "Browser",
            href: "/browser",
            icon: <Globe className="h-6 w-6" />,
        },
        {
            title: "Docs",
            href: "/docs",
            icon: <BookOpen className="h-6 w-6" />,
        },
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="h-6 w-6" />,
        },
        {
            title: "GitHub",
            href: "https://github.com/PrinceMuichkine/supabrowser",
            icon: <Github className="h-6 w-6" />,
        },
    ]

    return (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
            <FloatingDock
                items={navItems}
                desktopClassName="border-2 border-border shadow-shadow bg-bw"
            />
        </div>
    )
} 