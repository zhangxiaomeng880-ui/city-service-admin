# AI Native V1.1

这里维护 AI 在项目生命周期中的角色、规则和工作流。

## 目标

让 AI 从单纯的 Coding 助手升级为贯穿 Research → Product → Design → Planning → Engineering/Coding → Testing → Compliance → Release → Analytics → Maintenance → Audit → Iteration 的协作执行体系。

Iteration 是生命周期循环，不是 Agent；Conversation Orchestrator 是交互/调度层，不是新的业务 Agent。

## 核心职责边界

- **Testing AGENT**：验证功能是否正确工作。
- **Compliance AGENT**：验证是否符合已确认规则、约束和适用要求。
- **Audit AGENT**：独立验证流程、结论、证据和 Gate 是否真实、完整、可追溯。

三者独立，不得互相替代，也不得自动继承彼此的 PASS。

## Conversation Orchestration

用户无需指定 Agent，直接使用自然语言表达目标、继续、修改或回答问题。系统负责：

**User Intent → Context Resolution → Agent Routing → Required Input → Action → Verification / Gate → Next Action**

能够自动执行时直接执行；只有 Required Input、Human Gate、高风险操作、规则冲突或阻塞才主动询问用户。

## Minimum-Token Execution

所有 Agent 采用：

**Context Reuse → Progressive Retrieval → Summary First → Incremental Context → No Redundant Confirmation → Compressed Output**

Token 优化不能通过省略关键规则、证据、验证或 Gate 实现。

## 当前目录

- `rules/` AI 工作规则、Stage Contract、Conversation Orchestration、Command Protocol
- `agents/` AI 角色定义及各 Agent 对话交互矩阵
- `workflows/` AI 工作流定义
- `knowledge-base/` 核心知识库、设计规范、执行规则和 Evolution

## V1.1 核心规则

- `rules/AI_RULES_V1.1.md`
- `rules/STAGE_CONTRACT_V1.2.md`
- `rules/CONVERSATION_ORCHESTRATION_V1.1.md`
- `agents/AGENT_INTERACTION_MATRIX_V1.1.md`
- `knowledge-base/v1.1/AI_NATIVE_PROJECT_OS_V1.1.md`

## Context 规则

所有 Agent 统一复用：

**Project Context → Previous Stage Output → Knowledge Base → Current User Message**

只在前三层无法提供当前阶段 Required Input 时请求用户补充。