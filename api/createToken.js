// api/createToken.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // A simple auth layer (we'll secure later)
  const AUTH = process.env.SVC_SECRET || 'DEV_SECRET';
  const authHeader = req.headers.authorization || '';
  if (authHeader !== `Bearer ${AUTH}`)
    return res.status(403).json({ error: 'Forbidden' });

  // Generate a random 8-character token
  const token = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Store the token in global memory (works short-term)
  globalThis.safebox = globalThis.safebox || {};
  globalThis.safebox[token] = { status: 'pending', createdAt: Date.now() };

  // Create an approval URL
  const host = req.headers.host;
  const approveUrl = `https://${host}/api/approve/${token}`;

  return res.status(200).json({
    token,
    link: approveUrl,
    expiresInSec: 10 * 60, // expires in 10 minutes
  });
}
