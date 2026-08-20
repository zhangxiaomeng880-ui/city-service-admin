# AI Agents V2.0

本目录定义项目级专业 Agent。Agent 负责专业执行能力；Conversation Orchestrator 负责自然语言交互、Context Resolution、路由、用户责任确认、状态恢复和周期任务调度。

## Core Agents

- Project Agent：New Project、Existing Project Resume、Project Context、基础设施/版本/Git 状态
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

Iteration 是生命周期循环，不是 Agent；Conversation Orchestrator 不是业务 Agent。

## V2.0 Foundation

所有 Agent 从项目开始即遵循：

- `ai/rules/AGENT_CONTRACT_V2.0.md`
- `ai/rules/HANDOFF_V2.0.md`
- `ai/rules/GATE_ENGINE_V2.0.md`
- `ai/rules/ITERATION_ROUTER_V2.0.md`
- `ai/rules/ENVIRONMENT_MATRIX_V2.0.md`
- `ai/rules/FAILURE_RECOVERY_V2.0.md`
- `ai/rules/PROJECT_STATUS_V2.0.md`

## Project First

Project Agent 是所有新项目和已有项目恢复的入口。New Project 负责初始化；Existing Project 负责快速筛选、Resume、版本/Git/环境检查和 Iteration 路由。

## Standard Agent Flow

**Context → Required Input → Execution → Verification → Evidence → Gate → Handoff → Human Gate**

## Independent Quality Boundary

| 能力 | 核心问题 |
|---|---|
| Testing | 功能是否正确工作？ |
| Compliance | 是否符合规定、规则和约束？ |
| Audit | 流程、结论、证据和 Gate 是否真实、完整、可追溯？ |

三者独立，任何 PASS 不自动继承到其他 Gate。

## Weekly Project Intelligence

Analytics Agent 支持项目 KPI 周报；项目竞品跟踪支持项目维度竞品周报。两者都必须保留来源明细和 Evidence。

## V2.0 Knowledge / Retrospective

- `ai/knowledge-base/v2.0/AI_NATIVE_OS_V2.0.md`
- `ai/retrospective/RETROSPECTIVE_V2.0.md`

V1.x 文档保留为历史演进依据；当前底层协作标准以 V2.0 为准。