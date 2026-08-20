# AI Native 流程复盘 V1.4

## 1. 复盘范围

本轮在 Agent 分类、统一 AGENT MD Contract、Capability Agent、MCP 公共能力池、Task / Conversation 隔离、执行成本记录和独立 Audit 体系基础上，进一步完成了 **Audit 替代默认人工评审的结构化能力升级**，并补齐了 Testing Phase 的执行闭环、结构化资产、能力调用和项目数据资产。

本轮不讨论 Dynamic Model Routing 的最终算法；动态模型路由继续作为独立设计议题。

## 2. 结构性提升：Audit 替代默认人工评审

### 2.1 原有问题

原流程容易把“评审”理解为阶段执行后的人工动作。这样会带来三个问题：

1. 人工评审成为默认瓶颈；
2. 不同阶段的评审标准容易不一致；
3. 评审结果和执行过程难以形成统一、可审计的数据资产。

### 2.2 新原则

正式评审能力统一收敛为独立 Audit Agent：

```text
Stage / Task Output
 ↓
Quality Gate
 ↓
Independent Audit Agent
 ↓
PASS → Handoff
FAIL / BLOCKED / LOW CONFIDENCE / HIGH RISK
 ↓
Remediation / Human Decision
```

Audit Agent 与被审计 Agent 保持职责独立，生产者不得自我认证正式 Audit PASS。

人工评审从默认路径调整为升级路径，仅用于失败、阻塞、高风险、低置信度、异常或用户明确要求的场景。

### 2.3 形成的能力价值

这一变化不是简单的“减少人工”，而是把评审从人工动作升级为系统能力：

- 统一 Audit Contract；
- 统一 Gate；
- 统一 Audit Evidence；
- 统一失败 / 升级路径；
- 可统计 Audit 通过率、失败原因、人工介入率；
- 可追踪不同 Agent / Capability 的质量表现；
- 为后续模型、工具和能力优化提供数据基础。

## 3. 本轮 Testing 设计完善

### 3.1 之前的不足

Testing 已定义视觉、功能、接口、性能、边界、埋点等测试范围，但早期设计没有完整覆盖：

- Test Case 的正式结构化资产；
- Test Case → Execution 之间的独立 Audit Gate；
- Test Execution 的完整执行追踪；
- Issue 的完整生命周期；
- Fix → Preview → Retest → Regression 闭环；
- Retest / Regression 独立 Schema；
- Test Report 的结构化数据；
- Testing 过程的工作量、问题、Token、Cost 等项目数据资产。

### 3.2 最终 Testing 生命周期

```text
Testing Input
 ↓
Readiness Gate
 ↓
Test Planning
 ↓
Test Case Generation
 ↓
Test Case Audit
 ↓
Test Execution
 ↓
Issue Record / Workflow
 ↓
Coding Fix
 ↓
Preview / R&D Self-Test
 ↓
Retest
 ↓
Regression
 ↓
Test Report
 ↓
Report Audit
 ↓
Testing Gate
 ↓
Release Handoff
```

### 3.3 测试范围

当前 Testing 范围包括：

- Visual
- Functional
- API / Interface
- Performance
- Boundary / Edge
- Data Tracking / Analytics Reporting
- Compatibility
- Runtime Compliance（如适用）

自动化测试优先；人工测试作为无法自动化、需要人工判断、异常升级或明确要求时的补充。

### 3.4 Agent 与 Capability 边界

Testing 是 Process Phase，由 Testing Process Agent 负责生命周期编排；具体能力复用 Capability Agent 和公共能力池，不为 Retest / Regression 等步骤重复创建 Agent。

当前能力包括：

- Test Case Generation Capability
- Test Execution Capability
- Testing Issue Management Capability
- Testing Reporting Capability
- Independent Audit Agent

### 3.5 能力池调用原则

本轮进一步明确：**先判断需要什么能力，再选择 Provider。**

```text
Task / Step
 ↓
Determine Capability Requirement
 ↓
Capability Discovery
 ↓
Tool / User MCP / User Skill / Capability Agent / Model Selection
 ↓
Execution
 ↓
Execution Record
```

Testing 不提前绑定具体厂商工具。不同测试类型在执行时根据能力需求选择 Browser / API / Performance / Device / Analytics / Issue Management 等 Tool、用户 MCP、User Skill 或其他注册能力。

## 4. Testing 结构化资产

本轮补齐并审计了：

- Test Case Schema
- Test Case Audit Schema
- Test Execution Schema
- Issue Schema
- Retest Schema
- Regression Schema
- Test Report Schema
- Testing Phase Output Schema

其中 Retest / Regression 原本只有流程定义而缺少独立结构化 Schema，经本轮资产审计发现并补齐。

Test Execution 同步增加 Phase / Task / Step / Conversation、Capability Requirement、Provider Selection、Human Intervention、Rework 等追踪信息。

## 5. 项目数据资产完善

Testing 的结果不再只是一个“PASS / FAIL”或一份报告，而是形成完整 Project Data Assets：

```text
Project
 ↓
Phase
 ↓
Task
 ↓
Conversation
 ↓
Step
 ↓
Capability Requirement
 ↓
Provider Selection
 ↓
Tool / MCP / Skill / Capability / Model Run
 ↓
Execution Record
 ↓
Quality / Issue / Evidence / Consumption
```

需要持续记录的指标包括：

- 工作量；
- Task / Step / Execution 数量；
- 自动化 / 人工执行比例；
- 人工介入；
- 重试 / 返工；
- 测试用例数量与覆盖率；
- 问题数量、严重度、优先级；
- 已解决 / 未解决 / Deferred / Blocked / Reopened；
- 问题解决时长；
- Retest / Regression 结果；
- Token；
- Cost；
- Latency；
- Tool / MCP / Skill / Capability / Model 使用；
- Audit 结果与升级情况。

Execution Record 与 Business Output Artifact 必须保持分离，通过 ID 建立关联。

## 6. Testing 资产审计结论

Testing Asset Audit 发现两个完整性问题：

1. Retest / Regression 缺少独立 Schema；
2. Test Execution 的追踪维度不足。

两个问题均已修复，并重新形成完整资产集合：

```text
Testing Asset Audit
 ↓
Conditional PASS
 ↓
Remediation
 ↓
Recheck
 ↓
Remediated / Freeze
```

因此当前 Testing 资产结构可以冻结。后续新增 Testing 能力必须同步检查 Agent MD、Capability Registry、Schema、Audit Criteria、Execution Record、Knowledge Base 和 Retrospective。

## 7. Requirement / Product 既有结论继续有效

人工需求可以并行关联 Competitor Analysis 与 Data Analysis 任务；自动化能力任务可以使用独立 Conversation。

已有有效分析结果优先复用；需要新增能力时，Product 应提示用户可用能力并允许选择。

Competitor / Data Recommendation 不自动等同于 Product Decision。需求阶段最终必须形成一个权威、版本化 PRD Artifact，并将分析、证据、决策和输入关联到 PRD。

## 8. 统一架构

```text
AI Native
│
├── Process Agents
│   └── Product / Design / Planning / Coding / Testing / ...
│
├── Capability Agents
│   ├── Competitor Analysis
│   ├── Data Analysis
│   ├── Test Case Generation
│   ├── Test Execution
│   ├── Testing Issue Management
│   └── Testing Reporting
│
└── Common Runtime
    ├── Task / Conversation Manager
    ├── Capability Router
    ├── Tool / MCP / Skill Selection
    ├── Model Router
    ├── Execution Record Store
    ├── Output Artifact Store
    ├── Token & Cost Ledger
    ├── Quality Gate
    ├── Independent Audit
    ├── Knowledge Manager
    └── Audit Logger
```

## 9. 长期原则

1. Process Agent owns stage execution; Capability Agent owns specialist capability.
2. Phase 与 Process Agent 保持统一 Input / Execution / Output / Gate Contract。
3. 一个 Phase 可以包含多个并行 Task 与 Conversation。
4. Existing valid Artifact 优先复用。
5. User-configured MCP 属于 Common Capability Pool。
6. Tool First 优先用于确定性任务。
7. 先判断 Capability Requirement，再进行 Provider Selection。
8. Execution Record 与 Output Artifact 必须分离。
9. 项目工作量、问题、质量、Token、Cost 等都是项目数据资产。
10. Audit 是默认结构化评审能力，人工评审是异常升级路径。
11. Audit 必须独立，不能由生产者自我认证。
12. Requirement Task 必须收敛到一个权威 PRD Artifact。
13. Recommendation 不等于 Decision。
14. 每个阶段的 Output 是下阶段正式 Input。
15. Contract 变化必须同步检查相关 Agent、Capability、Schema、Audit、Knowledge Base 和 Retrospective。

## 10. 本轮冻结与后续范围

### 已冻结

- Agent 两大分类：Process / Capability；
- Unified Agent Contract；
- Audit 替代默认人工评审的结构能力；
- Common Capability Pool；
- Execution Record 与 Project Data Assets；
- Testing 完整生命周期与结构化资产；
- Testing Asset Audit → Remediated → Freeze。

### 暂不冻结

**Dynamic Model Routing** 仍作为独立设计议题，不在本轮确定最终算法、路由策略或模型选择公式。

## 11. 后续审计范围

后续整体架构审计至少覆盖：

- Unified AGENT MD Contract
- Phase Contract
- Execution Record Contract
- Capability Registry
- Conversation Orchestration
- Product Agent
- Design Agent
- Technical Solution Agent
- Coding Agent
- Testing Agent
- Competitor Analysis Agent
- Data Analysis Agent
- Audit Agent
- Agent Classification
- Knowledge Base
- Retrospective synchronization

任何阶段资产更新后，必须检查上述关联资产是否同步。
