import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const res = await fetch("http://localhost:8080/context", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to create browser context:", error)
    return NextResponse.json(
      { error: "Failed to create browser context" },
      { status: 500 }
    )
  }
} 