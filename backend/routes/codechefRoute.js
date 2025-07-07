// routes/codechefRoute.js
import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';


const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const url = `https://www.codechef.com/users/jatin4kumar`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const rating = $('.rating-number').first().text().trim();
    const stars = $('.rating-star').first().text().trim();
    const name = $('.user-details-container header h2').first().text().trim();

    if (!rating) return res.status(404).json({ error: "User not found or blocked by CodeChef." });

    res.json({
      username,
      name,
      rating,
      stars
    });
  } catch (err) {
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
});

export default router;
