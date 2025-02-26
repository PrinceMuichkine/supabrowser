"use client"

import { Navbar } from "@/components/layout/navbar"
import { Rabbit } from "lucide-react"

export default function BlogPage() {
    return (
        <div className="relative min-h-screen bg-bg text-text overflow-hidden">
            <div className="container mx-auto px-4 py-4 pt-8 md:py-6 md:pt-12 mb-24 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-[5px] flex items-center justify-center bg-iconBg-blog dark:bg-darkIconBg-blog mr-4">
                            <Rabbit className="h-6 w-6 text-iconColor-blog dark:text-darkIconColor-blog" />
                        </div>
                        <h1 className="text-4xl font-heading">Blog</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogPosts.map((post, index) => (
                            <div
                                key={index}
                                className="border border-border rounded-base p-6 hover:shadow-shadow transition-all duration-300 cursor-pointer bg-bw"
                            >
                                <div className="mb-4 text-sm text-mtext dark:text-text/70">{post.date}</div>
                                <h2 className="text-2xl font-heading mb-3 text-text">{post.title}</h2>
                                <p className="text-text/70 mb-4">{post.excerpt}</p>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-[5px] bg-iconBg-blog dark:bg-darkIconBg-blog flex items-center justify-center mr-3">
                                        <span className="text-xs font-bold text-iconColor-blog dark:text-darkIconColor-blog">
                                            {post.author.split(' ').map(name => name[0]).join('')}
                                        </span>
                                    </div>
                                    <span className="text-sm text-text">{post.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <Navbar />
        </div>
    )
}

const blogPosts = [
    {
        title: "Introducing Supabrowser: A New Way to Browse the Web",
        excerpt: "We're excited to announce the launch of Supabrowser, a revolutionary browser designed for modern web users.",
        date: "March 15, 2023",
        author: "Alex Johnson"
    },
    {
        title: "The Future of Web Browsing: Privacy and Performance",
        excerpt: "In this post, we explore how Supabrowser is addressing the growing concerns around privacy and performance in web browsing.",
        date: "April 2, 2023",
        author: "Sam Chen"
    },
    {
        title: "Supabrowser vs. Traditional Browsers: What's Different?",
        excerpt: "A detailed comparison of Supabrowser's features against traditional browsers and why it might be time to make the switch.",
        date: "April 18, 2023",
        author: "Taylor Smith"
    },
    {
        title: "How We Built Supabrowser: A Technical Deep Dive",
        excerpt: "Our engineering team shares insights into the technology stack and architecture decisions behind Supabrowser.",
        date: "May 5, 2023",
        author: "Jordan Lee"
    }
] 