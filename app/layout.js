export const metadata = {
  title: 'IndieNation Genesis',
  description: 'Sovereign Wealth Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#000' }}>
        {children}
      </body>
    </html>
  )
}
