# Model Pool Contract V1.0

## 1. Purpose

Model Pool 是全局统一、可扩展、可审计的模型资产池。Phase Agent、Capability Agent、Audit Agent 不自行维护模型名单。

## 2. Registry Layers

```text
Provider Registry
 ↓
Model Registry
 ↓
Adapter / Invocation Contract
 ↓
Validation
 ↓
Active Model Pool
```

注册不等于可用。只有通过接入验证的模型才能进入 `ACTIVE` 状态并参与默认模型或动态路由。

## 3. Provider Registration Fields

- `provider_id`
- `provider_name`
- `provider_type`
- `endpoint_ref`
- `auth_ref`
- `adapter_id`
- `region`
- `status`
- `registration_version`
- `effective_from`
- `owner`

敏感认证信息只保存引用，不进入普通模型资产文档。

## 4. Model Registration Fields

- `model_id`
- `model_name`
- `provider_id`
- `model_version`
- `capabilities`
- `context_window`
- `input_price`
- `output_price`
- `cached_input_price`（如适用）
- `reasoning_support`（如适用）
- `streaming_support`
- `availability`
- `rate_limit_rpm`
- `rate_limit_tpm`
- `max_concurrency`
- `data_boundary`
- `compliance_tags`
- `status`
- `metadata_version`

## 5. Model Adapter Contract

所有 Provider 必须通过统一调用契约暴露：

- input / output
- streaming
- error code / error type
- input / output / cached / reasoning / total tokens
- cost
- latency
- request id
- retryability

Agent 不直接依赖 Provider 私有调用格式。

## 6. Extensible Onboarding

新增 Provider / Model 必须经过：

```text
Register
 ↓
Adapter Mapping
 ↓
Metadata Validation
 ↓
Connectivity Test
 ↓
Invocation Test
 ↓
Usage / Token / Cost Verification
 ↓
Capability Verification
 ↓
Independent Audit when material
 ↓
ACTIVE / REJECTED
```

新增模型不得要求修改既有 Phase Agent 或 Capability Agent。

## 7. Status

`DRAFT → REGISTERED → VALIDATING → ACTIVE`

异常状态：`REJECTED / DISABLED / DEPRECATED`。

`ACTIVE` 才可参与路由。`DEPRECATED` 不进入新路由，但保留历史执行可追溯性。

## 8. Versioning

Provider、Model、Metadata、Adapter 均独立版本化。Model Pool 本身形成 `model_pool_version`。任何影响可选模型集合的变更必须产生新版本并保留历史版本。

## 9. Governance

模型进入 ACTIVE、下线、价格/能力元数据重大变更必须经过 Validation；影响正式路由的重大规则变更必须经过 Independent Audit。历史执行记录不得因模型下线而删除。
