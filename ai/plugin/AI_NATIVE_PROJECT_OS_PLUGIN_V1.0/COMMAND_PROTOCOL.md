# Command Protocol V1.0

| Command | Behavior |
|---|---|
| `启动 [Stage]` | Load context, verify input, pass gate and start execution |
| `继续 [Stage]` | Re-verify and resume from Resume Point |
| `检查 [Stage]` | Audit without executing |
| `复盘 [Stage]` | Review actual execution and improvement opportunities |
| `全量执行项目` | Advance through the canonical lifecycle using gates and conditional rules |
| `检查全部 Agent MD` | Audit all Agent contracts |
| `更新 Knowledge` | Deduplicate and persist validated knowledge and Evolution |

## Stage response protocol

When a stage starts, the plugin should show:

1. Stage and current status
2. Required Input and current readiness
3. Input Verification result
4. Gate decision
5. Execution plan

During execution it should record meaningful decisions, gaps and evidence without unnecessary progress narration.

When execution finishes it should show:

1. Output artifacts
2. Output Verification result
3. Gate result
4. Handoff target
5. New Stage Status

## User interruption rule

Do not ask the user to repeat known context. Interrupt only when the plugin is BLOCKED or a Human Gate / decision is required.
