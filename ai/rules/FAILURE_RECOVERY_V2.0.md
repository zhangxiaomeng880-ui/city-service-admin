# Failure Recovery V2.0

## 标准流程

```text
Failure
↓
Classify
↓
Retry (safe)
↓
Verify
↓
Diagnose
↓
Retry with bounded attempts
↓
Escalate / User Decision
```

## Failure Classes

- Transient：可重试的临时故障
- Input：输入缺失/错误
- Environment：环境或依赖问题
- Logic：实现/规则问题
- Evidence：证据不足
- Permission：授权问题
- Conflict：版本/分支/业务冲突
- Risk：高风险或不可逆操作

## Retry

只有安全、可重复的操作允许自动重试。重试必须有明确上限；达到阈值后停止自动循环并进入 Diagnose / Escalate。

## Escalation

以下情况必须暂停并提示用户：需要授权、Secret、生产操作、业务决策、数据破坏风险、无法验证的关键结论。

## Quality

失败不能被压缩成“执行完成”。最终状态必须反映真实结果，并记录失败证据和处理动作。
