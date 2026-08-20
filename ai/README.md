# AI Native V1.2

这里维护 AI 在项目生命周期中的角色、规则和工作流。

## Lifecycle

**Project → Product → Design → Planning → Engineering/Coding → Testing → Compliance → Release → Analytics / Maintenance → Audit → Iteration → Product**

Iteration 是生命周期循环，不是 Agent；Conversation Orchestrator 是交互/调度层，不是新的业务 Agent。

## Project First

Project Agent 是新项目入口：收集最小必要项目资料，建立 Project Context，并检查仓库、分支最新状态、工作树、依赖、Runtime、环境、Build/Test/Preview、版本和 Figma 等基础设施。

## Human-in-the-Loop

所有阶段使用自然语言交互。阶段内部可自动执行；阶段完成后必须向用户汇报并询问是否进入下一阶段。需要授权、关键决策、高风险操作或阻塞时主动提示用户。

## Quality Boundary

- Testing：功能正确性
- Compliance：规则/约束符合性
- Audit：流程、证据、结论和 Gate 的独立审计

三者独立。

## Weekly Project Intelligence

项目可配置 KPI/Target/Source/Schedule 和竞品清单/维度/Source/Schedule。系统每周自动生成 KPI 周报和项目竞品周报，并保留来源明细和 Evidence。

## Minimum Token

统一采用：Context Reuse、Progressive Retrieval、Summary First、Delta First、Evidence on Demand、Compressed Output。不得以 Token 优化为由省略关键验证。

## V1.2 Core Documents

- `rules/AI_RULES_V1.2.md`
- `rules/STAGE_CONTRACT_V1.3.md`
- `rules/CONVERSATION_ORCHESTRATION_V1.2.md`
- `rules/SCHEDULED_INTELLIGENCE_V1.2.md`
- `agents/README.md`
- `agents/project/AGENT.md`
- `agents/analytics/AGENT.md`
- `agents/research/COMPETITOR_WEEKLY.md`
- `knowledge-base/v1.2/AI_NATIVE_PROJECT_OS_V1.2.md`
- `knowledge-base/v1.2/PROJECT_WEEKLY_INTELLIGENCE_V1.2.md`
