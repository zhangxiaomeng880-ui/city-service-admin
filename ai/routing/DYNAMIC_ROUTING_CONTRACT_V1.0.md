# Dynamic Routing Contract V1.0

## 1. Scope

Dynamic Routing 是全局公共 Capability。它负责在用户未指定模型、默认模型失败或其他已配置 Trigger 发生时，从 `ACTIVE Model Pool` 中选择满足约束的模型。

Phase / Capability Agent 不实现自己的模型路由。

## 2. Routing Entry

```text
Task
 ↓
User Explicit Model?
 ├─ YES → execute user model → failure = user-visible failure
 └─ NO
     ↓
Default Model
     ↓
success → DONE
failure / trigger → Dynamic Router
```

## 3. Routing Input

- project / project_version
- phase / phase_version
- agent / agent_version
- task / task_version
- step / conversation
- capability_requirement
- task_type / complexity
- input / output token estimate
- quality / reliability / latency requirements
- compliance / data constraints
- model_pool_version
- default_model_policy_version
- routing_policy_version
- runtime capacity / concurrency
- system routing budget state
- relevant historical execution evidence

## 4. Hard Constraints

Before scoring, filter candidates by:

- capability fit
- context fit
- permission
- compliance
- data boundary
- availability
- model status
- policy constraints
- capacity / concurrency protection
- system routing budget constraints

Hard constraints cannot be bypassed by a high score.

## 5. Routing Strategies

- `quality_first`
- `cost_first`
- `balanced`（default）

Cost First does not lower the minimum quality / reliability gate. Low consumption means **minimum sufficient consumption**, not minimum token at any quality level.

## 6. Token Efficiency

Token efficiency is evaluated only after minimum quality and reliability requirements are satisfied. Record separately:

- input tokens
- output tokens
- cached input tokens when available
- reasoning tokens when available
- total tokens

The objective is to avoid unnecessary context, excessive output and excessive model capability while preserving required quality.

## 7. System-Level Routing Budget

Routing Budget is a system/runtime budget for a concurrency window, not a per-task business budget.

Configurable fields:

- `budget_window`
- `max_tokens`
- `max_cost`
- `max_concurrent_requests`
- `max_rpm`
- `max_tpm`
- `budget_protection_threshold`

Budget pressure may change candidate availability or queueing, but must not silently lower mandatory quality thresholds.

## 8. Capacity / Concurrency

Candidate runtime state must consider:

- max concurrency
- current concurrency
- available concurrency
- queue depth
- RPM
- TPM
- P95 latency
- timeout rate
- error rate

A model at protection threshold may be deprioritized; a model at hard capacity may be removed from the candidate set.

## 9. Retry / Fallback

Router-selected model failure may move to the next eligible candidate according to `max_retry_count`, system budget, capacity and policy. Retries must be bounded.

If all eligible candidates fail, the routing result is `ROUTING_FAILED` and the task enters user/human decision flow. No infinite retry.

## 10. Batch / Parallel Execution

Routing input may declare:

- `single`
- `batch`
- `parallel`
- `streaming`

For large batch work, Router may distribute work across eligible models while preserving quality constraints and full per-run traceability.

## 11. Configurability

The following are configuration assets, not hard-coded Agent logic:

- routing triggers
- routing strategy
- score weights
- quality / reliability thresholds
- token efficiency policy
- latency policy
- capacity thresholds
- concurrency policy
- retry policy
- fallback policy
- system routing budget
- cross-provider policy
- tie-break rules

Every configuration has an ID, version, status and effective time.

## 12. Routing Decision

Every routing invocation creates a Routing Decision Record containing candidate set, filter reasons, strategy, scores, weights, selected model, expected metrics, actual result and feedback.

## 13. Full Trace

Routing Trace links:

`Project → Phase → Task → Conversation → Step → Capability Requirement → Policy Versions → Model Pool → Candidate Set → Routing Decision → Model Run → Quality Result → Token / Cost / Latency → Retry / Failure → Final Outcome`

The trace is a durable Project Data Asset.

## 14. Explainability

A routing decision must be explainable from stored data: why routing triggered, why candidates were filtered, why the selected model ranked highest, and what the actual outcome was.

## 15. Versioning / Governance

Changes to Model Pool, Default Model Policy, Routing Policy, Score Weights, Budget or Capacity Policy are versioned. Material changes require Validation and Independent Audit before activation.

Historical traces retain the exact versions used at execution time.

## 16. Feedback

Execution results feed Routing Evidence:

- quality
- success / failure
- tokens
- cost
- latency
- retry
- human correction / rework
- capacity behavior

Feedback may inform future policy changes but cannot silently mutate formal routing rules.
