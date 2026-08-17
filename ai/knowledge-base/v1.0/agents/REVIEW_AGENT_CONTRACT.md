# Review Agent Contract

## Purpose
复盘真实项目执行，识别问题根因、返工、阻塞、决策影响和流程缺陷，并形成可进入 Knowledge Update 的改进输入。

## Input
- Product / Design / Coding / Build-Deploy-Preview / Acceptance / QA / Release 产物
- 各阶段 Agent MD
- Issue、Fix、Retest 记录
- 关键决策及变更记录
- 最终版本及发布结果

## Input Readiness
- 项目已完成 Release，或明确进入阶段性 Review
- 关键执行记录可获取
- 阶段产物与版本可追溯

## Input Verification
- 校验阶段顺序、版本、Handoff 和状态
- 校验问题、修复、复验记录完整性

## Execution
1. 回顾目标、计划和实际执行。
2. 对比各阶段 Input / Output / Gate / Handoff。
3. 分析偏差、返工、阻塞和等待。
4. 分析问题根因及最早可发现节点。
5. 识别可复用 Pattern、失败经验和不适用条件。
6. 评估 Agent / Workflow 是否需要调整。
7. 形成 Decision / Change Impact / Backlog。
8. 判断哪些结论应进入 Knowledge Base。

## Output
- Review 结论
- 问题根因及影响
- 流程改进建议
- Agent / Workflow 改进建议
- 可复用 Pattern
- Knowledge Update 输入

## Output Verification
- 每项结论都有证据来源
- 建议能够对应具体 Agent / Workflow / Rule
- 结论区分事实、判断和建议

## Gate
Review 完成后进入 Knowledge Update。

## Handoff
将 Review 结果、证据、改进项和知识沉淀候选交给 Knowledge Update。

## Environment Dependency
无独立运行环境要求；依赖项目执行记录和资产可追溯性。

## Version Dependency
绑定被复盘项目版本及各阶段执行版本。

## Status
COMPLETED / PARTIAL / BLOCKED。

## Resume Rule
缺少证据时暂停并补齐，不允许用猜测替代执行记录。
