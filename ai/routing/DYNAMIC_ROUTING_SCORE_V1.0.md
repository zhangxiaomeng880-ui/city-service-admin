# Dynamic Routing Score V1.0

## 1. Scope

本规范定义 Dynamic Router 在候选模型已经通过 Hard Constraint Filter 后的评分与排序规则。用户显式指定模型不进入自动路由；默认模型执行失败或满足既定 Routing Trigger 时进入本机制。

## 2. 配置字段

### 2.1 Routing Policy
- `policy_id`
- `policy_version`
- `strategy`: `quality_first` / `cost_first` / `balanced`
- `effective_from`
- `status`
- `minimum_quality_threshold`
- `minimum_reliability_threshold`
- `maximum_cost_per_task`
- `maximum_latency_ms`
- `max_retry_count`
- `allow_cross_provider`
- `allow_fallback`

### 2.2 Task Context
- `project_id`
- `phase_id`
- `agent_id`
- `task_id`
- `step_id`
- `capability_id`
- `task_type`
- `complexity_level`
- `input_tokens_estimate`
- `output_tokens_estimate`
- `quality_requirement`
- `latency_requirement`
- `cost_constraint`
- `compliance_constraints`
- `data_constraints`

### 2.3 Model Candidate
- `provider_id`
- `model_id`
- `model_version`
- `capability_fit`
- `context_fit`
- `quality_score`
- `reliability_score`
- `cost_efficiency_score`
- `latency_score`
- `historical_sample_size`
- `availability_score`

## 3. Hard Constraints

Hard constraints are filters, not scoring factors. Any candidate failing a hard constraint is removed before scoring. Constraints include capability, context, permission, compliance, data boundary, availability, explicit user constraints and policy limits.

## 4. Score Model

All soft dimensions are normalized to 0-100.

### 4.1 Quality Score
优先使用该模型在同 `capability_id + task_type` 下的历史有效质量结果；样本不足时使用模型能力基线。质量评分不得用单次异常结果直接改变正式基线。

### 4.2 Reliability Score
综合成功率、失败率、超时率、重试率；同任务类型历史数据优先于全局数据。

### 4.3 Cost Efficiency Score
不是简单按价格倒序。先计算预计任务成本：

`estimated_cost = input_tokens_estimate × input_price + output_tokens_estimate × output_price`

再在通过质量与可靠性门槛的候选中进行成本归一化。满足要求的最低预计成本候选得到最高 Cost Efficiency。

### 4.4 Latency Score
基于同任务类型历史 P50/P95 latency 与当前 latency requirement 计算；超出 Hard/Policy latency limit 的候选已经在过滤阶段移除。

### 4.5 Task Fit
由 capability、task_type、复杂度与历史表现共同确定。Task Fit 不允许绕过 Capability Hard Constraint。

## 5. Strategy Weights

### Quality First
- Quality: 45%
- Reliability: 25%
- Task Fit: 15%
- Cost Efficiency: 10%
- Latency: 5%

### Cost First
- Cost Efficiency: 45%
- Quality: 25%
- Reliability: 15%
- Task Fit: 10%
- Latency: 5%

### Balanced（默认）
- Quality: 30%
- Cost Efficiency: 25%
- Reliability: 20%
- Task Fit: 15%
- Latency: 10%

`Routing Score = Σ(normalized_dimension_score × strategy_weight)`

## 6. Minimum Quality / Reliability Gate

评分前必须满足最低质量与可靠性门槛。若多个候选均满足，则允许 Cost First / Balanced 选择更低成本候选；不得为了最低成本选择不满足门槛的模型。

## 7. Tie Breaker

当两个候选分数差异小于 `score_tie_threshold`：
1. 选择预计成本更低者；
2. 成本接近时选择可靠性更高者；
3. 仍接近时选择 P95 latency 更低者；
4. 仍无法区分时选择注册时间更早且状态稳定者。

## 8. Failure / Retry

默认模型失败 → 进入 Dynamic Routing。Router 选中的候选失败时，根据 `max_retry_count`、成本和时间预算选择下一候选。用户显式指定模型失败不自动切换模型，只向用户报告失败。

## 9. Routing Decision Record

每次路由必须记录：
- routing_id
- routing_trigger
- routing_policy_id/version
- candidates_before_filter
- candidates_after_filter
- filtered_reasons
- strategy
- dimension_scores
- weights
- final_scores
- selected_provider/model/version
- expected_cost
- expected_latency
- expected_quality
- execution_result
- actual_tokens
- actual_cost
- actual_latency
- retry_count
- human_override
- feedback_status

## 10. Governance

历史执行数据只能作为 Routing Evidence，不得未经 Audit 直接修改正式模型池、默认模型或评分权重。评分规则变更必须版本化，并经过 Independent Audit 后生效。
