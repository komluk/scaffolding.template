# Project Name

> Brief description of your project.

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Install dependencies (choose your stack)
npm install          # Node.js
pip install -r requirements.txt  # Python
dotnet restore       # .NET
```

## Development

### Using Claude Code

This project is configured for Claude Code autonomous mode:

```bash
claude --dangerously-skip-permissions
```

See [CLAUDE.md](CLAUDE.md) for agent configuration and workflows.

### Project Structure

```
/
├── .scaffolding/    # Task logs and context (do not edit manually)
├── .claude/         # Claude Code configuration
├── .vscode/         # VS Code settings
├── docs/            # Documentation
└── src/             # Source code (create as needed)
```

## Documentation

- [CLAUDE.md](CLAUDE.md) - Claude Code and agent configuration
- [docs/](docs/) - Additional documentation

## Contributing

1. Create a feature branch
2. Use Claude Code agents for implementation
3. Ensure validation passes
4. Submit pull request for review

## License

MIT License - see [LICENSE](LICENSE)
