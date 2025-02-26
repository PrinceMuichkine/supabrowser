"use client"

import { FloatingDock } from "@/components/ui/dock"
import { Home, Moon, Rabbit, SquarePercent, Sun, BookOpen, PackageOpen, SquareDashedBottomCode } from "lucide-react"
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
            icon: <SquareDashedBottomCode className="h-[75%] w-[75%]" />,
            href: "/dashboard",
            bgColor: "bg-iconBg-dashboard dark:bg-darkIconBg-dashboard",
            iconColor: "text-iconColor-dashboard dark:text-darkIconColor-dashboard"
        },
        {
            title: "Blog",
            icon: <Rabbit className="h-[75%] w-[75%]" />,
            href: "/blog",
            bgColor: "bg-iconBg-blog dark:bg-darkIconBg-blog",
            iconColor: "text-iconColor-blog dark:text-darkIconColor-blog"
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
            href: "/browser",
            bgColor: "bg-iconBg-browser dark:bg-darkIconBg-browser",
            iconColor: "text-iconColor-browser dark:text-darkIconColor-browser"
        },
        {
            title: "Pricing",
            icon: <SquarePercent className="h-[75%] w-[75%]" />,
            href: "/pricing",
            bgColor: "bg-iconBg-pricing dark:bg-darkIconBg-pricing",
            iconColor: "text-iconColor-pricing dark:text-darkIconColor-pricing"
        },
        {
            title: "Docs",
            icon: <BookOpen className="h-[75%] w-[75%]" />,
            href: "/docs",
            bgColor: "bg-iconBg-docs dark:bg-darkIconBg-docs",
            iconColor: "text-iconColor-docs dark:text-darkIconColor-docs"
        },
        {
            title: "Open Source",
            icon: <PackageOpen className="h-[75%] w-[75%]" />,
            href: "https://github.com/princemuichkine/supabrowser",
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
            <FloatingDock items={navItems} desktopClassName="border-2 border-border shadow-shadow rounded-[5px]" />
        </div>
    )
} 