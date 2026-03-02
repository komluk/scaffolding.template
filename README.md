# Scaffolding Template

Project template for the [scaffolding.tool](https://github.com/komluk/scaffolding.tool) platform. When a new project is created via the scaffolding platform, an init container copies the `stacks/_common/` files (plus stack-specific overlays) into the new project directory, processing `.tmpl` template variables along the way.

## Supported Stacks

| Stack | Directory | Init Image |
|-------|-----------|------------|
| React | `stacks/react/` | `ghcr.io/komluk/init-react` |
| Python | `stacks/python/` | `ghcr.io/komluk/init-python` |
| Node.js | `stacks/node/` | `ghcr.io/komluk/init-node` |
| Go | `stacks/go/` | `ghcr.io/komluk/init-go` |
| .NET | `stacks/dotnet/` | `ghcr.io/komluk/init-dotnet` |

## What Gets Deployed to New Projects

Every new project receives the full `stacks/_common/` contents plus its stack-specific overlay. This includes:

### 10 Specialized Agents

All agents are defined in `stacks/_common/.claude/agents/` and are available via the Claude Code Task tool:

| Agent | Purpose |
|-------|---------|
| **analyst** | Requirements, scope assessment, feasibility, proposal writing |
| **architect** | System design, API design, implementation planning |
| **researcher** | API integration research, library questions, best practices |
| **developer** | Implementation, bug fixes, features, tests, UI/styling |
| **debugger** | Bug reports, unexpected behavior, error diagnosis |
| **reviewer** | Code review, security analysis, threat modeling |
| **performance-optimizer** | Performance tuning, database design, query optimization |
| **tech-writer** | Documentation, README, CHANGELOG maintenance |
| **devops** | CI/CD, Docker, deployment, infrastructure |
| **gitops** | Branch management, conflict resolution, git history |

### 26 Skills (21 Universal + Stack-Specific)

Skills are auto-injected into agents via frontmatter. Located in `stacks/_common/.claude/skills/`:

**Universal skills (21):**
agent-memory, api-design, context-engineering, database-optimization, docker-templates, error-handling, git-operations, github-actions-template, logging-standards, mcp-tools, monitoring-observability, pattern-recognition, planning-methodology, quality-validation, research-methodology, security-review-checklists, spec-design, spec-develop, spec-research, spec-review, spec-workflow, testing-strategy, worktree-management

**Stack-specific skills:**
- React: mui-styling, react-patterns, state-management (`stacks/react/.claude/skills/`)
- Python: python-patterns (`stacks/python/.claude/skills/`)

### 15 Slash Commands

Located in `stacks/_common/.claude/commands/`:

| Command | Purpose |
|---------|---------|
| `/workflow` | Run the full agent chain (analyst -> architect -> developer -> reviewer -> tech-writer -> gitops) |
| `/context` | Load project context and routing rules |
| `/init-openspec` | Initialize OpenSpec in a project |
| `/generate-prp` | Generate a PRP (Prompt Routing Plan) |
| `/execute-prp` | Execute a generated PRP |
| `/specs:new` | Start a new spec-driven change |
| `/specs:ff` | Fast-forward: generate all spec artifacts at once |
| `/specs:apply` | Implement tasks from specs |
| `/specs:continue` | Continue a paused spec conversation |
| `/specs:verify` | Verify implementation matches specs |
| `/specs:archive` | Archive completed conversation specs |
| `/specs:sync` | Sync specs with current codebase state |
| `/specs:bulk-archive` | Archive multiple completed conversations |
| `/specs:onboard` | Onboard to an existing spec conversation |
| `/specs:explore` | Explore existing specs and conversations |

### Hooks

Located in `stacks/_common/.claude/hooks/`:

- **post-edit-review.sh** -- Runs after Edit/Write operations for quality checks
- **pre-commit-validation.sh** -- Runs before git commit to validate changes (auto-detects venv/venv_linux/.venv)

### Templates, Validators, and Output Styles

- **Templates** (`stacks/_common/.claude/templates/`): output-frontmatter.md, agents-overview.md, skills-overview.md, responsibility-matrix.md, CLAUDE.md.template
- **Validators** (`stacks/_common/.claude/validators/`): circuit-breaker.sh, validate-agent-output.sh
- **Output styles** (`stacks/_common/.claude/output-styles/`): clean-reports.md

### OpenSpec Integration

Spec-driven development protocol in `stacks/_common/.scaffolding/openspec/`:

- `config.yaml.tmpl` -- Project-level OpenSpec configuration (template-processed)
- `schemas/scaffolding-workflow/` -- Workflow schema with proposal, design, tasks, and spec templates

### Agent Memory Structure

Pre-created directory structure in `stacks/_common/.scaffolding/agent-memory/`:
- `shared/` -- Shared memory across agents
- `agents/` -- Per-agent memory storage

## Repository Structure

```
scaffolding.template/
  stacks/
    _common/                          # Shared across all stacks
      .claude/
        agents/                       # 10 agent definitions
        skills/                       # 21 universal skills
        commands/                     # 15 slash commands
          specs/                      # OpenSpec commands
        hooks/                        # Hook scripts
        templates/                    # Reference templates
        validators/                   # Validation scripts
        output-styles/                # Output formatting
        settings.json                 # Claude Code settings
      .scaffolding/
        openspec/                     # OpenSpec config and schemas
        agent-memory/                 # Pre-created memory directories
      .github/workflows/ci.yml       # CI pipeline template
      CLAUDE.md.tmpl                  # Main CLAUDE.md (template-processed)
      README.md.tmpl                  # Project README (template-processed)
      landing.html.tmpl               # Landing page (template-processed)
      .editorconfig
      .gitignore
      .dockerignore
    react/                            # React stack overlay
      .claude/skills/                 # React-specific skills
      Dockerfile
      docker/nginx.conf
    python/                           # Python stack overlay
      .claude/skills/                 # Python-specific skills
      Dockerfile
      main.py
      requirements.txt
    node/                             # Node.js stack overlay
      Dockerfile
      package.json
      src/index.js
    go/                               # Go stack overlay
      Dockerfile
      go.mod
      main.go
    dotnet/                           # .NET stack overlay
      Dockerfile
      Program.cs
      App.csproj
  docker/                             # Docker templates (shared)
    Dockerfile.react
    Dockerfile.python
    Dockerfile.node
    Dockerfile.go
    Dockerfile.dotnet
    nginx.conf
    .dockerignore
```

## Template Variables

Files with `.tmpl` extension are processed during project creation. The following variables are substituted:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `my-app` |
| `{{TECH_STACK}}` | Technology stack identifier | `react`, `python` |
| `{{DESCRIPTION}}` | Project description | `A web dashboard for...` |
| `{{PROJECT_ID}}` | Unique project UUID | `a1b2c3d4-...` |
| `{{APP_URL}}` | Base application URL | `https://example.com` |

## Init Image Build

Init images are built automatically by the `build-init-images.yml` GitHub Actions workflow when changes are pushed to the `stacks/` directory. Each stack gets its own init image that bundles `_common` files plus the stack overlay.

To build locally:

```bash
# Dry run (verify build context)
devops/scripts/build-init-images.sh --dry-run

# Build one stack without pushing
devops/scripts/build-init-images.sh --no-push react

# Build and push all stacks
devops/scripts/build-init-images.sh
```

## Known Issues (Pending Fixes)

The following items were identified during the sync review and still need to be addressed:

1. **CLAUDE.md.tmpl not fully rewritten** -- The template still uses `/opsx:` command prefix (should be `/specs:`), lists only 9 agents (missing `analyst`), and lacks several sections present in the current scaffolding.tool CLAUDE.md (Workflow Chain, Large Edit Prevention, Skills/Commands/Hooks).

2. **settings.json missing hooks and deny rules** -- The settings file has only a minimal `PreCompact` hook. It needs PostToolUse (post-edit-review), PreToolUse (pre-commit-validation), and SessionStart hooks. It also needs `permissions.deny` rules to block reads of venv/node_modules directories, an `env` section for `BASH_DEFAULT_TIMEOUT_MS`, and `skipDangerousModePermissionPrompt`.

3. **schema.yaml references outdated pipeline** -- The OpenSpec workflow schema description says "9-agent pipeline" (should be 10) and the apply instruction references `venv_linux` as the sole Python venv path (should use portable multi-venv detection).

## Contributing

1. Make changes in the appropriate `stacks/` directory
2. Test with a local init image build: `build-init-images.sh --no-push <stack>`
3. Verify no platform-specific paths: `grep -r '/opt/platform' stacks/_common/`
4. Push and create a pull request
5. After merge, GitHub Actions rebuilds all init images automatically

## License

MIT License - see [LICENSE](LICENSE)
