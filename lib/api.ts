export function getApiBase() {
  // Always go through the Vercel API routes. They host the OpenAI vision call
  // AND the Upstash-backed rate limit gate. Production traffic used to bypass
  // both by going direct to a Render backend; that's intentionally removed
  // so the rate limiter actually applies and we drop the Render cold-start.
  return '/api';
}

export async function analyzeFrameAPI(frame: string, prompt: string) {
  const res = await fetch(`${getApiBase()}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ frame, prompt }),
  });
  return res.json();
}
