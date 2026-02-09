export default async function handler(req, res) {
  const start = Date.now();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, k = 12, rerank = true, rerankK = 7 } = req.body || {};

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  // ---- MOCK DATA (107 news documents assumed) ----
  const documents = Array.from({ length: 107 }).map((_, i) => ({
    id: i,
    content: `News article ${i} about climate policy and global events`,
    source: "news"
  }));

  // ---- INITIAL RETRIEVAL (vector search simulation) ----
  const initialResults = documents
    .map(doc => ({
      ...doc,
      score: Math.random() // simulate cosine similarity
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  // ---- RE-RANKING (higher quality scoring simulation) ----
  let finalResults = initialResults;

  if (rerank) {
    finalResults = initialResults
      .map(doc => ({
        ...doc,
        score: Math.min(
          1,
          Math.max(0, doc.score * 0.6 + Math.random() * 0.4)
        )
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, rerankK);
  }

  const latency = Date.now() - start;

  return res.status(200).json({
    results: finalResults.map(d => ({
      id: d.id,
      score: Number(d.score.toFixed(2)),
      content: d.content,
      metadata: { source: d.source }
    })),
    reranked: rerank,
    metrics: {
      latency,
      totalDocs: 107
    }
  });
}


