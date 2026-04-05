export const metadata = {
  title: 'AlbionForge — Métricas para Albion Online',
  description: 'Trackea tu fama, plata y rendimiento en tiempo real. Guild dashboard, precios de mercado y builds META.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{margin:0,padding:0,background:"#0e0a06"}}>{children}</body>
    </html>
  )
}
