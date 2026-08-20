# AI 工作规则 V2.0

## 1. 核心架构

AI Native 项目由 **Project Context + Conversation Orchestrator + Stage/Agent + Standard Handoff + Verification + Gate Engine + Evidence + Human Gate + Iteration Router** 组成。

Conversation Orchestrator 不是业务 Agent；它负责交互、上下文、路由、状态恢复、用户确认和周期调度。

## 2. Project Context

Project Context 是跨 Agent 的唯一项目事实入口。项目级事实、规则、版本、环境、KPI、竞品、Decision、Blocker、Gate 和历史状态必须通过 Project Context 管理。

聊天历史不能作为唯一事实源。

## 3. Agent Contract

所有 Agent 必须遵循 `AGENT_CONTRACT_V2.0.md`。至少定义 Role、Input、Required Input、Execution、Verification、Output、Evidence、Gate、Handoff、Failure、User Prompt、Token Strategy。

## 4. Project Lifecycle

Project 支持：

- New Project：初始化新项目
- Existing Project / Resume：恢复已有项目

已有项目不得重复初始化。Resume 后由 Iteration Router 根据本次任务选择最小必要阶段。

## 5. Handoff

Agent 之间统一使用 Standard Handoff，不依赖长文本交接。Handoff 必须包含 Output、Decisions、Evidence、Gate、Blocker/Warning、Next Stage Required Input、User Confirmation State。

## 6. Gate

统一使用 Gate Engine：PASS / PARTIAL / BLOCKED / NOT_RUN。

Testing、Compliance、Audit 独立：

- Testing PASS ≠ Compliance PASS
- Compliance PASS ≠ Audit PASS
- Audit PASS ≠ Release Approval

未验证不得 PASS；证据不足不得伪造 PASS。

## 7. Iteration Router

Router 根据 User Intent、Project Context、Change Scope、Risk、Existing Gates 和 Environment 状态选择阶段。

为了缩短流程不得跳过必要质量、安全或合规 Gate。

## 8. Environment

统一使用 Environment Matrix 管理环境、分支、版本、Commit、验证状态和 Evidence。Local/Preview/Test/Production 必须独立验证。

## 9. Failure Recovery

失败必须分类并执行 bounded Retry → Diagnose → Escalate。安全可重复操作可以有限重试；授权、Secret、生产操作、业务决策、数据风险等必须暂停并提示用户。

## 10. Conversation

用户无需指定 Agent。Orchestrator 判断当前 Task、Stage、Required Input、Risk、Next Action。

用户提示类型必须区分：Inform、Confirm、Decision、Approval、Manual Action、Risk Confirmation。

阶段内部可自动执行；跨阶段默认 Human Gate。

## 11. Evidence

关键自动判断、用户确认、自动修复、Gate、定时任务和报告必须记录 Evidence，包括来源、时间、版本/批次（适用时）、判断和结果。

## 12. Weekly Intelligence

KPI 与竞品能力按 Project 独立配置、周期执行和来源明细化。缺失、冲突或来源不足不得猜测。

## 13. Project Status

用户可以随时询问项目状态。状态来自 Project Context、Handoff、Gate、Evidence、Environment Matrix 和 Intelligence；未知状态必须明确标记 Unknown。

## 14. Minimum Token

采用 Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand、Compressed Reporting。

质量优先级：

**准确性/安全性 > 规则完整性 > 验证完整性 > 可追溯性 > 用户体验 > Token 优化。**

## 15. Resume

用户说“继续”时恢复 Current Task、Stage、Agent、Gate、Decision、Blocker、Next Action 和 Project Context，不重新索取已有信息。