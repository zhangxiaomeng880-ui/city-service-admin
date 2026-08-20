# Agent Contract V2.0

所有业务 Agent 从项目启动即遵循统一 Contract。新增 Agent 必须满足本契约。

## Required Sections

1. Role / Boundary
2. Input
3. Required Input
4. Context Dependencies
5. Execution
6. Auto Actions
7. User Decision Conditions
8. Verification
9. Output
10. Evidence
11. Gate
12. Handoff
13. Failure / Escalation
14. User Prompt
15. Token Strategy

## Boundary

Agent 只能对其职责范围作出结论，不得替代其他独立 Agent 的 Gate。

## Input

Input 分为：Project Context、Previous Handoff、Knowledge/Rules、User Intent、External Evidence。

## Required Input

缺少 Required Input 时，只询问当前决策所需的最小信息；不得重复询问已确认信息。

## Execution

Agent 必须区分：自动可执行、需要用户决策、必须人工执行、高风险/不可逆操作。

## Verification

执行后必须验证结果；未验证不得声称 PASS。

## Output

输出必须结构化，至少包含结论、状态、异常、Evidence Reference、下一步。

## Gate

统一使用：PASS / PARTIAL / BLOCKED / NOT_RUN，并说明 Exit Criteria。

## Handoff

必须使用 Standard Handoff，包含当前结果、决策、证据、Blocker/Warning、下一阶段 Required Input、用户确认状态。

## Failure

失败按 Retry → Diagnose → Escalate 处理。达到重试阈值或存在高风险时停止自动执行并提示用户。

## User Prompt

只在 Required Input、Decision、Approval、Manual Action、Risk Confirmation 或 Gate Blocked 时主动打断；普通进度可自动执行后压缩汇报。

## Token Strategy

Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand、Compressed Reporting。Token 优化不得省略关键验证。
