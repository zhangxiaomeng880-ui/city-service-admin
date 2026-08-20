# Project Execution Record V2.2

## 1. Positioning
Project Execution Record 是项目数据资产，与日志（Log）、Evidence、Decision Record 同属于项目运行数据维护层；不是 Agent，不参与业务决策，也不替代 Audit。

## 2. Purpose
完整记录项目从创建、阶段执行、暂停、恢复、回退、流转到完成/终止的执行事实，为 Orchestrator、Agent、Analytics、KPI、Retrospective 和 Audit 提供可追溯数据。

## 3. Project Information
记录 project_id、project_name、project_type、creator、Project Owner、version、branch、repository、environment、created_at、updated_at、status 等项目基础信息。

## 4. Stage Record
每个阶段记录：stage_id、stage_name、stage_version、stage_owner、status、planned_start_at、planned_end_at（如适用）、actual_start_at、actual_end_at、active_duration、elapsed_duration、blocked_duration、waiting_duration、gate_result、handoff_id、evidence_refs。

## 5. Time Semantics
- elapsed_duration = actual_end_at - actual_start_at。
- active_duration 仅统计 Agent / 用户实际执行时间，不含等待。
- waiting_duration 记录等待用户、审批、插件或外部依赖的时间。
- blocked_duration 记录因缺失输入、环境、权限或其他阻塞导致的时间。
- 时间必须使用统一时区/时间标准并保存原始时间戳。

## 6. Flow Record
每次阶段流转形成不可随意覆盖的 Flow Record：from_stage、to_stage、trigger、actor、agent、timestamp、gate_result、handoff_id、decision_id（如适用）、reason、status。

## 7. Supported Transitions
支持正常前进、回退、暂停、恢复、重新执行、阻塞/解除阻塞、跳过（仅在规则允许时）以及项目终止。每次非正常流转必须记录原因。

## 8. Responsibility
记录 Project Owner、Stage Owner、Task Assignee、Reviewer、Approver、Decision Owner 等执行关系；责任人变更引用 User & Responsibility Data Layer，并保留历史 Snapshot。

## 9. Execution Events
建议统一记录：PROJECT_CREATED、STAGE_STARTED、STAGE_PAUSED、STAGE_RESUMED、STAGE_BLOCKED、STAGE_UNBLOCKED、STAGE_COMPLETED、HANDOFF_CREATED、HANDOFF_ACCEPTED、STAGE_REOPENED、DECISION_REQUIRED、DECISION_MADE、ASSIGNMENT_CHANGED、GATE_PASSED、GATE_FAILED、PROJECT_COMPLETED、PROJECT_TERMINATED。

## 10. Evidence / Log Relation
Execution Record 保存事件事实和引用，不复制完整 Evidence 或日志正文；通过 evidence_refs、log_refs、decision_id、handoff_id 等关联数据资产，避免重复存储。

## 11. Immutability
已发生的执行事件和历史流转记录原则上追加写入，不覆盖历史事实。纠正必须产生 Correction Event，并记录操作人、时间和原因。

## 12. Consumption
- Orchestrator：恢复当前阶段、判断下一节点。
- Agents：读取当前阶段、责任人、历史 Handoff 和必要执行状态。
- Analytics：计算阶段耗时、等待耗时、阻塞率、流转效率等。
- KPI：结合项目执行事实生成周期指标。
- Retrospective：分析实际执行过程与偏差。
- Audit：验证流程、时间、责任、Gate、Evidence 是否一致。

## 13. Conversation
执行记录由系统自动产生，不要求用户逐项填写。仅在缺失或冲突的项目事实需要人工确认时，通过 Conversation Orchestrator 进行最小询问。

## 14. Token Strategy
默认只读取当前阶段和最近相关事件；历史全量记录仅在 Audit、复盘、分析或明确查询时读取。计算字段优先由系统派生，不重复让用户提供。

## 15. Boundary
Execution Record 负责记录事实；Agent 负责执行；Testing / Compliance 负责对应验证；Audit 负责独立检查记录与证据的一致性。