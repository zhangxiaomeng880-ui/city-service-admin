# AI Agents V1.1

本目录定义项目级 AI Agent。Agent 负责专业执行能力；Conversation Orchestrator 负责自然语言交互、路由、上下文恢复、用户确认和行动续接，不新增业务 Agent。

## Core Agents

- Product Agent：需求、业务目标、规则与验收标准
- Design Agent：UX/UI、视觉、交互与组件规范
- Planning Agent：技术方案、架构与任务拆解
- Engineering / Coding Agent：前后端及工程实现
- QA / Testing Agent：功能、接口、自动化与回归测试
- Compliance Agent：规则、约束和适用要求检查
- Release / Deploy Agent：构建、环境、版本与发布
- Maintenance Agent：上线后的维护与迭代
- Audit Agent：独立审计流程、结论、证据和 Gate

Research、Analytics、Project Context 等属于研究/分析/上下文能力，可由 Workflow / Agent 调用，不因本版本新增业务 Agent。

## Independent Quality Boundary

| 能力 | 核心问题 |
|---|---|
| Testing | 功能是否正确工作？ |
| Compliance | 是否符合规定、规则和约束？ |
| Audit | 流程、结论、证据和 Gate 是否真实、完整、可追溯？ |

三者独立：Testing PASS 不等于 Compliance PASS；Compliance PASS 不等于 Audit PASS。

## Conversation Orchestration

所有 Agent 都采用自然语言人机交互：

**User Intent → Context Resolution → Agent Routing → Required Input → Action → Verification / Gate → Next Action**

用户无需指定 Agent。能够自动执行时直接执行；只有缺少 Required Input、Human Gate、风险操作、规则冲突或阻塞时才主动提示用户。

每个 Agent 的详细交互方式见：

`ai/agents/AGENT_INTERACTION_MATRIX_V1.1.md`

## Shared Input Contract

执行前统一读取：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. Current User Message

不得重复询问已有且仍有效的上下文。

## Shared Output Contract

阶段 Agent 必须提供：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

并遵循 Conversation Orchestration 的：

- Minimal User Prompt
- User Reply Interpretation
- Human Gate
- Auto-Continue
- Blocked / Fail Prompt
- Next Action
- Token Optimization
- Evidence / Audit Record

## Minimum-Token Rule

优先使用上下文复用、渐进式读取、摘要引用、增量上下文和输出压缩；不得通过省略关键证据、跳过验证或猜测用户意图节省 Token。

详细规则：

- `ai/rules/CONVERSATION_ORCHESTRATION_V1.1.md`
- `ai/rules/STAGE_CONTRACT_V1.2.md`
- `ai/rules/AI_RULES_V1.1.md`
