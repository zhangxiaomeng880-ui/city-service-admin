# AI Native Dynamic Routing 复盘 V1.0

## 1. 本轮目标

在 Process / Capability Agent、Common Capability Pool、Execution Record、Project Data Assets、Independent Audit 已建立后，补齐统一 Model Pool 与 Dynamic Routing 基础架构。

## 2. 核心设计结论

### 2.1 Model Pool 是统一资产

模型不能由各 Phase Agent 分散维护。Provider / Model 通过 Registry + Adapter + Validation 可扩展接入，只有 ACTIVE 模型可以参与默认模型和动态路由。

### 2.2 模型选择优先级

```text
User Explicit Model
 ↓
Hard Constraint / Compliance
 ↓
Execute
```

用户指定模型失败不自动切换，必须提示用户。

用户未指定时使用 Default Model；Default Model 执行失败、不可用或质量验证失败时进入 Dynamic Routing。

### 2.3 Dynamic Routing 是公共 Capability

Phase / Agent 不自行实现路由。统一 Router 负责候选过滤、策略、评分、容量保护、Budget、Retry、Decision 和 Trace。

## 3. 低消耗的重新定义

本轮明确“低消耗”不能理解为最低 Token 或最低价格。

正式定义为：

> 在满足质量、可靠性、能力与运行约束的前提下，选择最低合理消耗方案。

因此 Token Efficiency 成为 Routing Score 的正式维度，并与 Cost Efficiency 分离。

## 4. 高并发能力

单次任务最优不等于系统运行时最优。Router 必须考虑：

- Current / Available Concurrency
- Queue Depth
- RPM / TPM
- P95 Latency
- Error / Timeout
- System-Level Routing Budget

Routing Budget 被定义为系统/时间窗口级资源预算，而不是单个业务 Task 预算。

## 5. 配置化与版本化

Routing Trigger、Strategy、Score Weight、Quality / Reliability Threshold、Token Policy、Capacity、Concurrency、Retry、Fallback、Budget、Latency 等均为配置资产。

配置不得硬编码在 Agent MD 中，所有影响路由结果的配置必须 ID + Version + Status + Effective Time，并经过 Validation / Independent Audit 后生效。

## 6. 全链路数据资产

```text
Project
 ↓
Phase
 ↓
Task
 ↓
Conversation
 ↓
Step
 ↓
Capability Requirement
 ↓
Policy / Model Pool Versions
 ↓
Candidate Filtering
 ↓
Routing Decision
 ↓
Model Run
 ↓
Quality / Token / Cost / Latency
 ↓
Retry / Failure
 ↓
Final Outcome
 ↓
Routing Trace Archive
```

这使“为什么选这个模型、用了多少 Token、为什么没选其他模型、当时并发如何、最终质量如何”都可以被追溯。

## 7. 本轮资产

- Model Pool Contract
- Default Model Policy
- Dynamic Routing Contract
- Dynamic Routing Capability Agent
- Dynamic Routing Score V1.1
- Routing Policy Schema
- Routing Decision Schema
- Routing Trace Schema
- Dynamic Routing Asset Audit
- Dynamic Routing Knowledge Base

## 8. 治理原则

历史执行数据只能作为 Routing Evidence，不能未经 Audit 自动修改正式规则。新模型、新策略和规则变更均必须经过相应 Validation / Audit。

## 9. 后续范围

V1 先采用规则 + 历史数据的可解释路由，不立即引入自动强化学习、无限探索或黑盒模型选择。待真实 Execution Data 足够后，再评估数据驱动路由的升级。
