const BASE_URL = 'https://trox.cinemax6.com:3545/stream/';
const SOURCE_URL = BASE_URL + 'play.m3u8';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(SOURCE_URL);
    let text = await response.text();

    // TS linklerini düzelt
    text = text.replace(/(.*\.ts)/g, (match) => {
      if (match.startsWith('http')) return match;
      return BASE_URL + match;
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.status(200).send(text);

  } catch (err) {
    res.status(500).send('Hata: ' + err.message);
  }
}
