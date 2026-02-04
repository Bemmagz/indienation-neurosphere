export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-store');
  res.send(`User-agent: *
Disallow: /
User-agent: Googlebot
Disallow: /
User-agent: Bingbot
Disallow: /
User-agent: Slurp
Disallow: /
User-agent: DuckDuckBot
Disallow: /
User-agent: Baiduspider
Disallow: /
User-agent: YandexBot
Disallow: /

# BLOCK ALL
Crawl-delay: 86400
`);
}
