// This is a simple example using a static game state. 
// Replace this logic with your database queries.

export default function handler(req, res) {
    if (req.method === 'GET') {
      // Fetch game state from your database instead of this static example
      const gameState = Array(9).fill(null); // Example game state
      res.status(200).json(gameState);
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }