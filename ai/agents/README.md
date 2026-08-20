# AI Agents V1.2

本目录定义项目级 AI Agent。Agent 负责专业执行能力；Conversation Orchestrator 负责自然语言交互、路由、上下文恢复、用户确认、行动续接和周期任务调度，不新增业务 Agent。

## Core Agents

- Project Agent：新项目初始化、Project Context、基础设施 Readiness
- Product Agent：需求、业务目标、规则与验收标准
- Design Agent：UX/UI、视觉、交互与组件规范
- Planning Agent：技术方案、架构与任务拆解
- Engineering / Coding Agent：前后端及工程实现
- QA / Testing Agent：功能、接口、自动化与回归测试
- Compliance Agent：规则、约束和适用要求检查
- Release / Deploy Agent：构建、环境、版本与发布
- Maintenance Agent：上线后的维护与迭代
- Analytics Agent：项目 KPI、目标对比和数据报告
- Audit Agent：独立审计流程、结论、证据和 Gate

Iteration 是生命周期循环，不是 Agent。Conversation Orchestrator 不是业务 Agent。

## Project First

新项目必须首先进入 Project Agent。Project Agent 在收集最小必要项目信息的同时，自动检查仓库、分支、最新状态、工作树、依赖、Runtime、环境配置、Build/Test/Preview、版本、Figma 等基础设施。

可安全自动修复的直接修复；需要权限、Secret、登录、生产操作或人工决策的事项提示用户。

Project Gate 完成后必须询问用户是否进入 Product。

## Stage Human Gate

每个阶段完成后，默认向用户展示精简结果并询问是否进入下一阶段。阶段内部可自动连续执行，但不得未经用户确认静默跨阶段。

## Independent Quality Boundary

| 能力 | 核心问题 |
|---|---|
| Testing | 功能是否正确工作？ |
| Compliance | 是否符合规定、规则和约束？ |
| Audit | 流程、结论、证据和 Gate 是否真实、完整、可追溯？ |

三者独立：Testing PASS 不等于 Compliance PASS；Compliance PASS 不等于 Audit PASS。

## Conversation Orchestration

所有 Agent 都采用：

**User Intent → Context Resolution → Agent Routing → Required Input → Action → Verification / Gate → Human Gate / Next Action**

用户无需指定 Agent。能够自动执行时直接执行；只有缺少 Required Input、Human Gate、风险操作、规则冲突或阻塞时才主动提示用户。

## Weekly Project Intelligence

Analytics Agent 支持项目维度 KPI 周报；每周依据项目配置和用户填写/确认的数据自动汇总，并与 KPI Target 对比。每个数据项保留来源明细、口径、时间范围和 Evidence。

项目竞品跟踪按项目独立配置，每周自动汇总公开竞品变化并生成竞品周报；关键结论保留来源和时间信息。

详细规则：

- `ai/rules/CONVERSATION_ORCHESTRATION_V1.2.md`
- `ai/rules/STAGE_CONTRACT_V1.3.md`
- `ai/rules/AI_RULES_V1.2.md`
- `ai/rules/SCHEDULED_INTELLIGENCE_V1.2.md`
- `ai/knowledge-base/v1.2/AI_NATIVE_PROJECT_OS_V1.2.md`
