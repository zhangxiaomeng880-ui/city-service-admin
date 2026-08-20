# Retrospective — Project Data Assets 2026-08-20

## Decision
在 User & Responsibility Data Layer、Project Execution Record、Model Usage Record 完善后，进一步将各阶段实际产生的业务/交付/质量统计纳入统一 Project Data Layer。

## Key Rule
默认以项目实际产生的原始事实进行统计；除非项目另行指定并版本化 Auto-Fill Rule，否则不得自动补齐业务事实。缺失数据不能被模型主观推断成结果。

## Stage Coverage
Product：需求/功能/验收项及变更；Design：页面/流程/组件/状态/Review/Mapping；Planning：任务/API/风险/Migration/Rollback/Test Strategy；Engineering：Commit/PR/代码变更/Build/Review/Defect/Rework；Testing：用例执行/通过/失败/阻塞/问题；Compliance：规则检查/Exception/Waiver；Release：发布/部署/回滚/Smoke/Gate；Analytics：KPI/目标/来源/报告；Maintenance：Incident/Bug/Change/Hotfix/Recovery。

## Architecture
Stage Output & Metrics 与 Execution Record、Model Usage Record、Evidence、Handoff、Decision、Log、Audit Record 分离但可关联；这些均为数据资产，不新增 Agent。

## Audit
本轮 Independent Audit Gate：PASS。未发现规则边界、数据血缘或阶段覆盖阻塞项。

## Follow-up
真正开发运行时数据采集后，仍需通过 Engineering → Testing → Compliance（适用时）→ Release → Audit 验证实际实现。