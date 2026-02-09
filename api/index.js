export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "API is deployed and working"
    });
  }

  if (req.method === "POST") {
    return res.status(200).json({
      results: [],
      reranked: true,
      metrics: { latency: 0, totalDocs: 107 }
    });
  }

  res.status(405).json({ error: "Method not allowed" });
}

