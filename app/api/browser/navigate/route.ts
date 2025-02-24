import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const res = await fetch("http://localhost:8080/navigate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to navigate:", error)
    return NextResponse.json(
      { error: "Failed to navigate" },
      { status: 500 }
    )
  }
} 