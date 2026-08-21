# Dynamic Routing Score V1.1

## 1. Scope

本版本在 V1.0 基础上补充 Token Efficiency、Runtime Capacity / Concurrency 与 System-Level Routing Budget。评分仅发生在 Hard Constraint 过滤之后。

## 2. Score Dimensions

Soft dimensions normalized to 0-100:

- Quality
- Reliability
- Task Fit
- Token Efficiency
- Cost Efficiency
- Latency

Capacity / Concurrency 与 System Routing Budget 属于候选可用性与运行时约束，不直接作为软分数，避免高分模型在资源耗尽时仍被选择。

## 3. Quality Constraint

先满足 `minimum_quality_threshold`。低于门槛直接剔除。

## 4. Reliability Constraint

先满足 `minimum_reliability_threshold`。成功率、失败率、超时率、重试率作为证据；样本不足时使用注册基线，不允许单次异常改变正式基线。

## 5. Token Efficiency

Token Efficiency 的目标不是最低 Token，而是**达到任务质量要求后的最低合理消耗**。

记录：

- input tokens
- output tokens
- cached input tokens（如适用）
- reasoning tokens（如适用）
- total tokens

评分时，在质量与可靠性达标候选中，对预计 Token 消耗进行归一化；避免不必要的上下文、过度输出和过高模型能力。

## 6. Cost Efficiency

预计成本：

`estimated_cost = input_tokens × input_price + output_tokens × output_price + cached/reasoning applicable cost`

只有满足质量与可靠性门槛的候选才进入成本比较。最低合理消耗不等于最低价格。

## 7. Latency

使用同 `capability_id + task_type` 的 P50 / P95 历史表现与当前要求。超出硬性延迟限制的候选在过滤阶段移除。

## 8. Task Fit

由 Capability、Task Type、Complexity 和历史有效结果决定。Task Fit 不能绕过 Capability Hard Constraint。

## 9. Strategies

### Quality First
- Quality: 40%
- Reliability: 25%
- Task Fit: 15%
- Token Efficiency: 10%
- Cost Efficiency: 7%
- Latency: 3%

### Cost First
- Token Efficiency: 35%
- Cost Efficiency: 30%
- Quality: 20%
- Reliability: 10%
- Task Fit: 3%
- Latency: 2%

Cost First 仍必须先通过 Quality / Reliability Gate。

### Balanced（默认）
- Quality: 30%
- Token Efficiency: 20%
- Reliability: 20%
- Task Fit: 12%
- Cost Efficiency: 12%
- Latency: 6%

`Routing Score = Σ(normalized_dimension_score × strategy_weight)`

## 10. Runtime Capacity / Budget

候选必须满足当前运行时：

- available concurrency
- queue / capacity protection
- RPM / TPM
- error / timeout protection
- System-Level Routing Budget

Budget 是系统级、时间窗口级资源上限，不是 Task 预算。预算压力不得自动降低质量门槛。

## 11. Tie Breaker

当 Score 差异小于 `score_tie_threshold`：
1. Token Efficiency 更高者；
2. 预计 Cost 更低者；
3. Reliability 更高者；
4. P95 Latency 更低者；
5. 状态更稳定且历史版本更可追溯者。

## 12. Failure / Retry

默认模型失败进入 Router。Router 选择的模型失败后按 retry policy 选择下一合格候选。用户显式指定模型失败不自动切换。

## 13. Decision Record

记录完整候选集、过滤原因、各维度分值、权重、最终分数、选中模型、预计 Token / Cost / Latency / Quality、实际消耗、并发状态、Budget 状态、Retry 与最终结果。

## 14. Governance

Score Weight、Threshold、Token Policy、Capacity Policy、Budget Policy 等配置必须版本化。正式规则变更经 Validation + Independent Audit 后生效。历史执行数据仅作为 Routing Evidence。
