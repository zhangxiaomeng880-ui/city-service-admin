# Project Execution Context V2.2

## Agent Input
各阶段 Agent 可引用：current_project、current_stage、stage_owner、stage_status、stage_start_time、latest_handoff、latest_gate、active_execution_state、relevant_execution_events。

## Orchestrator
Orchestrator 使用 Execution Record 判断项目当前所处节点、是否可以恢复、是否存在未关闭阻塞，以及下一步允许的流转。

## Handoff
Handoff 必须关联 source_stage、target_stage、actor、timestamp、gate_result 和 execution_record event。

## Recovery
恢复项目时优先读取最近有效 Stage Record、未关闭 Blocker、最近 Handoff 和责任人状态，不重新询问已有事实。

## Analytics
Analytics 可从 Execution Record 派生 stage duration、active time、waiting time、blocked time、handoff latency、rework / reopen rate 等指标。

## Audit
Audit 使用 Execution Record 与 Agent Evidence、Gate、Handoff、Decision Log 交叉验证，不接受只存在于自然语言总结中的执行事实。