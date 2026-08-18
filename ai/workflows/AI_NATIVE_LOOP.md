# AI Native Loop

```text
用户问题 / 产品目标
        ↓
Research
        ↓
Opportunity
        ↓
Product / PRD
        ↓
Design
        ↓
Planning / Task
        ↓
Engineering
        ↓
QA / Review
        ↓
Release
        ↓
Analytics
        ↓
Feedback / Insight
        └────────→ 下一轮 Research
```

## 阶段原则

每一阶段都要有明确输入和输出，并尽可能建立到 GitHub Issue / Project、代码 Commit、测试结果或发布记录的追溯关系。

## Context 继承

阶段切换不是上下文重置。每一阶段执行前统一按以下顺序恢复输入：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. User Input（仅补充缺失 Required Input）

已确认且仍有效的信息必须复用，不得重复询问。`继续 [Stage]`、Handoff 和 Resume 都必须恢复 Project Context。

## Stage Execution Contract

每个 Stage 执行必须能够输出：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

Stage 状态统一使用：`COMPLETED / PARTIAL / BLOCKED / SKIPPED`。

## 人与 AI

- 人：目标、判断、优先级、业务取舍、最终验收。
- AI：研究整理、分析、方案草拟、任务拆解、实现、验证辅助、文档和总结。

AI 可以跨阶段协作，但不能用“自动生成”代替产品判断。

## Execution Continuity

同一问题首次无法解决时必须明确 Blocked 原因；连续阻塞不得重复询问相同信息，应触发 Review / Evolution 并将修正规则沉淀到 Knowledge。
