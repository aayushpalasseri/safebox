// api/status/[token].js
export default async function handler(req, res) {
  const { token } = req.query;
  globalThis.safebox = globalThis.safebox || {};

  const record = globalThis.safebox[token];
  if (!record) return res.status(404).json({ error: 'invalid token' });

  return res.status(200).json({
    token,
    status: record.status,
    createdAt: record.createdAt,
    approvedAt: record.approvedAt || null,
  });
}
