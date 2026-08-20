# AI Agents

本目录定义项目级 AI Agent。当前体系区分 **执行型 Agent** 与 **独立检查能力**，不得将 Testing、Compliance、Audit 混为同一职责。

## Core Agents

- Project Agent：创建/刷新 Project Context
- Research Agent：研究与证据收集
- Product Agent：需求、业务目标、规则与验收标准
- Design Agent：UX/UI、视觉、交互与组件规范
- Planning Agent：技术方案、架构与任务拆解
- Engineering / Coding Agent：前后端及工程实现
- QA / Testing Agent：功能、接口、自动化与回归测试
- Release / Deploy Agent：构建、环境、版本与发布
- Analytics Agent：数据分析、结果验证与迭代分析
- Maintenance Agent：上线后的维护与迭代

## Independent Quality Capabilities

### Compliance AGENT

独立检查“是否符合规则、约束和适用要求”。

位置：`ai/agents/compliance/AGENT.md`

### Audit AGENT

独立检查“流程、结论、证据和 Gate 是否真实、完整、可追溯”。Audit 不属于 Testing，也不属于 Release，并且不能被其他 Agent 自我审计替代。

## Three-Way Boundary

| 能力 | 核心问题 |
|---|---|
| Testing | 功能是否正确工作？ |
| Compliance | 是否符合规定、规则和约束？ |
| Audit | 前述结论和整个流程是否有充分、独立、可追溯的证据？ |

Compliance 和 Audit 都可以读取 Testing 结果，但不能因为 Testing PASS 就自动得出 Compliance 或 Audit PASS。

## Shared Execution Rule

所有阶段 Agent 执行前统一检查：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. User Input（仅补充缺失 Required Input）

不得重复询问已有且仍有效的项目上下文。

## Shared Output Contract

阶段 Agent 必须能够提供：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

状态：`COMPLETED / PARTIAL / BLOCKED / SKIPPED`。

Compliance 额外输出 Applicable Rules、Evidence、Findings、Exceptions / Waivers 和 Compliance Gate。

具体 Contract 见 `ai/rules/STAGE_CONTRACT.md`。