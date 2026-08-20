# Project Report V2.3

## Report Types
1. Stage Completion Report — 验证阶段工作是否完成及其产出、质量、耗时、问题和 Gate。
2. Milestone Report — 仅对启用的 Milestone 生成，验证关键结果、Deliverable、Acceptance Criteria 与 Evidence 是否达成。
3. Project Completion Report — 验证 Project Goal、全部阶段、启用的 Milestones、质量、风险、KPI、资源和最终结果。

## Quality Check
每份报告包含 Project Quality Check：检查范围、数据来源、检查结果、Finding、严重度、Evidence、状态。质量检查必须引用实际 Stage Data / Testing / Compliance / Audit Evidence，不得仅使用自然语言自评。

## Plan vs Actual
报告比较 Plan Baseline 与 Project Execution Record、Stage Output、Model Usage Record，展示计划/实际时间、产出、质量、风险、Token/成本等偏差。

## Versioning
每份报告包含 report_id、report_version、generated_at、data_cutoff_at、generator、data_sources、audit_status。报告不是实时事实源，数据来源仍以项目数据资产为准。

## Conversation
报告生成默认自动触发，不要求用户重复填写已存在数据；只有缺失口径、异常数据或需要决策时进行最小必要询问。

## Value
通过分层报告分别回答“阶段是否完成”“关键结果是否达成”“项目目标是否达成”，并把质量检查和数据血缘纳入报告，使项目结果可验证、可追溯、可复盘。