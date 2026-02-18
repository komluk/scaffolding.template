function App() {
  const projectName = 'react-app'
  const techStack = 'React'

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">&#9651;</div>
        <h1 className="landing-title">{projectName}</h1>
        <div className="landing-badges">
          <span className="badge badge-stack">{techStack}</span>
          <span className="badge badge-status">Deployed</span>
        </div>
        <p className="landing-description">
          Your application is live and ready for development.
        </p>
      </header>

      <hr className="divider" />

      <section className="section">
        <h2 className="section-title">Project Structure</h2>
        <div className="card">
          <ul className="file-tree">
            <li>
              <span className="file-name">src/App.tsx</span>
              <span className="file-desc">Main application component</span>
            </li>
            <li>
              <span className="file-name">src/main.tsx</span>
              <span className="file-desc">Application entry point</span>
            </li>
            <li>
              <span className="file-name">src/App.css</span>
              <span className="file-desc">Global styles</span>
            </li>
            <li>
              <span className="file-name">index.html</span>
              <span className="file-desc">HTML template</span>
            </li>
            <li>
              <span className="file-name">vite.config.ts</span>
              <span className="file-desc">Vite bundler configuration</span>
            </li>
            <li>
              <span className="file-name">package.json</span>
              <span className="file-desc">Dependencies and scripts</span>
            </li>
            <li>
              <span className="file-name">Dockerfile</span>
              <span className="file-desc">Container build instructions</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Getting Started</h2>
        <div className="card">
          <ol className="steps">
            <li>
              <span className="step-text">
                Clone the repository and install dependencies with <code>npm install</code>
              </span>
            </li>
            <li>
              <span className="step-text">
                Start the dev server with <code>npm run dev</code>
              </span>
            </li>
            <li>
              <span className="step-text">
                Edit <code>src/App.tsx</code> to build your application UI
              </span>
            </li>
            <li>
              <span className="step-text">
                Push to <code>main</code> to trigger automatic deployment
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Deployment Pipeline</h2>
        <div className="card">
          <div className="pipeline">
            <div className="pipeline-step">
              <span className="icon">&#8593;</span> git push
            </div>
            <span className="pipeline-arrow">&#8594;</span>
            <div className="pipeline-step">
              <span className="icon">&#9881;</span> CI Build
            </div>
            <span className="pipeline-arrow">&#8594;</span>
            <div className="pipeline-step">
              <span className="icon">&#128230;</span> Docker Image
            </div>
            <span className="pipeline-arrow">&#8594;</span>
            <div className="pipeline-step">
              <span className="icon">&#9889;</span> Live
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p className="footer-text">
          Built with{' '}
          <a
            className="footer-link"
            href="https://github.com/komluk/scaffolding.tool"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scaffolding Tool
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
