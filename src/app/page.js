export default function Home() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>NeuroSphere | AI Engineered</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        </style>
      </head>
      <body class="bg-black min-h-screen flex items-center justify-center p-6">
        <div class="w-full max-w-md text-center">
          <h1 class="text-cyan-400 mb-6 tracking-widest text-sm font-mono animate-pulse">
            🧠 NEUROSPHERE AI ENGINEERED
          </h1>
          
          <div class="bg-gray-900 border border-cyan-800 rounded-xl p-6 mb-6">
            <div class="grid grid-cols-2 gap-4 text-left mb-4">
              <div class="text-cyan-300">Status:</div>
              <div class="text-green-400 font-mono">✅ LIVE</div>
              
              <div class="text-cyan-300">Deployment:</div>
              <div class="text-green-400 font-mono">VERCEL</div>
              
              <div class="text-cyan-300">Karma:</div>
              <div class="text-yellow-300 font-mono">200 TM</div>
              
              <div class="text-cyan-300">AI Engineer:</div>
              <div class="text-purple-400 font-mono">ACTIVE</div>
            </div>
            
            <div class="text-xs text-gray-500 border-t border-gray-800 pt-4">
              <p>Production Deployment • PID: 7865</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <a href="/api/health" 
               class="block border border-cyan-800 text-cyan-400 py-3 rounded hover:bg-cyan-900 transition font-mono text-sm">
               🔧 /api/health
            </a>
            <a href="/api/identity" 
               class="block border border-cyan-800 text-cyan-400 py-3 rounded hover:bg-cyan-900 transition font-mono text-sm">
               🆔 /api/identity
            </a>
            <a href="/api/ai" 
               class="block border border-purple-800 text-purple-400 py-3 rounded hover:bg-purple-900 transition font-mono text-sm">
               🤖 /api/ai
            </a>
          </div>
          
          <div class="mt-6 text-gray-600 text-xs">
            <p>✅ Vercel Deployment: Ready</p>
            <p>✅ AI Senior Engineer: 24/7 Monitoring</p>
            <p id="api-test" class="text-green-400 mt-2">Testing APIs...</p>
          </div>
        </div>
        
        <script>
          // Test all APIs on load
          async function testAPIs() {
            const apis = [
              { name: 'Health', url: '/api/health' },
              { name: 'Identity', url: '/api/identity' },
              { name: 'AI', url: '/api/ai' }
            ];
            
            let results = [];
            
            for (const api of apis) {
              try {
                const res = await fetch(api.url);
                const data = await res.json();
                results.push(\`✅ \${api.name}\`);
              } catch {
                results.push(\`❌ \${api.name}\`);
              }
            }
            
            document.getElementById('api-test').innerHTML = 
              'APIs: ' + results.join(' • ');
          }
          
          testAPIs();
          console.log('NeuroSphere Production v1.0');
        </script>
      </body>
    </html>
  `;
}
