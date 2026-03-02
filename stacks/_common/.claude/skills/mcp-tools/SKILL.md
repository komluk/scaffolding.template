# MCP Tools Integration

This skill documents Model Context Protocol (MCP) plugin usage patterns for agent workflows.

## Overview

MCP plugins extend agent capabilities with external tools. They appear in the tool list with `mcp__pluginname__toolname` format.

## Common Plugins

### Development & Testing

| Plugin | Package | Key Tools | Auth |
|--------|---------|-----------|------|
| **playwright** | `npx @anthropic/playwright-mcp` | `browser_navigate`, `browser_screenshot`, `browser_click` | None |
| **eslint** | `npx @eslint/mcp@latest` | lint file, lint project | None |
| **sequential-thinking** | `npx @modelcontextprotocol/server-sequential-thinking` | step-by-step reasoning | None |

### Infrastructure

| Plugin | Package | Key Tools | Auth |
|--------|---------|-----------|------|
| **docker** | `uvx docker-mcp` | `docker_build`, `docker_run`, `docker_logs`, `docker_ps` | Docker socket |
| **cron** | `npx claudecron@latest` | `cron_create`, `cron_list`, `cron_delete` | None |

### Data & Services

| Plugin | Package | Key Tools | Auth |
|--------|---------|-----------|------|
| **github** | HTTP transport | `create_issue`, `create_pull_request`, `search_repositories` | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **memory** | `npx @modelcontextprotocol/server-memory` | `create_entities`, `search_nodes` | `MEMORY_FILE_PATH` |

## Agent-to-MCP Mapping

| Agent | Recommended Plugins | Use Cases |
|-------|-------------------|-----------|
| **analyst** | sequential-thinking, memory | Step-by-step requirement analysis, knowledge graph |
| **devops** | docker, cron | Container management, scheduled tasks |
| **researcher** | memory | Knowledge graph |
| **developer** | playwright, eslint, memory | Browser testing, linting, knowledge graph |
| **debugger** | playwright, sequential-thinking | UI debugging, step-by-step analysis |
| **reviewer** | eslint | Linting violations |
| **gitops** | github | PR management, issue tracking |
| **architect** | github, sequential-thinking, memory | Issue tracking, reasoning, knowledge graph |
| **performance-optimizer** | -- | Use project-specific database tools |
| **tech-writer** | -- | Use standard tools |

## Usage Notes

- MCP tools appear in the tool list with `mcp__pluginname__toolname` format
- Agents should check if an MCP tool is available before attempting to use it
- If a plugin is not configured (missing auth), the tool call will fail gracefully
- Use `playwright` for browser automation and visual testing

## When to Use MCP

### Decision Tree

```
Need to verify UI or reproduce a browser bug?
  -> YES -> use mcp__playwright__browser_navigate + mcp__playwright__browser_screenshot
  -> NO -> continue

Need to manage Docker containers?
  -> YES -> use mcp__docker__docker_ps / docker_logs / docker_run
  -> NO -> continue

Need GitHub operations (PR, issues)?
  -> YES + token available -> use mcp__github__*
  -> YES + no token -> use gh CLI
  -> NO -> continue

Need to check ESLint violations?
  -> YES -> use mcp__eslint__*
  -> NO -> continue

Need to save/search knowledge in the graph?
  -> YES -> use mcp__memory__create_entities, mcp__memory__search_nodes
  -> NO -> continue

Need step-by-step analysis of a complex problem?
  -> YES -> use mcp__sequential-thinking__*
  -> NO -> continue

No MCP matches -> use built-in tools (Bash, Grep, WebSearch, etc.)
```

### Mandatory Usage Rules

1. **MCP takes priority**: When an MCP tool can perform the task, USE IT INSTEAD of a built-in tool
2. **Check availability**: If an MCP tool returns an error (missing auth, plugin unavailable), fall back to alternatives
3. **Full names**: Always use the full `mcp__pluginname__toolname` format
4. **Don't mix**: For a single operation use either MCP or built-in, not both at the same time

### Examples

| Instead | Use | Agent |
|---------|-----|-------|
| `Bash "docker ps"` | `mcp__docker__docker_ps` | devops |
| `Bash "docker logs abc"` | `mcp__docker__docker_logs` | devops |
| `Bash "gh pr create ..."` | `mcp__github__create_pull_request` | gitops (when token available) |
| Guessing UI appearance | `mcp__playwright__browser_navigate` + `mcp__playwright__browser_screenshot` | developer, debugger |
| `Bash "npx eslint src/file.tsx"` | `mcp__eslint__*` | developer, reviewer |
| Manual write to MEMORY.md | `mcp__memory__create_entities` + `mcp__memory__create_relations` | developer, architect |
| Manual problem decomposition | `mcp__sequential-thinking__*` | architect, debugger |

## Adding Project-Specific Plugins

To add plugins like `postgres-mcp`, `redis-mcp`, `sonarqube`, `context7`, or `ssh-mcp`, configure them in `.claude/settings.json` under `mcpServers`. See settings.json for examples.
