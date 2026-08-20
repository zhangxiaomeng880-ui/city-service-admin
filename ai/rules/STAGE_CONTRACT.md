# Stage Contract V1.2

## Purpose
统一所有 Stage Agent 的输入解析、执行、输出、Gate、Handoff、状态和业务 Artifact 管理，并明确 Testing、Compliance、Audit 的职责边界。

## Input Source Priority

Stage Input 按以下优先级解析：

1. Project Context
2. Previous Stage Output
3. Validated Output Artifacts / Capability Results
4. Knowledge Base
5. User Input

User Input 仅用于补充前三层仍缺失的 Required Input，或明确覆盖已有信息。

## Input Readiness

执行任何阶段前必须：

1. Load Project Context
2. Load Previous Stage Output
3. Load relevant validated Artifacts
4. Load applicable Knowledge
5. Validate Required Input
6. 判断是否存在 Blocker

已有信息不得重复询问。

## Execution Contract

每次阶段执行必须产生结构化 Execution Record，并输出：

- Input
- Input Verification
- Execution
- Output / Output Artifact when applicable
- Output Verification
- Gate
- Handoff
- Status
- Evidence References
- Execution Metadata

Execution Records 与业务 Output Artifact 分离：前者记录执行过程与使用数据，后者服务业务消费。

## Business Artifact

当阶段目标是形成可复用业务结果时，必须生成版本化 Output Artifact。

对于需求定义阶段：

> **一个 Requirement Task 对应一个权威、版本化 PRD Artifact。**

Competitor Analysis、Data Analysis、用户输入和 Product Decision 是 PRD 的支持来源，不替代 PRD。

PRD 必须整合经过验证且与需求相关的结论，并通过引用保持材料结论的可追溯性；不得把 Model Trace、MCP 日志、Token / Cost 明细直接作为 PRD 正文。

## Decision Record

Material product decisions that change requirement, scope, solution, priority, acceptance criteria, or downstream behavior must have a Decision Record when applicable.

Recommendation ≠ Decision。除非项目规则明确授权自动接受，否则需要授权决策者确认。

## Independent Quality Gates

### Testing Gate

回答：**功能是否正确工作？**

关注功能、接口、异常、自动化测试、回归测试和缺陷验证。

### Compliance Gate

回答：**是否符合已经确认的规则、约束和适用要求？**

关注业务规则、设计/技术约束、权限、数据、流程、环境、发布要求及其他适用合规规则。

Compliance Agent 独立于 Testing Agent，可读取 Testing 结果但不得直接继承其 PASS。

### Audit Gate

回答：**流程、结论、证据、Artifact、记录和 Gate 是否真实、完整、可追溯？**

Audit Agent 独立于 Testing 和 Compliance，不属于任何执行阶段，也不得由被审计 Agent 自我替代。

## Gate Independence

一个 Gate 的 PASS 不得自动推导另一个 Gate 的 PASS。

例如：

- Testing PASS ≠ Compliance PASS
- Compliance PASS ≠ Audit PASS
- Testing PASS + Compliance PASS ≠ Audit PASS

整体发布 / 交付结论必须基于所有适用 Gate。

## Status

- `COMPLETED`：阶段目标完成，适用 Gate 通过，且 required Output / Artifact 已形成。
- `PARTIAL`：已完成部分工作，但仍有非阻塞未完成项。
- `BLOCKED`：存在阻塞项，无法继续正式执行。
- `SKIPPED`：按项目条件跳过，但仍必须保留 Stage Agent / Contract / 状态记录，不得删除阶段能力。

## Gate

Gate 必须明确：

- Required Input 是否齐全
- Blocker 是否存在
- Output / Artifact 是否完整
- Output Verification 是否通过
- Evidence 是否充分
- 适用的 Testing / Compliance / Audit Gate 是否通过
- 是否允许 Handoff

## Evidence

关键检查和自动检测必须保留 Evidence Reference，至少能够回答：

1. 从哪里发现？
2. 什么时候发现？
3. 依据是什么？
4. 使用哪个版本 / 时间范围？
5. 为什么得出该判断？
6. 关联哪个事项 / Artifact / Decision？

## Handoff

Handoff 必须携带：

- Project Context Reference
- Current Stage Output
- Output Artifact ID / Version when applicable
- Gate Result
- Decision References when applicable
- Testing Result（如适用）
- Compliance Result（如适用）
- Audit Result（如适用）
- Outstanding Warnings / Blockers
- Next Stage Required Input

## Context Reuse

Stage 切换、Resume、Continue 和 Handoff 不重置 Project Context。只有用户明确修改时才更新已有值。

已有有效 Artifact 应优先复用，并记录引用；不得无理由重复生成。

## Execution Continuity

同一问题第一次无法解决时必须记录 Blocked 原因和缺失项。不得通过重复询问相同信息形成循环；连续阻塞必须进入 Review / Evolution 并同步 Knowledge。

## Contract References

- `ai/rules/AGENT_MD_CONTRACT_V1.0.md`
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md`
- `ai/rules/CONVERSATION_ORCHESTRATION.md`
