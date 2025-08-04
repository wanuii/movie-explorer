export default async function handler(req, res) {
  const { q, page = 1 } = req.query;

  const OMDB_BASE = "https://www.omdbapi.com/";
  const API_KEY = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(`${OMDB_BASE}?apikey=${API_KEY}&s=${q}&page=${page}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "搜尋失敗", details: err.message });
  }
}
