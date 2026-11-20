# OmniSight

Camera-frame activity analysis with a natural-language watch prompt, alert timeline, face gallery and session results.

## Provider configuration

Set `DEEPSEEK_API_KEY` as a server-only environment variable in Vercel and redeploy. The `/api/analyze` route uses the OpenAI-compatible DeepSeek endpoint with `deepseek-flash`, image detail `low`, JSON output and thinking disabled. The `openai` npm package is the API client; it sends requests to DeepSeek. No OpenAI key is required for frame analysis.

The camera flow, prompts, five-second capture interval, response fields (`detected`, `confidence`, `description`, `region`), local face models, gallery and results UI retain their existing contracts. Detection outputs and timing can vary between models.

`npm ci` installs dependencies; `npm run build` compiles and checks the application. Never commit credentials. Redis/Upstash rate limiting has been removed. Frame analysis requests directly use the configured DeepSeek API balance.
