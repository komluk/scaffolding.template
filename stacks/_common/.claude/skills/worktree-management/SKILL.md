---
name: worktree-management
description: "Scaffolding.tool worktree lifecycle management, diagnostics, and recovery. Use when debugging worktree issues or managing task isolation."
---

# Worktree Management Skill

## Purpose
Scaffolding.tool-specific worktree lifecycle management, diagnostics, and recovery procedures.

## Worktree Lifecycle

```
create_worktree() --> agent executes --> commit_worktree_changes()
    --> merge_worktree() --> post_merge_git_ops() --> remove_worktree()
```

### States (WorktreeStatus enum)
| Status | Meaning |
|--------|---------|
| `ready` | Created, waiting for task execution |
| `merging` | Merge in progress |
| `merged` | Successfully merged to main |
| `conflict` | Merge conflict detected |
| `cleanup` | Being removed |
| `removed` | Fully cleaned up |

## File Locations

| Resource | Path |
|----------|------|
| Worktrees directory | `.scaffolding/worktrees/` |
| Worktree metadata | `.scaffolding/worktrees/{task_id[:12]}/worktree.json` |
| Branch naming | `scaffolding/{task_id[:12]}` |

## Diagnostics

### List All Worktrees
```bash
git worktree list
ls -la .scaffolding/worktrees/
```

### Find Uncommitted Changes
```bash
for d in .scaffolding/worktrees/*/; do
  changes=$(cd "$d" && git status --porcelain 2>/dev/null | wc -l)
  if [ "$changes" -gt 0 ]; then
    echo "UNCOMMITTED: $d ($changes files)"
  fi
done
```

## Recovery Procedures

### Force Remove Corrupt Worktree
```bash
git worktree remove --force .scaffolding/worktrees/{task_id[:12]}
git branch -D scaffolding/{task_id[:12]}
rm -rf .scaffolding/worktrees/{task_id[:12]}
git worktree prune
```

### Recover Uncommitted Work
```bash
cd .scaffolding/worktrees/{task_id[:12]}
git add -A && git stash
cd /project/root && git stash pop
```
