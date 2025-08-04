export default async function handler(req, res) {
  const { id } = req.query;

  const OMDB_BASE = "https://www.omdbapi.com/";
  const API_KEY = process.env.OMDB_API_KEY;

  try {
    const response = await fetch(`${OMDB_BASE}?apikey=${API_KEY}&i=${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "查詢失敗", details: err.message });
  }
}
