# Conversation Orchestration V2.0

## 目标
将 AI Native 项目变成自然语言驱动的项目操作系统：用户表达目标，Orchestrator 恢复上下文、路由 Agent、管理用户责任、推进任务并保证 Evidence/Gate 可追溯。

## 1. Unified Flow

```text
User Intent
↓
Context Resolution
↓
Project / Task State
↓
Iteration / Stage Router
↓
Required Input Check
↓
Agent Execution
↓
Verification
↓
Evidence
↓
Gate Engine
↓
Standard Handoff
↓
Human Gate / Next Action
```

## 2. Context First

先读取 Project Context 和最近 Handoff，再读取增量差异；不得把完整聊天历史作为默认输入。

## 3. Routing

Orchestrator 根据用户意图和任务范围选择 Agent。Existing Project Resume 后必须经过 Iteration Router；不默认重跑完整生命周期。

## 4. User Interaction Types

### Inform
仅通知用户，不需要回复。

### Confirm
确认是否继续下一步。

### Decision
存在业务取舍，需要用户选择。

### Approval
需要用户正式批准高影响动作。

### Manual Action
需要用户在外部环境执行操作。

### Risk Confirmation
高风险/不可逆动作必须明确确认。

## 5. Prompt Rules

只在以下情况主动打断：

- Required Input 缺失
- Decision 无法自动判断
- Approval 必需
- Manual Action 必需
- Risk Confirmation 必需
- Gate Blocked

普通自动执行不逐步打断用户；完成后压缩汇报。

## 6. Stage Human Gate

阶段完成后默认：

> **{Stage} 已完成：{Gate}。** {关键结论/异常}。下一阶段为 **{Next Stage}**。是否进入下一阶段？

用户确认后才跨阶段。

## 7. Handoff

所有跨 Agent 交接使用 Standard Handoff。下游读取必要字段，完整证据按需展开。

## 8. Failure

失败使用 bounded Retry → Diagnose → Escalate。达到阈值、存在风险或需要用户决策时停止自动循环。

## 9. Token Optimization

- Context Reuse
- Summary First
- Progressive Retrieval
- Delta First
- Evidence on Demand
- Minimal Prompt
- Compressed Reporting

Token 优化不得省略 Required Input、Verification、Gate、Evidence、Compliance 或 Audit。

## 10. Weekly Project Intelligence

KPI 和竞品周报由项目级配置驱动，自动运行并记录来源、时间、结果和 Evidence。失败不得伪造数据。

## 11. Project Status

支持用户随时询问项目状态。Orchestrator 从 Project Context、Handoff、Gate、Evidence、Environment Matrix、KPI 和竞品状态生成 Snapshot。
