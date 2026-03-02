---
description: "Run a development workflow -- OpenSpec-driven agent orchestration chain"
---

# /workflow Command

Run a multi-agent workflow chain using OpenSpec artifacts for inter-agent communication.

## Usage

```
/workflow <description>                     # Run the full agent chain
/workflow status <conversation-id>          # Show workflow progress
```

## Argument Parsing

Parse the input `$ARGUMENTS` to determine the subcommand:

| Pattern | Subcommand | Example |
|---------|------------|---------|
| Starts with `status ` | **status** -- next word is conversation-id | `/workflow status abc-123` |
| Anything else | **run** -- entire input is the description | `/workflow "add user profile page"` |

---

## Subcommand: status

Show the current execution state of a workflow by inspecting its specs directory.

**Input**: conversation_id (UUID) of the workflow run to inspect.

Check `$SPECS_PATH/.scaffolding/conversations/<conversation_id>/specs/` for:
- `proposal.md` -- Requirements (analyst phase complete)
- `design.md` -- Design document (architect phase complete)
- `tasks.md` -- Implementation checklist (architect phase complete, check `[x]` vs `[ ]` for progress)
- Review the `context.json` if present for status tracking

Display a summary of which phases are complete and which tasks remain.

---

## Subcommand: run (default)

Orchestrate a full workflow execution through the agent chain.

### Step 1: Initialize

1. Generate a UUID for this workflow: `uuidgen`
2. Set `specs_path=.scaffolding/conversations/{uuid}/specs/`
3. Create the specs directory: `mkdir -p $specs_path`
4. Create context.json with initial state:
   ```json
   {
     "conversation_id": "<uuid>",
     "status": "exploring",
     "created_at": "<ISO timestamp>",
     "description": "<user description>"
   }
   ```

### Step 2: Analyst Phase

Dispatch to analyst to create the proposal:

```
Task(subagent_type="analyst", prompt="Analyze this request and write proposal.md.\nUser request: <description>\nSpecs path: <specs_path>\nWrite output to: <specs_path>/proposal.md")
```

Update context.json status to `drafting`.

If the analyst indicates external research is needed, dispatch to researcher:

```
Task(subagent_type="researcher", prompt="Research the topics flagged in proposal.md.\nSpecs path: <specs_path>\nRead: <specs_path>/proposal.md")
```

### Step 3: Architect Phase

Dispatch to architect for design and task planning:

```
Task(subagent_type="architect", prompt="Create design.md and tasks.md based on proposal.md.\nSpecs path: <specs_path>\nRead: <specs_path>/proposal.md\nWrite: <specs_path>/design.md and <specs_path>/tasks.md")
```

**Quality Gate**: Architect must self-score >= 85 to proceed.

Update context.json status to `implementing`.

### Step 4: Developer Phase

Dispatch to developer for implementation:

```
Task(subagent_type="developer", prompt="Execute implementation tasks.\nSpecs path: <specs_path>\nRead tasks from: <specs_path>/tasks.md\nFollow design in: <specs_path>/design.md")
```

**Quality Gate**: Validation must pass.

### Step 5: Reviewer Phase

Dispatch to reviewer for code review:

```
Task(subagent_type="reviewer", prompt="Review the implementation.\nSpecs path: <specs_path>\nDesign: <specs_path>/design.md\nTasks: <specs_path>/tasks.md")
```

**Quality Gate**: No critical issues.

Update context.json status to `reviewing`.

### Step 6: Tech-Writer Phase

Dispatch to tech-writer for documentation:

```
Task(subagent_type="tech-writer", prompt="Update documentation for the changes made.\nSpecs path: <specs_path>")
```

### Step 7: GitOps Phase

Dispatch to gitops for push:

```
Task(subagent_type="gitops", prompt="Push committed changes to remote.\nVerify unpushed commits exist, then push.")
```

Update context.json status to `complete`.

### Step 3 (Final): Report

Display final workflow status showing:
- Workflow conversation ID
- Overall status (completed/failed)
- Each phase with its result

---

## UUID Enforcement

**CRITICAL**: The `conversation_id` used for specs directories MUST be a UUID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`). NEVER use descriptive names. Generate one with `uuidgen` before proceeding.

## Rules

- NEVER skip phases -- execute every phase in order
- If a phase agent fails, report the failure and stop
- Use the exact agent name as the `subagent_type` parameter
- Keep summaries concise when reporting phase results

## Inter-Agent Communication

| Agent | Role | Reads | Writes |
|-------|------|-------|--------|
| analyst | Requirements Analyst | -- | Creates `specs/` directory, `specs/proposal.md` |
| researcher | External Research (conditional) | Requirements | ResearchPack (when flagged by analyst) |
| architect | Technical Design & Plan | `specs/proposal.md` | `specs/design.md`, `specs/tasks.md` |
| developer | Developer | `specs/tasks.md`, `specs/design.md` | Source code, marks tasks |
| reviewer | Reviewer | `specs/design.md`, source | Review report |
| tech-writer | Documenter | All artifacts | Docs, CHANGELOG |
| gitops | Push & verify | -- | git push result |

## Quality Controls

| Phase | Agent | Threshold | Blocks |
|-------|-------|-----------|--------|
| Analyze | analyst | proposal.md written | Design |
| Research (conditional) | researcher | >= 80 | Design (when invoked) |
| Specify | architect | >= 85 | Implement |
| Implement | developer | Tests pass | Verify |
| Verify | reviewer | No criticals | Document |
| Push | gitops | Push succeeds | -- |

## Error Recovery

If implementation fails after 3 self-corrections:
1. Circuit breaker opens
2. `tasks.md` shows which tasks completed vs pending
3. Manual intervention required
4. Run `/workflow` again after fixing root cause (specs directory preserves progress)

## Examples

```bash
# Run full workflow
/workflow "Refactor user settings page to use tabs"

# Check status of a running workflow
/workflow status f2e623f3-a009-4ccd-abf5-3c6449fb1a0a
```
