# Default Model Policy V1.0

## 1. Purpose

定义 Phase / Capability 在没有用户显式指定模型时的初始默认模型策略。默认模型是第一选择，不是失败后的终点。

## 2. Priority

```text
User Explicit Model
 ↓
Hard Constraint / Compliance Check
 ↓
Execute User Model
```

用户未指定模型时：

```text
Phase / Capability Default Model
 ↓
Execute
 ↓
SUCCESS → DONE
FAIL / UNAVAILABLE / QUALITY VALIDATION FAILURE
 ↓
Dynamic Routing
```

用户指定模型执行失败时不得自动切换其他模型，直接向用户提示失败并等待用户决策。

## 3. Policy Fields

- `policy_id`
- `policy_version`
- `scope_type`: `phase` / `capability`
- `scope_id`
- `default_model_id`
- `default_model_version_policy`
- `fallback_on_failure`: `dynamic_routing`
- `quality_threshold`
- `reliability_threshold`
- `effective_from`
- `status`
- `priority`
- `notes`

## 4. Default Model Selection

默认模型必须来自 `ACTIVE Model Pool`，并满足对应 Capability、Context、Permission、Compliance 和 Data Boundary 要求。

默认模型变更只修改 Policy，不修改 Agent MD。

## 5. Failure Trigger

以下情况可以触发 Dynamic Routing：

- invocation failure
- provider unavailable
- timeout / rate limit
- context failure
- schema / output validation failure
- quality validation below required threshold
- default model no longer satisfies current constraints

用户显式指定模型的失败不触发自动路由。

## 6. Versioning & Audit

Default Model Policy 必须版本化。生效前进行 Validation；影响正式项目运行的变更必须通过 Independent Audit。历史 Routing Trace 必须保留其当时使用的 Policy Version。
