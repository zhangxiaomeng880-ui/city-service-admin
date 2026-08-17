# EVOLUTION-002 — Agent MD Contract Audit / 阶段职责边界确认

## 1. 问题 / 背景

在本轮项目推进中，需要确认所有阶段 Agent MD 的 Input / Execution / Output 是否完整，并避免因口头阶段列表简化而遗漏标准生命周期节点。

## 2. 输入 / 证据

- `00_AGENT_REGISTRY.md`：统一 Agent 合同字段及当前阶段状态
- `04_HANDOFF_AND_AUTOMATION.md` V1.2：Universal Stage Contract、Initialization Rule、Design-Code Consistency、DoD
- `00_PROJECT_MANIFEST.md`：当前项目生命周期、版本及环境基线
- 全部现有 Stage Agent MD
- 本轮人工确认的 Design / Coding / Review / Release 阶段职责边界

## 3. 分析 / 判断

本轮核对发现：单个 Agent MD 的内容大多已经具备 Input / Execution / Output / Gate / Handoff，但不同 Agent 的字段结构不统一；同时标准生命周期中 Build/Deploy/Preview、Acceptance、Review、Knowledge Update 等节点不能因为当前项目阶段确认时采用简化表述而被删除。

另外确认：

- 组件规范由 Design 阶段负责创建并输出。
- Coding 消费组件规范，不重新定义组件。
- Repository、Branch、项目版本、Build/Deploy/Preview 环境基线由 Project Initialization 确认。
- Coding 只负责在已确认上下文内实现。
- Review 负责复盘真实执行、返工、阻塞、质量和流程改进。
- Knowledge Update 负责将已验证结论沉淀为可复用知识和 Agent/Workflow 改进。

## 4. 决策

暂不修改标准生命周期，不删除或合并现有节点。

统一要求每个 Agent 最终符合：

Purpose / Mission → Version → Input → Input Readiness → Input Verification → Execution → Output → Output Verification → Gate → Handoff → Environment Dependency → Version Dependency → Status → Resume Rule。

## 5. 执行

完成全部现有 Agent MD 的全量结构核对，并生成：

`ai/knowledge-base/v1.0/execution/AGENT_MD_AUDIT_2026-08-17.md`

该审计记录包含每个 Agent 的完整度判断、结构性问题、职责边界和后续修复顺序。

## 6. 产出

- Agent MD 全量审计记录
- Design / Coding 职责边界确认
- Project Initialization / Coding 环境职责边界确认
- 标准生命周期完整性确认
- Agent MD 统一合同字段要求
- Build / Deploy / Preview 独立 Agent 缺口识别

## 7. 验证

审计基准与当前 Project Manifest、Agent Registry、Handoff Contract、Version Manifest 进行交叉核对。

## 8. 结果

本轮确认的核心改进不是继续增加流程节点，而是把现有 Agent MD 从“阶段说明”进一步固化为“可执行 Stage Contract”，并要求每个阶段的输入、执行、输出、Gate、Handoff 和状态均可追溯。

## 9. 后续影响

下一轮 Agent MD 修订应优先：

1. 统一字段结构。
2. 补充 Build / Deploy / Preview Agent。
3. 在 Coding Input 中显式加入组件规范、Token、页面→组件映射。
4. 修订后重新执行 Workflow Audit。
5. 将 Audit 结果继续反哺 Current Knowledge。
