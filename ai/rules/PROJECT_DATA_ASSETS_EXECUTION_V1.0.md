# Project Data Assets — Execution V1.0

## Stage Data
Stage Input / Execution Record / Stage Output / Task / Issue / Evidence / KPI / User Operation / Gate Result。

## Logs
Execution Log：记录实际执行事件。
Change Record：记录 Stage / Milestone / Project 的变更及影响。
两者均保留 Who / What / When / Why / From / To / Impact / Result，并保留节点时间信息。

## AI Usage
Model Usage Record：Project、Stage/Milestone、Agent、Model、Task、Invocation Time、Input Tokens、Output Tokens、Total Tokens、Cost、Invocation Count、Fallback/Escalation、Result/Status。

## Data Flow
Stage Data → Stage Report → Milestone Aggregation → Milestone Report → Project Aggregation → Project Report。
报告仅为聚合视图，事实以原始数据资产为准。

## Traceability
所有报告、质量结论、模型消耗和变更结论必须可追溯到对应数据资产。