export const metadata = {
  title: '◈ NEUROSPHERE LEDGER ◈',
  description: 'Living Value Identity Protocol - Transforming Social Reputation into Sovereign Wealth.',
  openGraph: {
    title: 'NeuroSphere: Living Value Identity',
    description: 'Autonomous ecosystem for E-KINDNESS and Stable Value Distribution.',
    url: 'https://indienation-neurosphere.vercel.app',
    siteName: 'NeuroSphere',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        backgroundColor: '#000', 
        color: '#46FF2E', 
        fontFamily: 'monospace',
        padding: '20px' 
      }}>
        {children}
      </body>
    </html>
  )
}
