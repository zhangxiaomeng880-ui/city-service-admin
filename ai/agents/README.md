# AI Agents

本目录定义项目级 AI Agent。当前正式区分两大类别：**流程类 Agent（Process Agents）** 与 **能力类 Agent（Capability Agents）**。Testing、Compliance、Audit 仍保持独立职责，不能混为同一职责。

## 1. 流程类 Agent

流程类 Agent 负责项目生命周期中的阶段执行、阶段决策、Gate 与 Handoff。

- Project Agent：创建/刷新 Project Context
- Product Agent：需求、业务目标、规则、验收标准与综合产品决策
- Design Agent：UX/UI、视觉、交互与组件规范
- Planning Agent：技术方案、架构与任务拆解
- Engineering / Coding Agent：前后端及工程实现
- QA / Testing Agent：功能、接口、自动化与回归测试
- Compliance Agent：规则、约束和适用要求检查
- Audit Agent：独立检查流程、结论、证据和 Gate
- Release / Deploy Agent：构建、环境、版本与发布
- Maintenance Agent：上线后的维护与迭代

流程类 Agent 可以调用能力类 Agent，但不拥有能力类 Agent 的专业能力。

## 2. 能力类 Agent

能力类 Agent 提供跨阶段复用的专业能力，可以独立运行，也可以被流程类 Agent 或其他授权 Agent 调用。

### Competitor Analysis Agent

竞品情报采集、来源验证、变化识别、竞品对比、趋势、机会/风险和竞品报告。

位置：`ai/agents/competitor-analysis/AGENT.md`

### Data Analysis Agent

数据质量、KPI 计算与分析、异常检测、驱动诊断、优化建议和数据分析报告。

位置：`ai/agents/data-analysis/AGENT.md`

## 3. Common Agent Runtime

所有 Agent 共用：

- Project Context
- Task Manager
- Conversation Manager
- Context Manager
- Capability Router
- Model Router
- Tool Router
- Execution Engine
- State Manager
- Quality Gate
- Token & Cost Ledger
- Model Performance Registry
- Knowledge Manager
- Audit Logger

统一执行层级：

`Project → Phase → Task → Conversation → Step → Model Run / Tool Run → Quality Gate → Output`

一个 Phase 可以包含多个独立 Task 和 Conversation，并行执行。

## 4. Capability Router

当任务存在可增强结果的能力时，Agent 应向用户提示可用能力。

已有有效结果优先关联；没有有效结果时才建议直接调用能力。用户可以选择关联已有结果、执行新任务、组合多个能力或跳过。

## 5. Model Router

Model Router 是全局通用能力，不属于某一个阶段。

目标是：在满足质量门槛的前提下，选择最低成本可行模型。模型执行数据、Token、Cost、Quality、Retry 和 Escalation 必须记录并用于后续模型路由优化。

数据分析遵循 Tool First 原则：确定性计算优先使用 SQL、Python 或 Analytics Tool，LLM 主要用于解释、诊断和推荐。

## 6. Quality Boundary

| 能力 | 核心问题 |
|---|---|
| Testing | 功能是否正确工作？ |
| Compliance | 是否符合规定、规则和约束？ |
| Audit | 前述结论和整个流程是否有充分、独立、可追溯的证据？ |

Compliance 和 Audit 都可以读取 Testing 结果，但不能因为 Testing PASS 就自动得出 Compliance 或 Audit PASS。

## 7. Shared Execution Rule

所有 Agent 执行前统一检查：

1. Project Context
2. Previous Stage Output（适用时）
3. Knowledge Base
4. Task Input
5. User Input（仅补充缺失 Required Input）

不得重复询问已有且仍有效的项目上下文。

## 8. Shared Output Contract

Agent 应能够提供：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate / Quality Result
- Handoff
- Status

状态：`COMPLETED / PARTIAL / BLOCKED / SKIPPED`。

具体 Stage Contract 见 `ai/rules/STAGE_CONTRACT.md`。

完整架构见 `ai/agents/AGENT_ARCHITECTURE_V1.3.md`。
