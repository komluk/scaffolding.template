# Changelog

All notable changes to the scaffolding.template repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **10 Agent Definitions** (2026-03-02)
  - Added all 10 specialized agents to `stacks/_common/.claude/agents/`: analyst, architect, researcher, developer, debugger, reviewer, performance-optimizer, tech-writer, devops, gitops
  - All agents genericized: no platform-specific paths, no hardcoded MCP servers, portable venv references
  - Each agent includes responsibility boundaries, output format templates, and quality gate criteria

- **21 Universal Skills** (2026-03-02)
  - Added to `stacks/_common/.claude/skills/`: agent-memory, api-design, context-engineering, database-optimization, docker-templates, error-handling, git-operations, github-actions-template, logging-standards, mcp-tools, monitoring-observability, pattern-recognition, planning-methodology, quality-validation, research-methodology, security-review-checklists, testing-strategy, worktree-management
  - Updated existing spec skills (spec-workflow, spec-design, spec-develop, spec-review, spec-research) to match current scaffolding.tool versions
  - Skills with bundled references: docker-templates (Dockerfiles, compose examples), github-actions-template (CI template), security-review-checklists (OWASP, auth checklists)

- **Stack-Specific Skills** (2026-03-02)
  - React: mui-styling, react-patterns, state-management in `stacks/react/.claude/skills/`
  - Python: python-patterns in `stacks/python/.claude/skills/`

- **15 Slash Commands** (2026-03-02)
  - Top-level: workflow, context, init-openspec, generate-prp, execute-prp
  - OpenSpec commands in `specs/`: new, ff, apply, continue, verify, archive, sync, bulk-archive, onboard, explore
  - All commands use relative paths and are fully portable

- **Hook Scripts** (2026-03-02)
  - `post-edit-review.sh` -- quality check after Edit/Write operations
  - `pre-commit-validation.sh` -- pre-commit validation with multi-venv detection (venv, .venv, venv_linux)
  - Hook README with setup instructions

- **Templates** (2026-03-02)
  - output-frontmatter.md -- structured output format for agent reports
  - agents-overview.md -- reference for all 10 agents
  - skills-overview.md -- reference for all skills
  - responsibility-matrix.md -- agent ownership boundaries
  - CLAUDE.md.template -- reference template for CLAUDE.md structure

- **Validators** (2026-03-02)
  - circuit-breaker.sh -- prevents infinite retry loops in agent execution
  - validate-agent-output.sh -- validates agent output matches expected frontmatter format

- **Output Styles** (2026-03-02)
  - clean-reports.md -- clean formatting rules for agent output

- **OpenSpec Schema Updates** (2026-03-02)
  - Synced proposal.md, design.md, tasks.md, spec.md templates with current scaffolding.tool versions

- **Agent Memory Structure** (2026-03-02)
  - Pre-created `.scaffolding/agent-memory/shared/` and `.scaffolding/agent-memory/agents/` directories with .gitkeep files

### Changed

- **README.md** (2026-03-02)
  - Complete rewrite documenting the full template feature set: 10 agents, 26 skills, 15 commands, hooks, templates, validators, OpenSpec integration
  - Added repository structure diagram, template variables reference, and init image build instructions

- **.claude/README.md** (2026-03-02)
  - Updated to reflect actual file structure (agents, skills, commands, hooks, templates, validators, output-styles) instead of referencing symlink-based inheritance

### Known Issues

The following items were identified during the post-sync review and remain to be fixed:

1. **CLAUDE.md.tmpl not rewritten** -- Still uses `/opsx:` command prefix instead of `/specs:`, lists only 9 agents (missing `analyst`), and lacks Workflow Chain, Large Edit Prevention, and Skills/Commands/Hooks sections
2. **settings.json incomplete** -- Missing PostToolUse, PreToolUse, and SessionStart hooks; missing `permissions.deny` rules for venv/node_modules; missing `env.BASH_DEFAULT_TIMEOUT_MS`; missing `skipDangerousModePermissionPrompt`
3. **schema.yaml outdated references** -- Description says "9-agent pipeline" (should be 10); apply instruction uses `venv_linux` as sole Python venv path instead of portable multi-venv detection
