export async function GET() {
  return Response.json({
    status: 'healthy',
    architecture: 'app-router',
    timestamp: new Date().toISOString()
  });
}
