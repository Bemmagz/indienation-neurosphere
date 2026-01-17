export const runtime = 'edge';

export async function GET() {
  const hasKey = process.env.GOOGLE_AI_API_KEY && 
                 process.env.GOOGLE_AI_API_KEY !== 'ISI_DENGAN_API_KEY_ANDA';
  
  return new Response(JSON.stringify({
    endpoint: "/api/ai",
    status: hasKey ? "configured" : "not_configured",
    engine: "Google AI Studio (Gemini)",
    monitoring: "AI Engineer Active",
    timestamp: Date.now()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    return new Response(JSON.stringify({
      received: body.prompt || body,
      processed: true,
      engine: "AI Senior Engineer",
      timestamp: Date.now(),
      note: process.env.GOOGLE_AI_API_KEY ? 
        "Real AI engine ready" : 
        "Mock mode - configure API key"
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({
      error: "Invalid request",
      timestamp: Date.now()
    }), { status: 400 });
  }
}
