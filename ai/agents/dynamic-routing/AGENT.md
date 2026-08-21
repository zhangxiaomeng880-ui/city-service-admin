# Dynamic Routing Capability Agent V1.0

## 1. Agent Type

Capability Agent / Global Runtime Capability

## 2. Responsibility

提供统一的模型动态路由能力。负责候选模型过滤、策略选择、评分、容量/并发保护、Token Efficiency、System-Level Routing Budget、失败重试、Routing Decision 和 Full Trace。

不负责：

- 创建或维护 Phase Agent；
- 绕过 User Explicit Model；
- 绕过 Hard Constraints；
- 自行注册未经验证的模型；
- 未经 Audit 修改正式 Routing Policy。

## 3. Input

遵循 `DYNAMIC_ROUTING_CONTRACT_V1.0.md` 的 Routing Input。

## 4. Execution

```text
Validate Input
 ↓
Check User Explicit Model
 ↓
Load Model Pool / Policy Versions
 ↓
Evaluate Routing Trigger
 ↓
Apply Hard Constraints
 ↓
Check Capacity / Concurrency / System Budget
 ↓
Build Candidate Set
 ↓
Apply Routing Strategy
 ↓
Calculate Routing Score
 ↓
Select Model
 ↓
Execute / Delegate Model Run
 ↓
Record Routing Decision + Full Trace
 ↓
Validate Result
 ↓
Retry / Next Candidate when policy allows
 ↓
Write Routing Feedback
```

## 5. User Explicit Model Rule

用户显式指定模型优先级最高。通过 Hard Constraint / Compliance Check 后直接执行。执行失败时向用户提示失败，不自动切换模型。

## 6. Default Model Rule

没有用户指定时使用 Phase / Capability Default Model。默认模型执行失败、不可用或质量验证失败时，按 Routing Trigger 进入 Dynamic Routing。

## 7. Routing Output

结构化输出至少包括：

- routing_id
- trigger
- policy versions
- candidate models
- filtered candidates + reasons
- strategy
- dimension scores
- final score
- selected model
- expected quality / cost / token / latency
- execution result
- actual token / cost / latency
- retry / failure
- final outcome
- trace_id

## 8. State

`CREATED → INPUT_VALIDATED → CANDIDATES_FILTERED → SCORED → SELECTED → EXECUTING → COMPLETED`

Exceptions: `WAITING_FOR_INPUT / USER_DECISION_REQUIRED / ROUTING_FAILED / BLOCKED / FAILED`.

## 9. Quality Rule

Token / Cost Efficiency never overrides mandatory quality or reliability thresholds. Low consumption means minimum sufficient consumption.

## 10. Concurrency Rule

Routing must consider current concurrency, queue depth, RPM, TPM, P95 latency and error rate. Capacity protection may deprioritize or remove candidates but may not silently lower mandatory quality thresholds.

## 11. Audit / Governance

All material routing decisions are traceable. Policy, Model Pool and Default Model changes are versioned. Formal routing-rule changes require Independent Audit before activation.
