"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function TopBanner() {
    const pathname = usePathname()

    // Only show on landing page
    if (pathname !== '/') return null

    return (
        <div className="absolute top-0 left-0 right-0 z-[100] w-full">
            <Link
                href="https://www.producthunt.com/posts/supabrowser"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-200 transition-all duration-300 cursor-pointer"
            >
                <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-end">
                    <span className="text-sm text-black dark:text-black font-medium tracking-wide pointer-events-none">
                        We are live on Product Hunt! | <span className="font-bold">Support us!</span>
                    </span>
                </div>
            </Link>
        </div>
    )
} 