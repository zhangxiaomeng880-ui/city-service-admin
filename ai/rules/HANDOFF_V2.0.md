# Standard Handoff V2.0

Agent 之间禁止依赖长文本自然语言交接，统一使用结构化 Handoff。

## Schema

- Project ID / Project Context Version
- Current Stage
- Task / Scope
- Agent
- Objective
- Inputs Used
- Decisions
- Output Summary
- Artifacts
- Evidence References
- Verification Result
- Gate
- Blockers
- Warnings
- Open Questions
- Next Stage
- Next Stage Required Input
- User Confirmation State
- Version / Branch / Environment
- Timestamp

## Rules

1. 已确认事实不得在下游重新询问。
2. 未确认信息必须标记 Unknown，不得推测。
3. Gate 状态必须来自责任 Agent。
4. Audit 必须能够独立读取 Handoff 与 Evidence。
5. Handoff 只传递下游必要信息；完整证据按需读取。
