# Stage Contract V1.1

## Purpose
统一所有 Stage Agent 的输入解析、执行、输出、Gate、Handoff 和状态管理，并明确 Testing、Compliance、Audit 的职责边界。

## Input Source Priority

Stage Input 按以下优先级解析：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. User Input

User Input 仅用于补充前三层仍缺失的 Required Input，或明确覆盖已有信息。

## Input Readiness

执行任何阶段前必须：

1. Load Project Context
2. Load Previous Stage Output
3. Load applicable Knowledge
4. Validate Required Input
5. 判断是否存在 Blocker

已有信息不得重复询问。

## Execution Contract

每次阶段执行必须输出：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

## Independent Quality Gates

### Testing Gate

回答：**功能是否正确工作？**

关注功能、接口、异常、自动化测试、回归测试和缺陷验证。

### Compliance Gate

回答：**是否符合已经确认的规则、约束和适用要求？**

关注业务规则、设计/技术约束、权限、数据、流程、环境、发布要求及其他适用合规规则。

Compliance AGENT 独立于 Testing AGENT，可读取 Testing 结果但不得直接继承其 PASS。

### Audit Gate

回答：**流程、结论、证据和 Gate 是否真实、完整、可追溯？**

Audit AGENT 独立于 Testing 和 Compliance，不属于任何执行阶段，也不得由被审计 Agent 自我替代。

## Gate Independence

一个 Gate 的 PASS 不得自动推导另一个 Gate 的 PASS。

例如：

- Testing PASS ≠ Compliance PASS
- Compliance PASS ≠ Audit PASS
- Testing PASS + Compliance PASS ≠ Audit PASS

整体发布/交付结论必须基于所有适用 Gate。

## Status

- `COMPLETED`：阶段目标完成，Gate 通过。
- `PARTIAL`：已完成部分工作，但仍有非阻塞未完成项。
- `BLOCKED`：存在阻塞项，无法继续正式执行。
- `SKIPPED`：按项目条件跳过，但仍必须保留 Stage Agent / Contract / 状态记录，不得删除阶段能力。

## Compliance Status

Compliance AGENT 使用：

- `PASS`：适用检查项全部通过，无未处理高风险问题。
- `PARTIAL`：存在非阻塞问题、待补证据或明确待处理项。
- `FAIL`：存在阻塞性不合规项。
- `N/A`：明确不适用，并记录原因。

## Gate

Gate 必须明确：

- Required Input 是否齐全
- Blocker 是否存在
- Output 是否完整
- Output Verification 是否通过
- 适用的 Testing / Compliance / Audit Gate 是否通过
- 是否允许 Handoff

## Evidence

关键检查和自动检测必须保留 Evidence Reference，至少能够回答：

1. 从哪里发现？
2. 什么时候发现？
3. 依据是什么？
4. 使用哪个版本/时间范围？
5. 为什么得出该判断？
6. 关联哪个事项？

## Handoff

Handoff 必须携带：

- Project Context Reference
- Current Stage Output
- Gate Result
- Testing Result（如适用）
- Compliance Result（如适用）
- Audit Result（如适用）
- Outstanding Warnings / Blockers
- Next Stage Required Input

## Context Reuse

Stage 切换、Resume、Continue 和 Handoff 不重置 Project Context。只有用户明确修改时才更新已有值。

## Execution Continuity

同一问题第一次无法解决时必须记录 Blocked 原因和缺失项。不得通过重复询问相同信息形成循环；连续阻塞必须进入 Review / Evolution 并同步 Knowledge。
