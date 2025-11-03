import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [iframeSrc, setIframeSrc] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIframeSrc('');

    try {
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setIframeSrc(data.iframeUrl);
      }
    } catch {
      setError('Something went wrong.');
    }
  };

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>YouTube Proxy Player</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          required
          style={{ width: '60%', padding: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Go URL</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {iframeSrc && (
        <div style={{ marginTop: '2rem' }}>
          <iframe
            width="560"
            height="315"
            src={iframeSrc}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </main>
  );
}
