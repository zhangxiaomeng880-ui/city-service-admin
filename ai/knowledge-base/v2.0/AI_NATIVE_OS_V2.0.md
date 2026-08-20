# AI Native OS V2.2

## 定位
V2.2 将 Agent 协作、项目事实、质量边界、持续审计和 Contract Migration 固化为可验证、可追溯的项目操作系统。

## Core Architecture

```text
User Intent
↓
Conversation Orchestrator
↓
Project Context
↓
Iteration / Stage Router
↓
Agent Contract V2.1
↓
Standard Handoff
↓
Verification
↓
Gate Engine
↓
Independent Audit（Mandatory Trigger）
↓
Evidence
↓
Human Decision / Next Stage
```

## Agent Contract

当前执行 Agent 必须具备：Role / Boundary、Input、Required Input、Context Dependencies、Execution、Auto Actions、User Decision、Verification、Output、Evidence、Gate、Handoff、Failure / Escalation、User Prompt、Token Strategy。

新增 Agent 必须先满足 Contract，再进入 Audit。

## Current Agent Set

Project、Product、Design、Planning、Engineering、Testing、Compliance、Release、Maintenance、Analytics、Research/Competitor、Audit。

## Mandatory Audit

以下事件必须自动触发独立 Audit：

- 任意 Agent / Rule / Contract 更新
- Knowledge Base 更新
- Retrospective 更新
- 生命周期 / 阶段规则更新
- Gate / Handoff / Environment 规则更新
- 重大 Project Context 结构变更
- 阶段完成或 Gate 生成/变更
- Release 前
- 用户主动要求审计

修复后旧 PASS 自动失效，必须开启新的 Audit Cycle。

## V2.1 Migration Result

本轮已完成 Product、Design、Planning、Engineering、Testing、Compliance、Release、Maintenance、Analytics、Research/Competitor 的 V2.1 Agent Contract 建立/迁移，并完成独立 Audit Cycle。

Audit PASS 的范围仅为本次 Contract/规则迁移，不代表代码运行、业务功能或生产环境 PASS。

## Project Lifecycle

Project 支持 New Project 和 Existing Project Resume。Resume 后通过 Iteration Router 选择最小必要阶段。

## Quality Boundaries

Testing、Compliance、Audit 三者独立；任何一个 Gate PASS 不自动继承到另一个 Gate。

## Environment

Environment Matrix 统一维护 Local / Preview / Test / Production 的 Branch、Version、Commit、Status、Last Verified、Evidence。

## Failure Recovery

采用 Retry → Diagnose → Escalate；有限重试，不允许无限循环或伪造 PASS。

## Weekly Intelligence

KPI 与竞品以 Project 为边界持续运行，来源明细、Evidence 和目标对比必须保留。

## Minimum Token

Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand、Compressed Reporting。

**审计范围最小化，不取消审计；Token 优化不得减少关键验证。**

## Core Principle

> Agent 是能力，Orchestrator 是协作，Project Context 是事实，Handoff 是交接，Gate 是质量边界，Evidence 是依据，Audit 是独立持续监督，Human Gate 是责任确认，Iteration 是持续循环。