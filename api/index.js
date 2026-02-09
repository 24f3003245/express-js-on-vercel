export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.status(200).json({
    results: [
      {
        id: 1,
        score: 0.91,
        content: "Climate policies discussed at global summit.",
        metadata: { source: "Reuters" }
      },
      {
        id: 2,
        score: 0.85,
        content: "New environmental regulations announced by EU.",
        metadata: { source: "BBC" }
      }
    ],
    reranked: true,
    metrics: {
      latency: 120,
      totalDocs: 107
    }
  });
}
