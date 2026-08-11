# GitHub Project Stage Mapping

GitHub Project 用于承载需求和任务状态；Issue 是需求入口，Repository 是产品资产与代码的事实来源。

建议 Project #1 使用以下阶段：

| Stage | 含义 | 主要 AI 工作 | 主要输出 |
|---|---|---|---|
| Requirement | 新需求入口 | 澄清问题、补齐信息 | Issue |
| Research | 研究中 | 用户/竞品/数据研究 | Research Note |
| Product | 产品定义 | PRD、User Story、验收标准 | PRD |
| Design | 设计中 | UX/UI/原型 | Design Asset |
| Ready | 待开发 | 任务拆解、依赖确认 | Task |
| Engineering | 开发中 | Coding / Review | PR / Commit |
| QA | 测试中 | 自动化/回归/体验检查 | Test Result |
| Release | 待发布/发布中 | Release 检查 | Release Note |
| Analytics | 数据验证 | 指标与反馈分析 | Analysis |
| Done | 已完成 | 总结与资产归档 | Closed Loop |

## 使用规则

1. 所有新产品需求优先从 Issue 进入。
2. Project 不替代 PRD、代码或测试，它负责状态与协作。
3. Issue、PRD、PR、Release、Analytics 应互相引用。
4. 需求未经过 Product 确认，不直接进入 Engineering。
5. Engineering 完成不等于产品完成，必须经过 QA、Release 和 Analytics。
