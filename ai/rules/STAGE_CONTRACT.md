# Stage Contract V1.0

## Purpose
统一所有 Stage Agent 的输入解析、执行、输出、Gate、Handoff 和状态管理。

## Input Source Priority

Stage Input 按以下优先级解析：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. User Input

User Input 仅用于补充前三层仍缺失的 Required Input，或明确覆盖已有信息。

## Input Readiness

执行任何阶段前必须：

1. Load Project Context
2. Load Previous Stage Output
3. Load applicable Knowledge
4. Validate Required Input
5. 判断是否存在 Blocker

已有信息不得重复询问。

## Execution Contract

每次阶段执行必须输出：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

## Status

- `COMPLETED`：阶段目标完成，Gate 通过。
- `PARTIAL`：已完成部分工作，但仍有非阻塞未完成项。
- `BLOCKED`：存在阻塞项，无法继续正式执行。
- `SKIPPED`：按项目条件跳过，但仍必须保留 Stage Agent / Contract / 状态记录，不得删除阶段能力。

## Gate

Gate 必须明确：

- Required Input 是否齐全
- Blocker 是否存在
- Output 是否完整
- Output Verification 是否通过
- 是否允许 Handoff

## Handoff

Handoff 必须携带：

- Project Context Reference
- Current Stage Output
- Gate Result
- Outstanding Warnings / Blockers
- Next Stage Required Input

## Context Reuse

Stage 切换、Resume、Continue 和 Handoff 不重置 Project Context。只有用户明确修改时才更新已有值。

## Execution Continuity

同一问题第一次无法解决时必须记录 Blocked 原因和缺失项。不得通过重复询问相同信息形成循环；连续阻塞必须进入 Review / Evolution 并同步 Knowledge。
