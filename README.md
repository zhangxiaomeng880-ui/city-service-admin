# City Service Admin — AI Native Product Lab V1.1

这是一个用于验证 **AI Native 产品研发流程** 的实验项目。

城市服务后台只是第一个业务样例，重点不是一次性完成一个 Demo，而是建立一套可以持续复用、可对话执行、可验证和可审计的研发机制。

## AI Native Workflow

**Research → Product → Design → Planning → Engineering/Coding → Testing → Compliance → Release → Analytics / Maintenance → Audit → Iteration**

Iteration 是生命周期循环，不是 Agent。

## Agent / Orchestration Boundary

当前 Agent 体系保持稳定。Conversation Orchestrator 是交互/调度层，不新增业务 Agent。

用户可以直接说：

- “继续执行。”
- “按照之前确认的方案继续。”
- “这个调整一下。”
- “先不要发布。”

系统自动恢复上下文、识别当前 Agent、判断是否需要用户、执行下一步并在 Gate 处暂停或继续。

## Human-in-the-Loop

用户负责目标、关键判断、优先级、必要确认和最终验收；Agent 负责分析、执行、验证和状态推进。

只有 Required Input、Human Gate、高风险操作、规则冲突或阻塞需要人工处理时才主动询问用户。

## Minimum-Token Execution

所有环节采用：

**Context Reuse → Progressive Retrieval → Summary First → Incremental Context → No Redundant Confirmation → Compressed Output**

原则不是单纯减少 Token，而是在保证准确性、证据、验证和 Gate 完整性的前提下减少无效上下文和重复交互。

## Quality Boundary

- **Testing AGENT**：验证功能是否正确工作。
- **Compliance AGENT**：验证是否符合已确认规则、约束和适用要求。
- **Audit AGENT**：独立验证流程、结论、证据和 Gate 是否真实、完整、可追溯。

三者相互独立。Testing PASS 不等于 Compliance PASS；Compliance PASS 不等于 Audit PASS。

## Project Context

项目基础信息和已确认上下文属于生命周期级资产，由 Project Agent 创建/刷新，后续阶段直接复用。

输入优先级：

**Project Context → Previous Stage Output → Knowledge Base → Current User Message**

继续阶段、阶段切换或 Handoff 时不重复要求用户提供已有项目背景。

## V1.1 Core Documents

- `ai/knowledge-base/v1.1/AI_NATIVE_PROJECT_OS_V1.1.md`
- `ai/rules/AI_RULES_V1.1.md`
- `ai/rules/STAGE_CONTRACT_V1.2.md`
- `ai/rules/CONVERSATION_ORCHESTRATION_V1.1.md`
- `ai/agents/AGENT_INTERACTION_MATRIX_V1.1.md`
- `ai/agents/compliance/AGENT.md`

V1.0 文档保留作为历史版本和演进依据；当前执行以 V1.1 规则为准。
