// api/approve/[token].js
export default async function handler(req, res) {
  const { token } = req.query;
  globalThis.safebox = globalThis.safebox || {};

  if (!globalThis.safebox[token]) {
    return res.status(404).send('<h3>Invalid or expired token.</h3>');
  }

  globalThis.safebox[token].status = 'approved';
  globalThis.safebox[token].approvedAt = Date.now();

  res.setHeader('Content-Type', 'text/html');
  return res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:40px;">
        <h1>✅ Box Unlocked</h1>
        <p>Token <b>${token}</b> has been approved. You can close this page.</p>
      </body>
    </html>
  `);
}
