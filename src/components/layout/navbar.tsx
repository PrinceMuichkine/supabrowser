"use client"

import { FloatingDock } from "@/components/ui/dock"
import { Github, Home, Layers, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

export const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), [])

    const navItems = [
        {
            title: "Home",
            icon: <Home className="h-[75%] w-[75%]" />,
            href: "/",
            bgColor: "bg-iconBg-home dark:bg-darkIconBg-home",
            iconColor: "text-iconColor-home dark:text-darkIconColor-home"
        },
        {
            title: "Dashboard",
            icon: <Layers className="h-[75%] w-[75%]" />,
            href: "/dashboard",
            bgColor: "bg-iconBg-browser dark:bg-darkIconBg-browser",
            iconColor: "text-iconColor-browser dark:text-darkIconColor-browser"
        },
        {
            title: "Supabrowser",
            icon: (
                <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-[5px]">
                    <Image
                        src={theme === 'dark' ? "/images/icon.png" : "/images/icon-red.png"}
                        alt="Supabrowser Logo"
                        width={120}
                        height={120}
                        className="object-contain w-[130%] h-[130%]"
                        priority
                    />
                </div>
            ),
            href: "/",
            bgColor: "bg-transparent dark:bg-transparent",
            iconColor: "text-transparent dark:text-transparent"
        },
        {
            title: "GitHub",
            icon: <Github className="h-[75%] w-[75%]" />,
            href: "https://github.com/supabrowser/supabrowser",
            bgColor: "bg-iconBg-github dark:bg-darkIconBg-github",
            iconColor: "text-iconColor-github dark:text-darkIconColor-github"
        },
        {
            title: mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Toggle Theme',
            icon: mounted ? (
                theme === 'dark' ? (
                    <Sun className="h-[75%] w-[75%]" />
                ) : (
                    <Moon className="h-[75%] w-[75%]" />
                )
            ) : null,
            href: "#",
            bgColor: "bg-iconBg-theme dark:bg-darkIconBg-theme",
            iconColor: "text-iconColor-theme dark:text-darkIconColor-theme",
            onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark')
        }
    ]

    return (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform hidden md:block">
            <FloatingDock items={navItems} desktopClassName="border-2 border-border shadow-shadow" />
        </div>
    )
} 