# Claude Code Hooks

This directory contains hooks that run automatically during Claude Code workflows.

## Available Hooks

### 1. post-edit-review.sh
**Type:** PostToolUse hook (Edit|Write)
**Purpose:** Suggests running code review commands after making code changes. Non-blocking (allows edit to proceed).

### 2. pre-commit-validation.sh
**Type:** PreToolUse hook (Bash git commit)
**Purpose:** Runs validation (`npm run validate` for frontend, `pytest` for backend) before a commit. Blocks the commit if validation fails.

### 3. block-force-push.sh
**Type:** PreToolUse hook (Bash git push)
**Purpose:** Blocks `--force`/`-f` pushes to protect shared history.

### 4. block-env-write.sh
**Type:** PreToolUse hook (Edit|Write)
**Purpose:** Blocks edits/writes to `.env` and other secret files.

### 5. block-destructive-rm.sh
**Type:** PreToolUse hook (Bash rm)
**Purpose:** Blocks dangerous recursive/force `rm` invocations.

### 6. file-staleness-check.sh
**Type:** PreToolUse hook (Edit|Write)
**Purpose:** Warns/blocks when editing a file whose on-disk state is newer than the last read snapshot.

### 7. file-staleness-update.sh
**Type:** PostToolUse hook (Edit|Write)
**Purpose:** Records the post-edit snapshot so staleness checks stay accurate.

### 8. session-start-protocol.sh
**Type:** SessionStart hook (startup|resume|compact)
**Purpose:** Injects the scaffolding routing protocol (bare-name agent delegation) into session context via `additionalContext`.

### 9. memory-project-id.sh
**Type:** SessionStart hook (startup|resume)
**Purpose:** Derives a stable project id from the git remote for semantic-memory scoping.

> Optional (not shipped/registered by default): `refresh-mcp-token.sh` for environments that pull an MCP bearer token from a local secret store. Add it manually if your project needs it.

## Hook Configuration

Hooks are configured in `.claude/settings.json`. See that file for:
- Which hooks are enabled
- Tool matchers (which tools trigger which hooks)
- Hook execution order

## Making Hooks Executable

On Unix systems, hooks need execute permissions:

```bash
chmod +x .claude/hooks/*.sh
```

On Windows with Git Bash, this is handled automatically.

## Testing Hooks

### Test post-edit-review.sh
```bash
# Make a test edit and see the suggestion
echo "test" >> test.txt
```

### Test pre-commit-validation.sh
```bash
# Try to commit with validation errors
cd app/frontend
# Make a breaking change
git add .
git commit -m "test commit"
# Hook should block if validation fails
```

## Disabling Hooks

To temporarily disable hooks, comment them out in `.claude/settings.json`:

```json
{
  "hooks": {
    // "PostToolUse": [ ... ]
  }
}
```

## Hook Best Practices

1. **Fast execution** - Hooks should run quickly (< 5 seconds)
2. **Clear output** - Always explain what the hook is doing
3. **Non-breaking** - PostToolUse hooks should exit 0 to allow operation
4. **Blocking when needed** - PreToolUse hooks can exit 1 to block bad operations
5. **Helpful messages** - Guide users on how to fix issues

## Troubleshooting

**Hook not running:**
- Check `.claude/settings.json` configuration
- Verify hook file has execute permissions
- Check hook script for syntax errors

**Hook always fails:**
- Test the hook script manually: `bash .claude/hooks/script.sh`
- Check that required tools are available (npm, pytest, etc.)
- Verify paths are correct (hooks run from repository root)

## Future Hooks

Ideas for additional hooks:
- Pre-push hook: Run full test suite before pushing
- Post-commit hook: Generate changelog entry
- Pre-PR hook: Verify PR requirements met
