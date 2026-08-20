# Project Timeline V2.2

Project Timeline 是 Project Execution Record 的查询视图，不是独立 Agent。

## Timeline Structure
Project Created → Stage Started → User / Agent Execution → Pause / Wait / Block → Resume → Gate → Handoff → Next Stage → Completion / Termination。

## Required Display
项目概览、当前阶段、阶段负责人、阶段状态、计划时间（如有）、开始时间、结束时间、实际耗时、Active Time、Waiting Time、Blocked Time、流转节点、Gate、Handoff、关键 Decision、责任人变更。

## Source of Truth
Timeline 不单独维护事实，统一读取 Project Execution Record、Decision Record、Handoff、Evidence、User Responsibility Snapshot。

## Auditability
每个节点必须可回溯到事件记录和必要 Evidence；历史记录不可被当前状态覆盖。