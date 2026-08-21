# Dynamic Routing Knowledge V1.0

## 1. Architecture Position

Dynamic Routing 是 Common Runtime 的全局 Capability，不属于任何单一 Phase。Process Agent / Capability Agent 不维护自己的模型池或路由实现。

## 2. Model Pool

Model Pool 是统一资产，并采用可扩展注册机制：

```text
Provider Registry
 ↓
Model Registry
 ↓
Adapter / Invocation Contract
 ↓
Validation
 ↓
ACTIVE Model Pool
```

新增 Provider / Model 必须注册、适配、验证能力/元数据/连接/调用/Token/Cost 后才能 ACTIVE。

## 3. Model Priority

```text
User Explicit Model
 ↓
Hard Constraint / Compliance Check
 ↓
Execute
```

用户指定模型执行失败：提示用户失败，不自动切换。

用户未指定模型：

```text
Default Model
 ↓
Success → Done
Failure / Trigger → Dynamic Routing
```

## 4. Dynamic Routing

Router 只能从 ACTIVE Model Pool 选择。先进行 Hard Constraint Filter，再进行 Score。

Hard Constraints 包括 Capability、Context、Permission、Compliance、Data Boundary、Availability、Capacity / Concurrency 和系统 Routing Budget。

## 5. Trigger / Executable Entry

Capability → Standard Trigger → Execution 是统一可执行链路。Trigger 不实现业务能力，只负责启动已有 Capability。

标准 Trigger 类型：

- Command
- Natural Language
- Event
- Schedule

所有 Trigger 必须进入 Input Gate；缺少关键输入时 WAITING_INPUT，涉及人工决策时 WAITING_CONFIRMATION，不得猜测补齐关键输入。

UI 不是 Capability 可执行的前置条件。未产品化为 UI 的能力必须仍提供标准 Trigger；UI 上线后只能作为新的 Trigger Source，并调用同一 Capability、配置和数据资产。

模型池、默认模型、路由策略等配置统一通过 Configuration Capability 触发，不得绕过 Validation / Independent Audit 直接修改正式资产。

## 6. Low Consumption Principle

“低消耗”不是牺牲质量，而是：

> 在满足任务质量、可靠性和能力要求的前提下，避免不必要的上下文、过度输出、过高推理消耗和过高模型能力，选择最低合理消耗方案。

必须区分 input / output / cached / reasoning / total tokens。

## 7. High Concurrency

Router 必须考虑实时：

- max / current / available concurrency
- queue depth
- RPM / TPM
- P95 latency
- error / timeout rate

Capacity protection 可以降低候选优先级或暂时剔除候选，但不得偷偷降低质量门槛。

## 8. System-Level Routing Budget

Routing Budget 是系统级、时间窗口级预算，不是单个业务 Task 的预算。至少支持 Token、Cost、Concurrency、RPM、TPM 上限与保护阈值。

预算压力不能通过降低质量门槛解决。可采用合格低消耗模型、排队、降级到仍满足质量要求的模型或进入用户/人工决策。

## 9. Score

V1.1 评分维度：Quality、Reliability、Task Fit、Token Efficiency、Cost Efficiency、Latency。Capacity / Budget 属于运行时约束，不直接作为软分数。

默认 Balanced 权重：Quality 30%、Token Efficiency 20%、Reliability 20%、Task Fit 12%、Cost Efficiency 12%、Latency 6%。

Quality First 与 Cost First 使用不同权重，但均先通过质量/可靠性门槛。

## 10. Configurability

Routing Trigger、Strategy、Weights、Threshold、Token Policy、Capacity、Concurrency、Retry、Fallback、Budget、Latency、Cross Provider 均为配置资产。配置必须 ID + Version + Status + Effective Time。

## 11. Trace / Data Asset

每次 Routing 必须生成 Routing Decision，并形成 Full Routing Trace：

`Trigger → Project → Phase → Task → Conversation → Step → Capability Requirement → Policy Versions → Model Pool → Candidate Set → Routing Decision → Model Run → Quality → Token / Cost / Latency → Retry / Failure → Final Outcome`

Routing Trace 属于 Project Data Asset；Trigger Record 也必须可关联 Execution ID / Trace ID。

## 12. Governance

Model Pool、Default Policy、Routing Policy、Score Weights、Budget / Capacity Policy 的重大变更必须 Validation + Independent Audit 后生效。历史 Trace 永久保留所使用的版本引用。

历史 Execution Data 只能作为 Routing Evidence，不能未经 Audit 自动修改正式规则。
