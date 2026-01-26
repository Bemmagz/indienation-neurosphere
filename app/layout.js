export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'monospace' }}>
        {children}
      </body>
    </html>
  )
}
