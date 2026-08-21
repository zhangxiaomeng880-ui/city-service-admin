# AI Native Project OS V3.0 启动计划书

## 1. 版本定位

V3.0 是 AI Native Project OS 从 **能力标准化（V2.0）进入产品化与规模化验证** 的 0→1 阶段。

V1.0 以真实项目为载体，验证完整 AI Native 项目流程；V2.0 从项目流程中抽象出通用 PASS 能力体系，使资源、能力、Agent、Model、Tool、MCP、Skill、Routing、Audit、Trace 等具备标准化、可调用、可执行和可复用能力；V3.0 则将这些已经 PASS 的能力封装为 SaaS 产品主干，并通过 Project Type Configuration 验证跨场景复用和商业化可行性。

核心演进：

`V1.0 项目流程验证 → V2.0 能力 PASS → V3.0 产品 PASS / 商业化验证`

## 2. V3.0 核心目标

### 2.1 SaaS 主干平台

建立最小可用的 SaaS 平台主干，不以一次性完成所有管理后台能力为目标，而优先跑通：

`User / Organization → Project → Project Type → Phase → Capability → Agent / Runtime → Routing → Execution → Audit → Report`

平台应复用 V2.0 已有底层能力，不重新建立一套与 PASS 能力脱节的系统。

### 2.2 Project Type Configuration

将项目流程从固定流程升级为可配置流程。

`Project Type → Phase Configuration → Capability Binding → Agent / Model / Tool / MCP Binding → Execution`

Project Type 决定项目需要哪些阶段、能力和治理规则；阶段可以动态裁剪、组合和复用。

目标不是为每个行业开发独立系统，而是通过配置创建不同类型的项目。

### 2.3 能力复用

V2.0 已定义的能力应成为 V3.0 的公共能力底座，包括：

- Resource
- Requirement
- Design
- Technical Solution
- Code
- Test
- Audit
- Report
- Model
- Tool
- MCP
- Skill
- Agent
- Routing
- Trace / Data

新增场景优先通过配置和已有能力组合完成，避免重复开发底层能力。

### 2.4 用户反馈体系

V3.0 在系统执行数据之外增加 User Feedback Layer，形成：

`使用 → 反馈 → 分析 → 能力优化 → 再使用`

反馈范围包括：

- 使用体验
- 执行体验
- 结果满意度
- 质量问题
- 成本问题
- 能力缺口
- 新需求

反馈数据应与 Project、Execution、Capability、Report 和 Data Asset 建立关联，支持后续产品和能力迭代。

### 2.5 标准计费与商业化能力

V3.0 不将计费简单定义为 Token 计费，而是建立项目综合投入成本模型。

项目综合成本至少考虑：

- 人员投入成本
- Model Token / Model Call 成本
- Agent / Execution 成本
- Tool / MCP 成本
- 基础设施成本
- 其他项目相关成本

形成：

`Project Investment → Total Cost → Unit Cost → Pricing → Margin → Commercial Model`

最终支持项目制、阶段制、执行量制、订阅制等不同商业模型的验证，但 0→1 阶段优先完成统一成本核算和基础计费能力，不追求一次性完成全部商业模式。

## 3. 0→1 实施原则

### 原则一：先主干，后丰富

优先跑通核心项目生命周期，再逐步丰富用户反馈、计费、运营和高级管理能力。

### 原则二：能力复用优先

新场景不得默认复制一套 Agent / Workflow / Resource / Runtime；应首先检查 V2.0 能力池和 Project Type 配置是否可以直接复用。

### 原则三：配置优先于开发

如果新项目类型可以通过 Phase、Capability、Agent、Model、Tool、MCP、Audit 和数据规则配置完成，则不新增专用代码。

### 原则四：真实投入数据驱动商业化

计费模型必须建立在真实人员投入、Token、工具、执行和基础设施数据之上，不以单一 Token 指标代表项目真实成本。

### 原则五：所有执行继续可追踪

V2.0 已建立的 Execution Trace、Routing Trace、Audit、Issue、Report、Cost 和 Data Asset 机制继续沿用，V3.0 不允许产品化后丢失过程数据。

## 4. 首批场景

### 4.1 AIGC

作为通用 AI 场景，验证内容生成、Prompt / Workflow、Generation、Evaluation、Audit 和 Release 等能力是否可以通过 Project Type 配置完成。

### 4.2 AI + 医疗

作为强流程、强治理场景，重点验证 Requirement、Technical Review、Testing、Audit、Compliance 和项目资源追踪等能力的复用与裁剪。

### 4.3 AI + 跨境电商

作为业务复杂、数据和运营并重场景，验证 Business Analysis、Design、Development、Data / Model、Experiment、Testing 和 Release 等能力组合。

以上场景是能力复用的验证场景，不应在架构层形成三套独立系统。

## 5. Project Type 标准模型

每个 Project Type 至少配置：

- Project Type ID / Name
- Applicable Scenario
- Phase List
- Phase Order
- Phase Dependencies
- Capability Binding
- Agent Binding
- Model / Model Pool
- Tool / MCP / Skill
- Routing Policy
- Audit / Validation Rules
- Resource Templates
- Report Templates
- Data Tracking Rules
- Cost Rules
- Permission Rules

Project Type 创建后，可生成标准项目模板；项目创建时根据类型动态裁剪阶段和能力。

## 6. V3.0 主干流程

`User → Organization / Workspace → Project → Project Type → Template → Asset Reuse → Phase Plan → Capability Binding → Agent / Runtime → Routing → Execution → Validation / Audit → Report → Feedback → Data / Cost`

项目创建继续遵循 V2.0 的：

- Template-first
- Reuse-first
- Asset Tree
- Planning / Confidence

已有 Project、Iteration、Requirement、Design、Technical Solution、Code、Test Case、Audit、Report、Knowledge 等资源优先通过 Reference / Clone / Fork 复用。

## 7. 计费能力建设路径

### 7.1 成本采集

记录项目级、阶段级和执行级投入：

`People + Model + Token + Tool / MCP + Infrastructure + Execution`

### 7.2 成本核算

形成：

- Project Total Cost
- Phase Cost
- Execution Cost
- AI Cost
- Human Cost
- Unit Task Cost

### 7.3 商业模型验证

基于真实成本形成：

`Cost → Price → Gross Margin → Commercial Model`

V3.0 先建立统一成本和计费基础，不提前锁死最终商业价格体系。

## 8. 用户反馈体系建设路径

建立统一 Feedback Contract：

- feedback_id
- user_id
- project_id
- resource_id / execution_id
- feedback_type
- rating / sentiment when applicable
- issue / suggestion
- impact
- status
- resolution
- trace_id

反馈必须能够回流到 Capability、Project Type、Agent、Model、Routing 和 Product Planning。

## 9. V3.0 成功标准

V3.0 0→1 阶段至少验证：

1. SaaS 主干可以运行一个完整项目。
2. 一个 Project Type 可以通过配置生成对应阶段。
3. 阶段可以动态裁剪，不需要为每种场景重新开发完整流程。
4. AIGC、AI + 医疗、AI + 跨境电商至少能够验证公共能力复用路径。
5. 已有资源能够通过 Asset Tree 发现并 Reference / Clone / Fork。
6. 用户反馈能够进入数据闭环。
7. 项目人员投入 + AI / Tool 等机器成本可以形成统一成本记录。
8. 基于真实项目投入可以计算项目综合成本并支持基础计费。
9. V2.0 API / SDK / Command 能力可以继续作为 V3.0 的执行底座。
10. 全链路 Execution / Audit / Routing / Cost / Feedback 数据可追踪、可查询、可归档。

## 10. 核心观察指标

V3.0 重点关注：

| 指标 | 目的 |
|---|---|
| 能力复用率 | 衡量公共能力复用程度 |
| Phase 复用率 | 衡量阶段标准化程度 |
| 新 Project Type 配置成本 | 衡量配置化效率 |
| 新场景接入周期 | 衡量产品扩展能力 |
| 新场景新增代码量 | 验证配置优先原则 |
| Agent / Model / Tool / MCP 复用率 | 衡量 Runtime 能力复用 |
| 自动化执行率 | 衡量 AI Native 自动化程度 |
| Execution Success Rate | 衡量执行可靠性 |
| User Feedback Resolution | 衡量反馈闭环效率 |
| Project Total Cost | 建立商业化成本基线 |
| Cost / Project | 衡量单位项目成本 |
| Cost / Execution | 衡量单位执行成本 |
| Gross Margin Potential | 验证商业模型可行性 |

特别关注：

> **New Scenario Low-Code / Zero-Code Rate**

即新增场景有多少比例可以通过 Project Type Configuration 和既有能力组合完成，而不需要重新开发底层能力。

## 11. 与 V2.0 的边界

V2.0 负责：

- 能力标准化
- Resource Contract
- Capability Contract
- Agent
- Model Pool
- Tool / MCP / Skill
- Routing
- Trigger / Command
- Audit / Validation
- Trace / Data
- API / SDK 基础契约

V3.0 负责：

- SaaS 产品化
- Project Type Configuration
- Phase 动态裁剪
- 能力规模化复用
- 场景验证
- User Feedback
- Cost / Billing
- Commercial Model Validation

V3.0 不重新定义 V2.0 已 PASS 的基础能力。

## 12. 后续演进

V3.0 0→1 完成后，再根据真实用户和项目数据进入：

`产品完善 → 场景扩展 → 高级运营 → 标准商业化 → SaaS Scale`

最终目标是形成：

`One Capability Foundation → Multiple Project Types → Multiple Industry Scenarios → Shared API / SDK / Agent / Model / Tool / MCP`

## 13. 版本结论

**AI Native Project OS V3.0：启动。**

V3.0 的核心任务不是证明“能不能再做一个项目”，而是验证：

> **V2.0 已标准化的 AI Native 能力，能否真正产品化为 SaaS，并通过 Project Type Configuration 在不同场景中低成本复用，同时建立用户反馈和真实投入成本驱动的商业化基础。**

V3.0 采用 0→1 策略：**先完成主干、再丰富反馈与计费、最后基于真实数据验证规模化和商业化。**
