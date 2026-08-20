# Stage Metrics Context V2.2

## Agent Input / Output
各阶段 Agent 可引用当前阶段已有的 Stage Output 数据和 Metrics Summary；阶段执行完成时必须把实际产生的结构化结果写入 Stage Output Data。

## Orchestrator
Orchestrator 不自行创造指标。仅负责在阶段完成、Handoff、Gate、Report 等节点触发数据写入或计算。

## Product
Output 必须包含实际需求/功能/验收项数量及状态引用。

## Design
Output 必须包含实际页面/流程/组件/状态/Review/Mapping 数据引用。

## Planning
Output 必须包含实际任务/API/风险/Migration/Rollback/Test Strategy 数据引用。

## Engineering
Output 必须包含实际代码变更、PR/Commit、Build、Review、Defect/Rework 数据引用。

## Testing
Output 必须包含实际用例计划/执行/通过/失败/阻塞和问题处理数据引用。

## Compliance
Output 必须包含实际规则检查、结果、Exception/Waiver 和问题数据引用。

## Release
Output 必须包含实际 Release/Deployment/Rollback/Smoke/Gate 数据引用。

## Analytics
Output 必须包含实际 KPI、目标、来源、周期和报告数据引用。

## Maintenance
Output 必须包含实际 Incident/Bug/Change/Hotfix/Recovery 数据引用。

## Handoff
阶段 Handoff 必须携带本阶段关键 Stage Output Summary 及其数据引用，而不是只携带自然语言结论。

## Audit
Audit 必须检查 Stage Output 是否真实来自项目实际产生的数据，并验证指标口径、计算和 Evidence。