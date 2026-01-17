export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({
    status: "healthy",
    timestamp: Date.now(),
    version: "1.0.0",
    ai_engineer: "active",
    services: ["api", "ledger", "monitoring"],
    message: "NeuroSphere AI Engineered System"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}
