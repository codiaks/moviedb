import express from 'express';
import request from 'request';

const app: express.Application = express();
const port = process.env.PORT || 3000;

// Replace with your TMDB API key
const apiKey = 'YOUR_TMDB_API_KEY';

app.get('/search', (req: express.Request, res: express.Response) => {
  const query: string = req.query.q as string; // Get search query from URL parameter
  if (!query) {
    return res.status(400).send('Missing search query');
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  request(url, (error: Error, response: request.Response, body: string) => {
    if (error) {
      console.error('Error fetching data from TMDB API:', error);
      return res.status(500).send('Internal Server Error');
    }

    const data: any = JSON.parse(body); // Need type assertion due to dynamic data
    res.json(data.results); // Send search results as JSON response
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
