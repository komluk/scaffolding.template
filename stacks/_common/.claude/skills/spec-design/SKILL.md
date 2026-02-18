---
name: spec-design
description: "How to write OpenSpec design.md and tasks.md artifacts"
---

# OpenSpec Design & Tasks Writing

Guide for creating `design.md` (WHAT + HOW) and `tasks.md` (implementation checklist).

## Prerequisite

Read `{specs_path}/proposal.md` first. Reference its capabilities and impact sections.

## design.md

### Output Path

Write to: `{specs_path}/design.md`

### Required Sections

| Section | Purpose | Format |
|---------|---------|--------|
| **Context** | Background, current state, constraints | Prose |
| **Goals / Non-Goals** | Scope boundaries | Bullet lists |
| **Specifications** | Requirements + scenarios | GIVEN/WHEN/THEN |
| **Decisions** | Technical choices + rationale | Decision: Why X over Y |
| **Risks / Trade-offs** | Known limitations | [Risk] -> Mitigation |
| **Migration Plan** | Deploy + rollback steps | Checklist (if applicable) |
| **Open Questions** | Unresolved items | Numbered list |

### Specification Format

```markdown
### Requirement: user-session-timeout

The system SHALL terminate idle sessions after 30 minutes.

#### Scenario: session expires after inactivity

- **GIVEN** a user has an active session
- **WHEN** no activity occurs for 30 minutes
- **THEN** the session is invalidated and user is redirected to login
```

Rules:
- Use SHALL/MUST for normative requirements (avoid should/may)
- Every requirement MUST have at least one scenario
- Each scenario is a potential test case
- Map capabilities from proposal.md to requirement groups

### Decision Format

```markdown
## Decisions

### Use Redis for session storage
**Alternatives**: PostgreSQL, in-memory
**Rationale**: Sub-millisecond lookups, built-in TTL, already in stack
```

### Implementation Constraints

Include in all designs:
- Max 200 lines per Edit operation
- Files must stay under 500 lines
- Include project-specific validation commands per group
- Map steps to specific workflow chain agents

## tasks.md

### Output Path

Write to: `{specs_path}/tasks.md`

### Format Rules

| Rule | Detail |
|------|--------|
| Group by `## N. Group Name` | Numbered headings |
| Checkbox per task | `- [ ] N.M Task description` |
| Dependency order | Tasks ordered by what must come first |
| File paths | Include target file path in task |
| Acceptance criteria | Each task independently verifiable |
| Validation step | Include project validation command per group |
| Size | Each task completable in one session |

### Template

```markdown
## 1. Setup
- [ ] 1.1 Create module/package structure for the feature
- [ ] 1.2 Add dependencies to project manifest

## 2. Core Implementation
- [ ] 2.1 Implement service/business logic
- [ ] 2.2 Add data models/schemas
- [ ] 2.3 Add API routes/endpoints
- [ ] 2.4 Run validation: `<project validation command>`

## 3. Frontend + Tests
- [ ] 3.1 Add types/interfaces
- [ ] 3.2 Create component, add unit + integration tests
- [ ] 3.3 Run validation: `<project validation command>`
```

## Quality Checklist

- [ ] design.md references proposal.md capabilities
- [ ] Every requirement has GIVEN/WHEN/THEN scenarios
- [ ] Decisions include alternatives considered
- [ ] Risks have specific mitigations
- [ ] tasks.md uses checkbox format (`- [ ]`)
- [ ] Tasks ordered by dependency
- [ ] Each group has a validation step
- [ ] File paths included in task descriptions
