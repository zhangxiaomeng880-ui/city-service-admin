# Resume & Recovery Contract V1.0

## 1. Purpose

定义 WAITING / BLOCKED / FAILED / PAUSED 状态下的恢复方式，保证项目不中断、不重复询问、不重复执行已完成工作。

## 2. Resume Point

每个异常终止的 Task / Phase 必须写入 Resume Point：

```yaml
resume_id:
project_id:
stage:
phase:
task:
step:
state:
completed_steps:
unresolved_steps:
missing_inputs:
blocker:
last_valid_artifact:
last_valid_version:
last_commit:
next_legal_action:
retry_count:
last_error:
evidence_refs:
```

## 3. Recovery Rules

1. 先加载 Project Context / State / Resume Point。
2. 复用已确认 Input，不重新询问。
3. 从最近未完成 Step 继续。
4. 只重试失败 Step 或受影响 downstream。
5. Contract / Rule / Input / Version 改变时重新执行 Readiness。
6. 恢复后生成新的 Execution Record，并关联原 Resume Point。

## 4. Retry / Escalation

- deterministic failure：优先修复环境 / 输入后重试；
- model quality failure：进入 Model Escalation；
- tool / MCP failure：记录失败证据，可切换到已授权替代 capability；
- repeated identical failure：触发 Review / Evolution，而非无限 retry。

## 5. No Duplicate Work

以下条件满足时不得重新执行：

- 相同 Input；
- 相同 Contract / Rule；
- 相同 Artifact Version；
- 上一次结果已通过 Quality / Audit；
- 没有受影响的 upstream change。

## 6. Resume Completion

恢复完成后必须重新执行受影响的 Verification、Quality Gate 与必要 Audit，不得沿用已经过期的 PASS。
