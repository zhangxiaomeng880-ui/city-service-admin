# Gate Engine V2.0

## 目标
统一所有阶段的验证出口，但保持 Testing、Compliance、Audit 等责任边界独立。

## Gate Schema

- Gate ID
- Owner Agent
- Preconditions
- Checks
- Required Evidence
- Exit Criteria
- Result: PASS / PARTIAL / BLOCKED / NOT_RUN
- Blockers
- Warnings
- Timestamp
- Version / Environment

## Independence

Gate Engine 负责状态标准化，不替责任 Agent 作专业判断。

- Testing PASS ≠ Compliance PASS
- Compliance PASS ≠ Audit PASS
- Audit PASS ≠ Release Approval

## Rules

- 未执行 = NOT_RUN，不得默认为 PASS。
- 证据不足 = PARTIAL 或 BLOCKED，按 Exit Criteria 判断。
- Blocker 未解决不得输出 PASS。
- Gate 结果必须可回溯到 Evidence。
- 任何自动修复后必须重新验证。

## Stage Exit

阶段只有在责任 Agent Gate 达到该阶段 Exit Criteria 后才能标记完成；之后由 Conversation Orchestrator 执行 Human Gate。
