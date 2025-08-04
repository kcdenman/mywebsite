// Config endpoint for Vercel serverless function
export default function handler(req, res) {
  const apiUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.kevindenman.xyz/api/chat'  // Vercel production URL with www
    : 'http://localhost:3000/api/chat';  // Local development URL
  res.json({ apiUrl });
}