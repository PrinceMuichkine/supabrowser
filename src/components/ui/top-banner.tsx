"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function TopBanner() {
    const pathname = usePathname()

    // Only show on landing page
    if (pathname !== '/') return null

    return (
        <div className="absolute top-0 left-0 right-0 z-[100] w-full bg-gradient-to-r from-iconBg-home/30 to-iconBg-browser/30 dark:from-darkIconBg-home/30 dark:to-darkIconBg-browser/30">
            <Link
                href="https://www.producthunt.com/posts/supabrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full transition-all duration-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
            >
                <div className="max-w-7xl mx-auto px-4 h-6 flex items-center justify-end">
                    <span className="text-xs text-black dark:text-white font-medium tracking-wide pointer-events-none">
                        We are live on Product Hunt! | <span className="font-bold">Support us!</span>
                    </span>
                </div>
            </Link>
        </div>
    )
} 