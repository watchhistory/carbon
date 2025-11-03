export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Missing video ID' });

    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || !data.items.length) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const snippet = data.items[0].snippet;

    return res.status(200).json({
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails.medium.url,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
