# Dynamic Routing Asset Audit V1.0

## 1. Scope

审计 Model Pool、Provider/Model Onboarding、Default Model Policy、Dynamic Routing Contract、Dynamic Routing Score、Routing Policy Schema、Routing Decision Schema、Routing Trace Schema、Dynamic Routing Capability Agent 及 Knowledge Base 同步关系。

## 2. Mandatory Checks

- Model Pool 是否为统一资产；
- Provider / Model 是否存在可扩展接入路径；
- ACTIVE 模型是否经过 Validation；
- Default Model 是否通过 Policy 配置而非硬编码；
- User Explicit Model 是否最高优先级；
- 用户指定模型失败是否禁止自动切换；
- 默认模型失败是否进入 Dynamic Routing；
- Router 是否只能选择 ACTIVE Model Pool；
- Hard Constraint 是否在 Score 前过滤；
- Quality / Reliability 最低门槛是否不可被成本策略突破；
- Token Efficiency 是否定义为质量约束下的最低合理消耗；
- Capacity / Concurrency 是否进入运行时保护；
- Routing Budget 是否为系统/时间窗口级，而非 Task 业务预算；
- Retry / Fallback 是否有上限；
- Routing Policy 是否配置化、版本化；
- 每次决策是否生成 Routing Decision；
- 全链路 Trace 是否可从 Project 追溯到 Model Run；
- Token / Cost / Latency / Quality / Capacity 是否可追踪；
- 规则变更是否要求 Validation + Independent Audit；
- Knowledge Base 是否同步；
- Retrospective 是否同步。

## 3. Traceability Chain

```text
Project
 ↓
Phase
 ↓
Task
 ↓
Capability Requirement
 ↓
Routing Request
 ↓
Policy / Model Pool Versions
 ↓
Candidate Filtering
 ↓
Routing Decision
 ↓
Model Run
 ↓
Quality / Consumption
 ↓
Feedback
 ↓
Routing Trace Archive
```

## 4. Result

本版本资产结构达到设计要求后才允许标记 `ROUTING_ASSET_AUDIT_PASS`。发现缺口时必须修复后重新审计，不允许仅通过文档声明视为完成。

## 5. Governance

Dynamic Routing 不是各 Phase 的私有逻辑，而是 Global Capability。Model Pool、Policy、Score、Budget、Capacity 和 Trace 均属于可审计项目/平台资产。
