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

## Adding Agents

To add the full agent system, copy from agents.scaffolding:

```bash
# Copy agents, skills, commands, templates
cp -r path/to/agents.scaffolding/.claude/agents .claude/
cp -r path/to/agents.scaffolding/.claude/skills .claude/
cp -r path/to/agents.scaffolding/.claude/commands .claude/
cp -r path/to/agents.scaffolding/.claude/templates .claude/
```

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
