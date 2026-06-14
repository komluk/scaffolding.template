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
├── agents/          # 11 specialized agent definitions
├── skills/          # 25 universal skills (auto-injected via frontmatter)
├── commands/        # 17 slash commands (workflow, OpenSpec, utilities)
│   └── specs/       # OpenSpec spec-driven development commands
├── hooks/           # Hook scripts (session-start, staleness, guardrails, review)
├── templates/       # Reference templates (output frontmatter, overviews)
├── validators/      # Validation scripts (circuit-breaker, output validation)
├── output-styles/   # Output formatting (clean-reports)
├── settings.json    # Project-level Claude settings
└── README.md        # This file
```

## Agents

All 11 agents are available via `Task(subagent_type="agent-name")`:
analyst, architect, researcher, developer, debugger, reviewer, optimizer, tech-writer, devops, gitops, coordinator.

## Skills

Skills are auto-injected into agents via `skills:` frontmatter in agent definitions. To add project-specific skills, create a new directory in `.claude/skills/` with a `SKILL.md` file.

## Commands

Use `/workflow "description"` for the full agent chain, or `/specs:new`, `/specs:ff`, etc. for spec-driven development.

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
