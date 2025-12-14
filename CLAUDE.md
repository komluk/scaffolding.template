# Project Configuration

## Communication Protocol

**MANDATORY BEHAVIOR - Apply to EVERY user message:**

1. **Auto-route** - Treat every user message as a task. Route to appropriate agent immediately.
2. **No confirmation** - Don't ask "should I use agent X?" Just do it.
3. **Concise responses** - Short status updates. No verbose explanations unless asked.
4. **Agent-first** - NEVER edit code/docs directly. ALWAYS delegate to agents.

**Response format:**
```
[Agent: name] Task description
-> Result summary (1-2 lines)
```

---

## Quick Reference

| Action | Command |
|--------|---------|
| Claude (autonomous) | `claude --dangerously-skip-permissions` |
| Full workflow | `/workflow "feature description"` |

---

## Agent System

**Route ALL tasks via Task tool. NEVER edit code directly.**

```
Task(subagent_type="agent-name", prompt="Your task")
```

### Agent Selection

| Task | Agent |
|------|-------|
| Add/fix code, implement features | `code-changer` |
| Debug failing test | `bug-investigator` |
| UI/styling changes | `code-changer` |
| All testing (unit, E2E) | `code-changer` |
| Update README/CHANGELOG/docs | `tech-writer` |
| Research library/API | `docs-researcher` |
| Review PR/code/security | `pr-reviewer` |
| CI/CD, Docker | `devops` |
| Complex multi-agent task | `chief-architect` |
| API design, OpenAPI | `chief-architect` |
| Create plan from research | `implementation-planner` |
| Performance, database, queries | `performance-optimizer` |

---

## Project Structure

```
/.scaffolding/     - Task logs, memory, context (managed by scaffolding tool)
/.claude/          - Claude Code configuration
/.vscode/          - VS Code settings
/docs/             - Documentation
```

## Technology Stack

<!-- Update this section with your actual technologies -->

| Layer | Technologies |
|-------|--------------|
| Frontend | |
| Backend | |
| Database | |

## Quality Gates

| Phase | Requirement | Owner |
|-------|-------------|-------|
| Research | Score >= 80 | docs-researcher |
| Planning | Score >= 85 | implementation-planner |
| Implementation | Validation passes | code-changer |
| Review | No critical issues | pr-reviewer |
| Documentation | CHANGELOG updated | tech-writer |

## Key Rules

1. **Use agents** - Route ALL tasks via Task tool
2. **Sequential agents** - Run sequentially when editing same files
3. **Files < 500 lines** - Refactor if approaching limit
4. **Validate before commit** - Run validation command for your stack
5. **tech-writer owns docs** - Only tech-writer modifies README/CHANGELOG
6. **code-changer owns code** - Only code-changer modifies source files

## Context Management

**Auto-compact triggers at ~95% context usage.**

| Situation | Action |
|-----------|--------|
| Before large task | Run `/compact` proactively |
| After major milestone | Run `/compact` to free context |
| Context warning | System will auto-compact |

## Slash Commands

| Command | Description |
|---------|-------------|
| `/code-review` | Code quality review |
| `/security-review` | Security audit |
| `/test-coverage` | Test coverage analysis |
| `/implement-feature` | Feature workflow |
| `/research` | API/library research |
