const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const landingPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>node-app</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --bg-primary: #0a0e17; --bg-surface: #111827; --bg-elevated: #1a2332;
            --border: #1e293b; --cyan: #00ffff; --green: #00e676;
            --text-primary: #fff; --text-secondary: #94a3b8; --text-muted: #64748b;
            --font-mono: 'Courier New', 'Fira Code', monospace;
            --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }
        body { font-family: var(--font-sans); background: var(--bg-primary); color: var(--text-primary); line-height: 1.6; min-height: 100vh; }
        .landing { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem 3rem; }
        .landing-header { text-align: center; padding: 3rem 0 2.5rem; }
        .landing-logo { font-size: 2.5rem; margin-bottom: 0.25rem; }
        .landing-title { font-size: 2rem; font-weight: 700; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
        .landing-badges { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
        .badge { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.3rem 0.85rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; font-family: var(--font-mono); letter-spacing: 0.03em; }
        .badge-stack { background: rgba(0,255,255,0.1); color: var(--cyan); border: 1px solid rgba(0,255,255,0.25); }
        .badge-status { background: rgba(0,230,118,0.1); color: var(--green); border: 1px solid rgba(0,230,118,0.25); }
        .landing-description { color: var(--text-secondary); font-size: 1.05rem; max-width: 500px; margin: 0 auto; }
        .divider { border: none; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); margin: 2rem 0; }
        .section { margin-bottom: 2rem; }
        .section-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: var(--cyan); margin-bottom: 1rem; font-family: var(--font-mono); }
        .card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem 1.5rem; }
        .file-tree { list-style: none; }
        .file-tree li { display: flex; align-items: baseline; gap: 0.75rem; padding: 0.45rem 0; border-bottom: 1px solid rgba(30,41,59,0.5); font-size: 0.9rem; }
        .file-tree li:last-child { border-bottom: none; }
        .file-name { font-family: var(--font-mono); color: var(--cyan); white-space: nowrap; min-width: 140px; font-size: 0.85rem; }
        .file-desc { color: var(--text-secondary); font-size: 0.85rem; }
        .steps { list-style: none; counter-reset: step; }
        .steps li { counter-increment: step; display: flex; align-items: flex-start; gap: 1rem; padding: 0.6rem 0; }
        .steps li::before { content: counter(step); display: flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; border-radius: 50%; background: rgba(0,255,255,0.1); color: var(--cyan); font-size: 0.8rem; font-weight: 700; font-family: var(--font-mono); border: 1px solid rgba(0,255,255,0.25); flex-shrink: 0; margin-top: 0.1rem; }
        .step-text { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
        .step-text code { font-family: var(--font-mono); background: rgba(0,255,255,0.08); color: var(--cyan); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.825rem; }
        .pipeline { display: flex; align-items: center; gap: 0; justify-content: center; flex-wrap: wrap; padding: 0.5rem 0; }
        .pipeline-step { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 6px; font-size: 0.825rem; font-family: var(--font-mono); color: var(--text-secondary); }
        .pipeline-step .icon { font-size: 1rem; }
        .pipeline-arrow { color: var(--text-muted); font-size: 1.1rem; padding: 0 0.3rem; }
        .landing-footer { text-align: center; padding: 1.5rem 0 0; border-top: 1px solid var(--border); margin-top: 2.5rem; }
        .footer-text { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono); }
        .footer-link { color: var(--cyan); text-decoration: none; }
        .footer-link:hover { text-decoration: underline; }
        @media (max-width: 640px) {
            .landing { padding: 1.25rem 1rem 2rem; }
            .landing-header { padding: 2rem 0 1.5rem; }
            .landing-title { font-size: 1.5rem; }
            .landing-logo { font-size: 2rem; }
            .file-tree li { flex-direction: column; gap: 0.15rem; }
            .file-name { min-width: auto; }
            .pipeline { flex-direction: column; gap: 0.5rem; }
            .pipeline-arrow { transform: rotate(90deg); }
            .card { padding: 1rem; }
        }
    </style>
</head>
<body>
    <div class="landing">
        <header class="landing-header">
            <div class="landing-logo">&#9646;</div>
            <h1 class="landing-title">node-app</h1>
            <div class="landing-badges">
                <span class="badge badge-stack">Node.js</span>
                <span class="badge badge-status">Deployed</span>
            </div>
            <p class="landing-description">Your application is live and ready for development.</p>
        </header>

        <hr class="divider" />

        <section class="section">
            <h2 class="section-title">Project Structure</h2>
            <div class="card">
                <ul class="file-tree">
                    <li><span class="file-name">src/index.js</span><span class="file-desc">Express server and routes</span></li>
                    <li><span class="file-name">package.json</span><span class="file-desc">Dependencies and scripts</span></li>
                    <li><span class="file-name">Dockerfile</span><span class="file-desc">Container build instructions</span></li>
                </ul>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">Getting Started</h2>
            <div class="card">
                <ol class="steps">
                    <li><span class="step-text">Clone the repository and install dependencies with <code>npm install</code></span></li>
                    <li><span class="step-text">Start the dev server with <code>npm run dev</code></span></li>
                    <li><span class="step-text">Edit <code>src/index.js</code> to add routes and logic</span></li>
                    <li><span class="step-text">Push to <code>main</code> to trigger automatic deployment</span></li>
                </ol>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">API Endpoints</h2>
            <div class="card">
                <ul class="file-tree">
                    <li><span class="file-name">GET /</span><span class="file-desc">This landing page</span></li>
                    <li><span class="file-name">GET /health</span><span class="file-desc">Health check endpoint</span></li>
                </ul>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">Deployment Pipeline</h2>
            <div class="card">
                <div class="pipeline">
                    <div class="pipeline-step"><span class="icon">&#8593;</span> git push</div>
                    <span class="pipeline-arrow">&#8594;</span>
                    <div class="pipeline-step"><span class="icon">&#9881;</span> CI Build</div>
                    <span class="pipeline-arrow">&#8594;</span>
                    <div class="pipeline-step"><span class="icon">&#128230;</span> Docker Image</div>
                    <span class="pipeline-arrow">&#8594;</span>
                    <div class="pipeline-step"><span class="icon">&#9889;</span> Live</div>
                </div>
            </div>
        </section>

        <footer class="landing-footer">
            <p class="footer-text">Built with <a class="footer-link" href="https://github.com/komluk/scaffolding.tool" target="_blank" rel="noopener noreferrer">Scaffolding Tool</a></p>
        </footer>
    </div>
</body>
</html>`;

app.get('/', (_req, res) => {
  res.send(landingPage);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
