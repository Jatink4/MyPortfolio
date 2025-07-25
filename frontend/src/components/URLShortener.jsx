import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [generateQR, setGenerateQR] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('urlHistory')) || [];
    setHistory(saved);
  }, []);

  const createShortUrl = async () => {
    if (!originalUrl || !fromDate || !toDate) return alert('Fill all fields!');
    try {
      const apiKey = import.meta.env.VITE_TINYURL_API_KEY;
      const data = {
        url: originalUrl,
        domain: "tiny.one"
      };

      const resp = await axios.post(
        'https://api.tinyurl.com/create',
        data,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );

      const short = resp.data.data.tiny_url;
      const entry = {
        id: nanoid(),
        originalUrl,
        shortUrl: short,
        fromDate,
        toDate,
        createdAt: new Date().toISOString(),
        isDeactivated: false
      };
      const newHist = [entry, ...history];
      localStorage.setItem('urlHistory', JSON.stringify(newHist));
      setHistory(newHist);
      setShortUrl(short);

      if (generateQR) {
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(short)}&size=200x200`);
      }
    } catch (e) {
      console.error(e);
      alert('Error generating URL.');
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  const clearAll = () => {
    if (window.confirm('Clear history?')) {
      localStorage.removeItem('urlHistory');
      setHistory([]);
    }
  };

  const deactivateLink = (id) => {
    const updated = history.map(item => item.id === id ? { ...item, isDeactivated: true } : item);
    setHistory(updated);
    localStorage.setItem('urlHistory', JSON.stringify(updated));
  };

  const now = new Date();
  const isActive = item => {
    const isWithinRange = new Date(item.fromDate) <= now && now <= new Date(item.toDate);
    return isWithinRange && !item.isDeactivated;
  };

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-xl max-w-3xl mx-auto mt-6 space-y-6 w-full">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-amber-400">🔗 TinyURL Shortener</h2>

  {/* Input Section */}
  <div className="space-y-4">
    <input
      className="w-full bg-gray-800 p-3 rounded text-sm sm:text-base"
      placeholder="Paste your long URL here"
      value={originalUrl}
      onChange={(e) => setOriginalUrl(e.target.value)}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-1">Valid From</label>
        <input
          type="date"
          className="w-full bg-gray-800 p-2 rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Valid Till</label>
        <input
          type="date"
          className="w-full bg-gray-800 p-2 rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
    </div>

    <label className="inline-flex items-center space-x-2 text-sm">
      <input type="checkbox" checked={generateQR} onChange={() => setGenerateQR(!generateQR)} />
      <span>Generate QR Code</span>
    </label>

    <button
      onClick={createShortUrl}
      className="w-full bg-blue-600 py-2 rounded font-semibold hover:bg-blue-700 transition"
    >
      Generate
    </button>

    {shortUrl && (
      <div className="bg-gray-800 p-4 rounded flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <span className="break-all text-sm sm:text-base">{shortUrl}</span>
          <button
            className="mt-2 sm:mt-0 bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
            onClick={() => copy(shortUrl)}
          >
            Copy
          </button>
        </div>
        {generateQR && qrUrl && (
          <img src={qrUrl} alt="QR Code" className="mx-auto w-40 h-40" />
        )}
      </div>
    )}
  </div>

  {/* History Section */}
  <div>
    <div className="flex justify-between items-center">
      <h3 className="text-lg sm:text-xl font-semibold">📜 History</h3>
      <button onClick={clearAll} className="text-red-400 text-sm hover:underline">
        Clear All
      </button>
    </div>

    {history.length === 0 ? (
      <p className="text-gray-400 mt-2 text-sm">No history yet.</p>
    ) : (
      <ul className="space-y-3 mt-3 max-h-72 overflow-y-auto pr-1">
        {history.map((item) => (
          <li key={item.id} className="bg-gray-800 p-3 rounded text-sm">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <a
                href={item.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 break-all"
              >
                {item.shortUrl}
              </a>
              <span
                className={`text-xs px-2 py-1 rounded self-start sm:self-auto ${
                  isActive(item) ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {isActive(item) ? 'Active' : 'Expired'}
              </span>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              From: {item.fromDate} → To: {item.toDate}
            </div>
            <div className="text-yellow-400 text-xs mt-1 break-all">Original: {item.originalUrl}</div>
            {!item.isDeactivated && (
              <button
                onClick={() => deactivateLink(item.id)}
                className="mt-2 text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700"
              >
                Deactivate
              </button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
};

export default URLShortener;
