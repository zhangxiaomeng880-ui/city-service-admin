# EVOLUTION-003 — Agent 生命周期与条件阶段固化

## 1. 问题 / 背景

本轮全量 Agent MD Audit 发现：标准生命周期包含 Build / Deploy / Preview、Acceptance、Data / Experiment、Review、Knowledge Update 等节点；其中部分节点当前项目可能不执行，但不能因此认为 Agent 不存在。

## 2. 本轮确认

形成明确规则：

> Agent 是标准能力资产；SKIPPED 是项目级执行状态，不是 Agent 不存在。

因此，条件阶段必须拥有独立 Agent Contract，并定义触发条件、SKIPPED 依据、影响和 Resume / Re-entry 规则。

## 3. 本轮修订

新增 / 固化：

- `agents/BUILD_DEPLOY_PREVIEW_AGENT.md`
- `agents/DATA_EXPERIMENT_AGENT.md`
- `agents/REVIEW_AGENT_CONTRACT.md`
- `agents/KNOWLEDGE_UPDATE_AGENT_CONTRACT.md`
- `AGENT_STAGE_LIFECYCLE_RULES_V1.1.md`
- 更新 `workflows/PROJECT_STAGE_INPUT_OUTPUT_MATRIX_V1.0.md` 至 V1.1 结构

## 4. 关键职责边界

- Design 创建组件规范；Coding 只实现。
- Project Initialization 确认环境、Branch、Version；Coding 不重复定义。
- Build / Deploy / Preview 负责生成可验证 Preview。
- Acceptance 负责 Product / Design 验收。
- QA 负责质量验证和问题闭环。
- Data / Experiment 为条件能力，当前不适用时 SKIPPED。
- Review 负责项目复盘。
- Knowledge Update 负责知识沉淀与反哺。

## 5. 流程改进

后续任何 Agent MD Audit 必须同时检查：

1. Agent 是否存在
2. Stage 是否存在
3. Stage 是否有独立 Contract
4. 不适用时是否存在 SKIPPED 规则
5. Handoff 是否可追溯
6. 是否能进入下一轮执行

## 6. 结果

本轮把“跳过阶段”和“删除能力”正式区分，并将其写入知识库、Stage Input / Output Matrix 和 Evolution。

## 7. 下一步

完成剩余现有 Agent MD 的统一 Contract 字段修订后，重新执行一次全量 Agent MD Audit，验证本轮新增规则是否真正落地。
