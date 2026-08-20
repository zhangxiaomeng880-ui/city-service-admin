# Stage Contract V1.3

## Purpose
统一所有 Stage Agent 的输入解析、执行、输出、Gate、Handoff、状态和业务 Artifact 管理，并明确 Testing、Compliance、Audit 的职责边界。

## Input Source Priority
1. Project Context
2. Previous Stage Output
3. Validated Output Artifacts / Capability Results
4. Knowledge Base
5. User Input

User Input 仅用于补充仍缺失的 Required Input，或明确覆盖已有信息。

## Input Readiness
执行任何阶段前必须：Load Project Context → Previous Stage Output → relevant validated Artifacts → applicable Knowledge → validate Required Input → identify Blocker。

## Execution Contract
每次阶段执行必须产生结构化 Execution Record，并输出 Input、Input Verification、Execution、Output/Artifact、Output Verification、Gate、Handoff、Status、Evidence、Execution Metadata。Execution Records 与业务 Output Artifact 分离。

## Capability Selection Contract
先判断步骤需要的能力，再从 Common Capability Pool 选择 provider。顺序固定为：
`Task/Step → Required Capability → Registry → Candidate → Authorization/Availability → Quality/Cost/Latency → Selection → Execution → Record`。

Common Capability Pool：`TOOL / USER_MCP / USER_SKILL / CAPABILITY_AGENT / MODEL`。用户配置的 MCP 与 User Skill 均属于公共能力池。不得因“可用”而默认调用全部能力。

## Business Artifact
需要形成可复用业务结果时，必须生成版本化 Output Artifact。需求定义阶段输出一个权威、版本化 PRD；Competitor Analysis、Data Analysis、用户输入和 Product Decision 是支持来源，不替代 PRD。

## Decision Record
改变 requirement、scope、solution、priority、acceptance criteria 或 downstream behavior 的重要决定必须留 Decision Record。Recommendation ≠ Decision，除非 Project Rule 明确授权自动接受。

## Testing Lifecycle Contract
Testing 必须形成闭环：
`Input → Readiness → Test Planning → Test Case Generation → Test Case Audit → Test Execution → Issue Record → Issue Workflow → Code Fix → Preview/Self-Test → Retest → Regression → Resolution Record → Test Report → Report Audit → Testing Gate → Handoff`。

测试范围至少包括：Visual、Functional、API、Performance、Boundary、Tracking/Analytics、Compatibility；有适用要求时增加 Runtime Compliance Validation。

Automation First：优先自动化；自动化不可用/不适合或需要人工判断时使用 Manual。两者必须使用同一 Test Execution Record Contract。

### Testing Pre-Execution Gate
Test Case 必须经过独立 Audit Agent 审计后才能正式执行。Audit FAIL/BLOCKED 时不得进入正式执行，除非授权人工决策形成记录。

### Testing Execution Gate
每个执行必须关联 Test Case、Project/Requirement/Code/Environment/Test Data Version、Expected/Actual、Evidence、Status，并记录所用 Tool/MCP/Skill/Capability/Model Run 及 Token/Cost/Latency/Retry 等适用数据。

### Defect Gate
Issue 只有在规定的 Retest/Regression 通过或存在授权的 risk acceptance/defer decision 后才能标记解决/关闭。代码修复由 FE/BE Coding Task 负责，Testing 负责验证。

### Test Report Gate
Test Report 必须由结构化 Test Case、Execution、Issue、Retest、Regression 数据聚合生成；叙述不得覆盖源数据。Report Audit 必须独立于 Testing Agent。

## Testing Output Artifacts
至少包括：Test Case Set、Test Case Audit Record、Test Execution Records、Issue/Defect Records、Retest/Regression Records、Test Report、Testing Phase Output。Schema 位于 `ai/schemas/testing/`。

## Project Data Assets
所有阶段执行数据均为项目数据资产。Testing 特别记录：workload、task/step/execution 数量、automation/manual ratio、duration、retry、human intervention、coverage、issue 数量/严重级别/状态、resolution/reopen/defer、test pass/fail/blocked、Tool/MCP/Skill/Capability/Model runs、tokens、cost、latency、evidence、decision。

数据链必须可按 `Project → Phase → Task → Step → Run` 聚合，并保留向下追溯关系。

## Independent Quality Gates
Testing Gate：功能是否正确工作；Compliance Gate：是否符合适用规则；Audit Gate：流程、结论、证据、Artifact、记录和 Gate 是否真实完整可追溯。三者独立，任何一个 PASS 不得推导另一个 PASS。

Audit Agent 独立于 Testing 与 Compliance，不属于执行阶段，不得由被审计 Agent 自我替代。

## Status
`COMPLETED`：目标、Output/Artifact、适用 Gate 均完成；`PARTIAL`：非阻塞项未完成；`BLOCKED`：存在阻塞；`SKIPPED`：按项目条件跳过但保留能力与记录。

## Gate
必须明确 Required Input、Blocker、Output/Artifact、Output Verification、Evidence、适用 Testing/Compliance/Audit Gate、Handoff readiness。

## Evidence
关键检查保留 Evidence Reference，能够回答来源、时间、依据、版本/时间范围、判断理由、关联事项/Artifact/Decision。

## Handoff
Handoff 必须携带 Project Context、Current Stage Output、Artifact ID/Version、Gate Results、Decision References、Testing/Compliance/Audit Results（如适用）、Warnings/Blockers、Next Stage Required Input。Phase Output 是下一阶段的正式主要输入。

## Context Reuse / Continuity
Stage 切换不重置 Project Context。已有有效 Artifact 优先复用并记录引用。重复阻塞必须进入 Review/Evolution 并同步 Knowledge，不得形成询问循环。

## Contract References
- `ai/rules/AGENT_MD_CONTRACT_V1.0.md`
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md`
- `ai/rules/CAPABILITY_REGISTRY_V1.0.md`
- `ai/agents/testing/AGENT.md`
- `ai/schemas/testing/`
