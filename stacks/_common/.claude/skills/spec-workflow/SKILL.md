---
name: spec-workflow
description: "OpenSpec lifecycle orchestration for /workflow chains"
---

# OpenSpec Workflow Orchestration

Spec-driven development protocol for coordinating multi-agent workflows.

## Directory Structure

```
.scaffolding/conversations/{conversation_id}/specs/
  proposal.md   -- WHY (researcher)
  design.md     -- WHAT + HOW (architect)
  tasks.md      -- checklist (architect)
```

## Status Lifecycle

Tracked in `.scaffolding/conversations/{conversation_id}/context.json`:

| Status | Meaning | Transition |
|--------|---------|------------|
| `exploring` | Research phase | -> `drafting` when proposal done |
| `drafting` | Design + tasks | -> `implementing` when tasks done |
| `implementing` | Code changes | -> `reviewing` when tasks complete |
| `reviewing` | Verification | -> `complete` when verified |
| `complete` | Done | -> `archived` on request |
| `archived` | Historical | Terminal state |

## Agent Routing in /workflow

| Phase | Agent | Reads | Writes | Gate |
|-------|-------|-------|--------|------|
| 1. Research | researcher | requirements | `proposal.md` | score >= 80 |
| 2. Design | architect | `proposal.md` | `design.md`, `tasks.md` | score >= 85 |
| 3. Apply | developer | `tasks.md`, `design.md` | source code | validation passes |
| 4. Verify | reviewer | `design.md`, `tasks.md` | review report | no criticals |

## When to Create vs Skip Specs

| Task Type | Use Specs? | Reason |
|-----------|-----------|--------|
| New feature | Yes | Needs design, multi-file |
| Architecture change | Yes | Needs decisions documented |
| Multi-agent workflow | Yes | Needs coordination |
| Bug fix (simple) | No | Direct to developer |
| Typo / config tweak | No | Direct to developer |
| Single-file refactor | No | Direct to developer |

## Orchestration Steps

1. **Create specs directory**: `mkdir -p .scaffolding/conversations/{conversation_id}/specs/`
2. **Set specs_path**: `.scaffolding/conversations/{conversation_id}/specs/`
3. **Pass specs_path** in every agent delegation prompt:
   ```
   Specs path: .scaffolding/conversations/{conversation_id}/specs/
   Write your output to {specs_path}/proposal.md
   ```
4. **Update context.json** status after each phase transition
5. **Gate enforcement**: Block next phase if quality gate fails

## Context JSON Schema

```json
{
  "conversation_id": "abc-123",
  "status": "implementing",
  "created_at": "2026-01-15T10:00:00Z",
  "description": "Feature description",
  "agents_involved": ["researcher", "architect", "developer"]
}
```

## Schema Reference

Custom schema: `.scaffolding/openspec/schemas/` (project-specific)
Config: `.scaffolding/openspec/config.yaml`
Templates: `.scaffolding/openspec/schemas/templates/` (if configured)
