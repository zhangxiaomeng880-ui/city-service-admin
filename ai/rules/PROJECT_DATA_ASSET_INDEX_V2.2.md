# Project Data Asset Index V2.2

## Project Foundation
- Project Context
- User & Responsibility Data Layer
- Project Execution Record
- Project Timeline View
- Model Usage Record

## Execution / Collaboration
- Handoff
- Decision Record
- Human Gate
- Log
- Evidence
- Audit Record

## Stage Output
- Product Output & Metrics
- Design Output & Metrics
- Planning Output & Metrics
- Engineering Output & Metrics
- Testing Output & Metrics
- Compliance Output & Metrics
- Release Output & Metrics
- Analytics / KPI Data
- Maintenance Output & Metrics

## Data Principles
1. 数据资产不等于 Agent。
2. 实际产生的数据优先由系统自动采集。
3. 用户只提供缺失的口径、规则或必要决策。
4. 默认不自动补齐业务事实；明确配置 Auto-Fill Rule 后才允许补齐。
5. 所有派生指标必须可追溯到原始数据。
6. 历史事实追加记录，不覆盖。
7. Audit 可对数据资产进行交叉验证。

## Consumption
Orchestrator / Agents / Analytics / KPI / Retrospective / Audit 均可按需引用数据资产，但不得把自然语言总结作为唯一事实来源。