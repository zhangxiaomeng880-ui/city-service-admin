# Execution Identity Rules V1.0

## Primary Identity
All project execution records must link the responsible human/user identity to the user's **Gmail account** as the primary identity key.

Field:
- `Primary Account: Gmail Account`

The actual Gmail address must come from an explicitly available account identity and must not be inferred from a Figma handle, workspace name, or other tool metadata.

## Tool Identity
Tool-specific identities are secondary execution-environment metadata only:
- Figma Handle
- Figma Workspace / Team
- Seat / Permission
- File Key

They must not replace the Gmail identity as the person-level identity.

## Agent Identity
Agent execution is identified separately:
- Agent
- Stage
- Checklist Item ID
- Execution Time
- Result

## Example
```text
Primary Account: <Gmail Account>
Agent: Design Agent
Tool: Figma
Figma Handle: <tool handle>
Workspace: <workspace>
Seat: <seat>
File: <Figma file>
```

## Privacy / Accuracy Rule
Do not guess or reconstruct a Gmail address from another identifier. If the Gmail identity is unavailable to the execution environment, record it as `Unresolved` and do not substitute a different email address.
