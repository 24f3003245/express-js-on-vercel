export default function handler(req, res) {
  const start = Date.now();

  // Allow GET also (to avoid failed fetch in browser)
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Use body for POST, query for GET
  const query =
    req.method === "POST"
      ? req.body?.query
      : req.query?.query || "climate change";

  const k = 12;
  const rerankK = 7;

  // ---- MOCK DOCUMENTS (107 news articles) ----
  const documents = Array.from({ length: 107 }).map((_, i) => ({
    id: i,
    content: `News article ${i} discussing climate change policies and global events.`,
    metadata: { source: "news" }
  }));

  // ---- INITIAL RETRIEVAL (simulated vector search) ----
  let candidates = documents
    .map(doc => ({
      ...doc,
      score: Math.random() // simulate cosine similarity
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  // ---- RE-RANKING (simulated high-quality scoring) ----
  let results = candidates
    .map(doc => ({
      ...doc,
      score: Math.min(1, Math.max(0, doc.score * 0.7 + Math.random() * 0.3))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, rerankK);

  const latency = Date.now() - start;

  return res.status(200).json({
    results: results.map(r => ({
      id: r.id,
      score: Number(r.score.toFixed(2)),
      content: r.content,
      metadata: r.metadata
    })),
    reranked: true,
    metrics: {
      latency,
      totalDocs: 107
    }
  });
}


  });
}


