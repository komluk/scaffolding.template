# .claude/ Directory

Claude Code configuration for this project.

**Status:** AUTONOMOUS MODE - All permissions pre-approved.

## Running Claude Code

```bash
# Interactive with auto-permissions
claude --dangerously-skip-permissions

# Non-interactive (for scripts/CI)
claude --dangerously-skip-permissions --no-interactive -p "your prompt"
```

## Structure

```
.claude/
├── settings.json    # Project-level Claude settings
└── README.md        # This file
```

## Agents, Skills & Commands

Agents, skills, commands, and templates are **inherited automatically** from the scaffolding platform via symlinks. No manual copying is needed — they are available to every project out of the box.

To add project-specific overrides, place files in `.claude/agents/`, `.claude/skills/`, or `.claude/commands/`.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
