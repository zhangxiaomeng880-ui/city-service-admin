# AI Native OS V2.1

## 定位
V2.1 不以增加 Agent 数量为核心，而是把 Agent 协作、项目事实、质量边界和持续审计标准化，使项目从“Agent 流程”升级为可验证、可追溯的项目操作系统。

## 1. Core Architecture

```text
User Intent
↓
Conversation Orchestrator
↓
Project Context
↓
Iteration / Stage Router
↓
Agent
↓
Standard Handoff
↓
Verification
↓
Gate Engine
↓
Independent Audit（按触发规则）
↓
Evidence
↓
Human Decision / Next Stage
```

## 2. Project Context

Project Context 是跨 Agent 的唯一项目事实入口。维护项目基本信息、业务规则、技术信息、版本、环境、KPI、竞品、当前状态、Blocker、Decision、Gate 和历史。Agent 不应依赖聊天历史作为唯一事实源。

## 3. Agent Contract

所有 Agent 从项目开始即使用统一 Agent Contract：Role、Input、Required Input、Execution、Verification、Output、Evidence、Gate、Handoff、Failure、User Prompt、Token Strategy。

## 4. Handoff

Agent 间不依赖长文本交接，使用 Standard Handoff。下游只读取必要字段；完整证据按需读取。

## 5. Gate Engine

统一 Gate 状态和证据要求，但不统一专业判断责任。Testing、Compliance、Audit 保持独立。

## 6. Mandatory Audit

Audit Agent 是独立 Agent，不是最终阶段的可选摆设。

以下事件必须触发独立 Audit：

- 任意 Agent / Rule / Contract 更新
- Knowledge Base 更新
- Retrospective 更新
- 生命周期或阶段规则更新
- Gate 规则更新
- 重大 Project Context 结构变更
- 阶段完成或 Gate 生成/变更
- Release 前
- 用户主动要求审计

变更被修复后必须产生新的 Audit Cycle，旧 PASS 不得沿用。

## 7. Project Lifecycle

Project 支持 New Project 和 Existing Project Resume。已有项目恢复后，根据本次变化通过 Iteration Router 选择最小必要阶段。

## 8. Iteration Router

根据用户意图、变更范围、风险、Project Context、已有 Gate 和环境状态动态选择阶段。不能为了缩短路径跳过必要质量、安全或合规 Gate。

## 9. Environment Matrix

统一维护 Local / Preview / Test / Production 的 Branch、Version、Commit、Status、Last Verified 和 Evidence。环境状态必须独立验证。

## 10. Failure Recovery

所有自动执行都有有限重试边界。失败必须分类；安全可重复操作可重试，关键失败进入 Diagnose / Escalate，不能无限循环或伪造 PASS。

## 11. User Interaction Types

- Inform：通知
- Confirm：确认下一步
- Decision：业务选择
- Approval：正式批准
- Manual Action：用户必须执行外部操作
- Risk Confirmation：高风险操作确认

## 12. Project Status

用户可以随时询问项目状态。Status Snapshot 从 Project Context、Handoff、Gate、Evidence、Environment Matrix 和 Intelligence 生成，不依赖模型猜测。

## 13. Weekly Intelligence

KPI 和竞品继续项目维度周期化运行，数据来源明细和 Evidence 是强制要求。

## 14. Minimum Token

Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand、Compressed Reporting。

质量优先级：

**准确性/安全性 > 规则完整性 > 验证完整性 > 可追溯性 > 用户体验 > Token 优化。**

## 15. Core Principle

> Agent 是能力，Orchestrator 是协作，Project Context 是事实，Handoff 是交接，Gate 是质量边界，Evidence 是依据，Audit 是独立监督，Human Gate 是责任确认，Iteration 是持续循环。
