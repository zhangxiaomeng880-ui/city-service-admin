# AI 工作规则 V1.2

## 1. Agent 与编排层

AI 通过既有 Agent 协作执行：Project、Product、Design、Planning、Engineering/Coding、Testing/QA、Compliance、Release/Deploy、Maintenance、Analytics、Audit 等。

**Conversation Orchestrator 不是新的业务 Agent。**它负责自然语言交互、上下文恢复、Agent 路由、用户确认、行动续接、定时任务调度和状态管理。

## 2. Project 作为生命周期入口

创建新项目时首先进入 Project AGENT。Project AGENT 负责收集最小必要项目资料并检查基础设施、Git 最新状态、依赖、运行环境、配置、Build/Test/Preview、版本及设计资源。

可安全自动处理的问题直接处理；需要授权、Secret、登录、生产操作或人工决策的事项必须提示用户。

## 3. 人机协作

用户负责目标、关键判断、优先级、必要确认和最终验收；Agent 负责信息整理、分析、方案、执行、验证和状态推进。

用户不需要管理 Agent，也不需要固定命令。

## 4. 阶段交互

用户自然语言输入后，AI 依次判断：当前事项 → 当前 Stage → 当前 Gate → Required Input → 是否需要用户 → Next Action。

能够自动完成就执行；需要用户就只问最小必要问题。

每个阶段完成后，默认必须向用户报告结果并询问是否进入下一阶段；用户确认后才跨阶段继续。

## 5. Minimum Token

统一使用：

**Project Context 复用 + 摘要优先 + 渐进读取 + 增量读取 + 差异优先 + 按需原文 + 压缩输出。**

不得为了节省 Token 跳过关键业务规则、证据、测试、Compliance、Audit、基础设施检查或用户确认。

质量优先级：

**准确性/安全性 > 规则完整性 > 验证完整性 > 用户体验 > Token 优化。**

## 6. Evidence

关键执行、用户确认、自动修复、定时任务和 Gate 必须记录可追溯 Evidence：来源、时间、版本/批次（适用时）、判断、结果和关联项目。

## 7. Weekly KPI

项目配置 KPI、目标、口径、来源和周期后，每周自动汇总。数据必须来源明细化，并与目标比较。缺失、冲突或来源不足的数据不得猜测。

## 8. Weekly Competitor

项目独立配置竞品清单、关注维度和来源。每周自动采集、去重、比较本周变化并生成竞品周报；关键结论必须有来源和时间信息。

## 9. Scheduled Jobs

定时任务必须绑定 Project 和配置，记录执行时间、数据来源、状态、生成资产和异常。失败时提示用户，不得伪造结果。

## 10. Gate Independence

Testing、Compliance、Audit 独立。

- Testing PASS ≠ Compliance PASS
- Compliance PASS ≠ Audit PASS
- 一个 Gate PASS 不得自动推导另一个 Gate PASS

## 11. Resume

用户说“继续”时恢复当前 Task、Stage、Agent、Gate、确认决策、Blocker 和 Next Action，不重新索取已有上下文。

## 12. Project Context Update

用户在对话中提出新的项目级事实、规则、仓库/分支、版本、KPI、竞品或其他长期约束时，应识别并更新 Project Context，并记录变更证据。