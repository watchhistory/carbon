export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('youtube.com')) {
    return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
  }

  try {
    const videoId = extractVideoId(url);
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
    return res.status(200).json({ iframeUrl });
  } catch {
    return res.status(400).json({ error: 'Invalid YouTube link format' });
  }
}

function extractVideoId(url) {
  const regex =
    /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (!match) throw new Error('No video ID found');
  return match[1];
}
