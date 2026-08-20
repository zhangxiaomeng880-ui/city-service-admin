# Project Status V2.0

## 目标
用户可以用一句自然语言获得项目当前状态，且状态来自 Project Context、Handoff、Gate、Evidence 和 Environment Matrix，而不是模型记忆猜测。

## Status Snapshot

- Project
- Current Version / Latest Version
- Current Stage / Task
- Branch / Git Freshness
- Environment Status
- Last Iteration
- Current Blockers / Warnings
- Stage Gates
- KPI Actual / Target / Trend
- Competitor Weekly Delta
- Next Action

## Rules

状态必须标记数据时间和 Evidence；未知状态为 Unknown，不得推测。

## User Query

支持：

- “项目现在什么状态？”
- “目前做到哪一步？”
- “最新版本是什么？”
- “还有什么 Blocker？”
- “为什么还不能发布？”

输出优先摘要，用户要求时再展开证据明细。
