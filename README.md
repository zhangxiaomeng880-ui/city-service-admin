# City Service Admin — AI Native Product Lab V1.2

这是一个用于验证 **AI Native 项目级研发操作系统** 的实验项目。重点不是一次性完成 Demo，而是建立可复用、可对话、可验证、可审计、可持续运行的项目机制。

## AI Native Lifecycle

**Project → Product → Design → Planning → Coding → Testing → Compliance → Release / Deploy → Maintenance / Analytics → Audit → Iteration → Product**

Conversation Orchestrator 横跨全部阶段，负责自然语言交互、上下文恢复、Agent 路由、用户确认、行动续接和周期任务调度。

## Project First

新项目必须先进入 Project 阶段。用户以自然语言描述项目目标，Project Agent 提示最小必要项目信息，同时自动检查 Git 仓库、当前/默认分支、远程最新状态、工作树、依赖、Runtime、环境配置、Build/Test/Preview、版本和 Figma 等基础设施。

可安全自动修复的问题直接执行；需要权限、Secret、登录、生产操作或人工决策的事项明确提示用户。

Project Gate 完成后必须询问用户是否进入 Product。

## Stage Human Gate

每个阶段完成后，AI 向用户报告精简结果、Gate 和关键问题，并询问是否进入下一阶段。阶段内部可自动连续执行，但未经用户确认不得静默跨阶段。

## Independent Quality Gates

- **Testing**：功能是否正确工作？
- **Compliance**：是否符合规定、规则和约束？
- **Audit**：流程、结论、证据和 Gate 是否真实、完整、可追溯？

三者独立，不自动继承彼此 PASS。

## Weekly Project Intelligence

每个 Project 独立配置 KPI、目标、口径、数据来源和竞品清单。

### KPI Weekly

每周定时依据用户填写/确认的数据自动执行：

**采集 → 来源明细 → 校验 → 汇总 → KPI Target 对比 → 趋势 → 周报**

每个数据项保留来源、原始明细、口径、时间范围、填写/采集时间和 Evidence；缺失或口径冲突不得猜测。

### Competitor Weekly

每周定时依据项目竞品配置自动执行：

**采集 → 来源记录 → 去重 → 本周变化 → 历史对比 → 项目影响 → 竞品周报**

关键结论必须保留来源和时间信息，并区分事实与分析判断。

## Minimum Token

统一采用 Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand 和 Compressed Reporting。

Token 优化不得牺牲准确性、规则完整性、测试、合规、审计或证据。

## Current V1.2 Documents

- `ai/knowledge-base/v1.2/AI_NATIVE_PROJECT_OS_V1.2.md`
- `ai/knowledge-base/v1.2/PROJECT_WEEKLY_INTELLIGENCE_V1.2.md`
- `ai/rules/AI_RULES_V1.2.md`
- `ai/rules/STAGE_CONTRACT_V1.3.md`
- `ai/rules/CONVERSATION_ORCHESTRATION_V1.2.md`
- `ai/rules/SCHEDULED_INTELLIGENCE_V1.2.md`
- `ai/agents/README.md`
- `ai/agents/project/AGENT.md`
- `ai/agents/analytics/AGENT.md`
- `ai/agents/research/COMPETITOR_WEEKLY.md`

V1.0/V1.1 文档保留作为历史演进依据；当前执行规则以 V1.2 系列为准。
