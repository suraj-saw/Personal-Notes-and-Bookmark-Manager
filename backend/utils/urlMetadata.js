const axios = require('axios');
const cheerio = require('cheerio');

const fetchUrlMetadata = async (url) => {
  try {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    const response = await axios.get(fullUrl, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Try to get title from various sources
    let title = $('meta[property="og:title"]').attr('content') ||
                $('meta[name="twitter:title"]').attr('content') ||
                $('title').text() ||
                $('h1').first().text() ||
                'Untitled';

    title = title.trim();

    return { title, success: true };
  } catch (error) {
    console.error('Error fetching URL metadata:', error.message);
    return { title: null, success: false };
  }
};

module.exports = { fetchUrlMetadata };
