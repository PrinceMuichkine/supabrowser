'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/lib/database.types';
import Image from 'next/image';
export default function BrowserHistory() {
    const [history, setHistory] = useState<Tables<'browser_history'>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                setLoading(true);

                // Fetch history from our API
                const response = await fetch('/api/browser/history');

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch history');
                }

                const data = await response.json();
                setHistory(data.history || []);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    async function addHistoryEntry(url: string) {
        try {
            const title = `Test Entry: ${new Date().toLocaleTimeString()}`;
            const favicon = 'https://www.google.com/favicon.ico'; // Example favicon

            const response = await fetch('/api/browser/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, title, favicon }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add history entry');
            }

            // Refresh history
            const historyResponse = await fetch('/api/browser/history');
            const data = await historyResponse.json();
            setHistory(data.history || []);
        } catch (err) {
            console.error('Error adding history entry:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    }

    if (loading) {
        return <div className="p-4">Loading browser history...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Browser History</h2>
                <button
                    onClick={() => addHistoryEntry('https://example.com')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Test Entry
                </button>
            </div>

            {history.length === 0 ? (
                <p className="text-gray-500">No history entries found.</p>
            ) : (
                <ul className="space-y-2">
                    {history.map((entry) => (
                        <li key={entry.id} className="border p-3 rounded flex items-center">
                            {entry.favicon && (
                                <div className="mr-3">
                                    <Image
                                        src={entry.favicon}
                                        alt=""
                                        className="w-4 h-4"
                                        width={16}
                                        height={16}
                                    />
                                </div>
                            )}
                            <div>
                                <h3 className="font-medium">{entry.title || 'Untitled'}</h3>
                                <a
                                    href={entry.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    {entry.url}
                                </a>
                                <p className="text-xs text-gray-500">
                                    {entry.visited_at ? new Date(entry.visited_at).toLocaleString() : 'Unknown time'}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
} 