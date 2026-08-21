# Command Protocol V1.1

## Supported Commands

- 启动 [Stage]
- 继续 [Stage]
- 检查 [Stage]
- 复盘 [Stage]
- 恢复 [Task / Stage]
- 全量执行项目
- 更新 Knowledge
- 审计 [Stage / Artifact / Agent]

## Command Execution

所有命令统一执行：

```text
Command / Trigger
↓
Resolve Target
↓
Load Project Context
↓
Load Current State / Resume Point
↓
Load Previous Phase Output / Current Stage State
↓
Load Knowledge / Rules / Contract
↓
Input Readiness
↓
Routing / Process Agent
↓
Execution
↓
Output Verification
↓
Quality Gate
↓
Independent Audit when required
↓
Handoff / Persist
↓
Next-Phase Readiness / User Gate
```

## Context Reuse

命令执行前必须复用已有项目上下文。不得因为进入新 Stage、Continue、Resume 或 Handoff 而重新索取已经确认的 Repository、Branch、Runtime、Version、Workspace 等信息。

## Missing Input

只有当前命令的 Required Input 无法从 Project Context、Previous Phase Output、Knowledge Base、Resume Point 获取时，才请求用户补充。

## Resume

`恢复` 必须从 Resume Point 继续，不重新执行已验证步骤；恢复后只对受影响范围重新进行 Verification / Gate / Audit。

## Persistence

执行产生的新项目级信息、Stage 状态、Decision、Output、Verification、Audit、Evidence、Handoff 和 Evolution 必须写回对应 Git 资产。

## Loop Prevention

同一阻塞不得重复询问。第一次阻塞记录原因；重复阻塞触发 Review / Evolution，并将有效修正规则写入 Knowledge。
