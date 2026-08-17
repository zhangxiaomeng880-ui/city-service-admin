# AGENT MD 全量核对记录 — 2026-08-17

## 1. 审计目的

本次核对针对当前项目全部 Stage Agent MD，检查：

- Input 是否完整
- Input Readiness / Verification 是否明确
- Execution 是否完整且职责边界清晰
- Output 是否完整
- Output Verification 是否明确
- Gate / Handoff 是否闭环
- Environment / Version Dependency 是否明确
- Status / Resume Rule 是否明确
- 上下游 Input → Output 是否可追溯
- 是否存在阶段职责重叠、遗漏或编号/生命周期歧义

本次**不检查 Coding 具体代码实现质量**，只检查 Coding Agent 的流程契约与文档完整性。

## 2. 审计基准

以以下资产作为核对基准：

- `00_AGENT_REGISTRY.md`
- `00_PROJECT_MANIFEST.md`
- `04_HANDOFF_AND_AUTOMATION.md` V1.2
- `07_VERSION_MANIFEST.md`
- 各 Stage Agent MD
- 当前 `AI_NATIVE_PROJECT_OS_V1.0.md`

全局 Agent Contract 已明确要求每个 Agent 必须声明：Purpose、Version、Input、Input Readiness、Verification、Execution、Output、Output Verification、Gate、Handoff、Environment Dependency、Version Dependency、Status、Resume Rule。

## 3. 全量核对结果

| Agent | 当前完整度 | 主要结论 |
|---|---|---|
| Project Initialization | PARTIAL | 核心职责完整；但当前项目 Environment Gate 仍为 PARTIAL，不能把项目初始化视为 COMPLETED |
| Product | PARTIAL | Input / Execution / Output / Gate / Handoff 基本完整；缺少统一合同要求的显式 Input Readiness、Output Verification、Environment Dependency、Version Dependency、Status、Resume Rule |
| Feasibility | PARTIAL | 条件阶段定义完整，SKIPPED 规则明确；缺少统一合同字段的显式声明 |
| Design | PARTIAL | 设计职责、组件规范、Token、状态、响应式、Figma、Acceptance Matrix 已覆盖；缺少统一合同字段的显式声明 |
| Engineering / Coding | PARTIAL | 实现链路完整；已明确 Product + Design 不得被下游重新定义；但当前 Required Input 中未显式列出 Design 输出中的组件规范、Design System / Token、页面→组件映射作为独立输入；另外 Preview 属于 Engineering 后续必经产物，但当前独立 Build/Deploy/Preview Agent 缺失 |
| Build / Deploy / Preview | GAP | 生命周期中存在独立 Stage，但 Agent Registry 未提供独立 Agent MD；当前只能由 Engineering Agent 的执行步骤覆盖，职责与阶段契约不完全一致 |
| Acceptance | PARTIAL | 独立 Agent 已存在，Input / Execution / Output / Gate / Handoff 清晰；缺少统一合同字段的显式声明 |
| QA | PARTIAL | 测试、问题、Retest、Gate、Handoff 完整；缺少统一合同字段的显式声明 |
| Release | PARTIAL | 发布前检查、Human Gate、发布、Post-Release、Knowledge/Evolution Update 已覆盖；缺少统一合同字段的显式声明 |
| Data / Experiment | GAP/CONDITIONAL | 当前项目按规则 SKIPPED，但 Agent Registry 仅登记为 Data / Experiment 条件节点，当前 Agent MD 未在本轮检索到；属于条件能力，不阻塞当前项目，但标准流程仍需保留定义或明确其独立 Agent 来源 |
| Review | PARTIAL | 复盘、返工、阻塞、决策影响、流程改进、Backlog、Agent/Workflow Change 已覆盖；缺少统一合同字段的显式声明 |
| Knowledge Update | PARTIAL | 已覆盖知识沉淀、复用模式、变更规则、Agent 改进提案及版本变更；缺少统一合同字段的显式声明 |

## 4. 已确认且本轮必须固化的职责边界

### Design 负责组件规范

组件规范属于 Design 输出，不属于 Coding 的规范创建职责。Design 应产出：

- 组件定义
- 组件状态 / Variants
- Token / Design System
- 页面 → 组件映射
- 交互及状态规范
- Figma 定位

Coding 只消费并实现这些规范，不重新定义组件。

### Coding 负责实现，不重新定义上游

Coding 必须消费 Product、Design 及 Design 输出的组件规范；发现 Product / Design 缺失或冲突时记录 Gap，不自行改变上游定义。

### 项目环境属于 Project Initialization

Repository、Branch、权限、运行时、Build、Deploy、Preview 路径、项目版本等基础环境在 Project Initialization 阶段确认。后续阶段只核验自身依赖是否仍与 Manifest 一致；环境变化时触发 Change Impact / Environment Re-verification，不重复初始化。

## 5. 本轮发现的结构性问题

### P0 — 阶段生命周期与本轮口头阶段列表存在差异

当前源知识库 / Project Manifest 的标准生命周期仍包含：

Project Initialization → Feasibility（条件）→ Product → Design → Engineering/Coding → Build/Deploy/Preview → Acceptance → QA → Release → Data/Experiment（条件）→ Review → Knowledge Update。

本轮讨论中为便于确认曾将后半段简化为 Coding → Review/QA → Release，容易导致 Preview、Acceptance、Knowledge Update 被误认为可以合并或删除。

**处理原则：本轮不擅自删除源知识库中的标准节点。标准生命周期继续以当前源知识库和 Handoff Contract 为准；如需合并/改名，应单独形成 Decision 并人工确认。**

### P1 — Agent MD 统一结构没有完全落实

Agent Registry 已定义统一合同，但各 Agent MD 实际字段仍不完全一致。后续应统一为：

Purpose / Mission → Version → Input → Input Readiness → Input Verification → Execution → Output → Output Verification → Gate → Handoff → Environment Dependency → Version Dependency → Status → Resume Rule。

### P1 — Build / Deploy / Preview 缺少独立 Agent MD

该阶段在生命周期中是独立 Stage，但当前主要由 Engineering Agent 内部步骤覆盖。若希望流程真正可执行、可审计、可复用，应补充独立 Stage Agent，避免阶段存在但没有独立执行契约。

### P1 — Coding 输入需要显式引用 Design 组件资产

Coding Agent 当前已声明不得替换 Design 已确定的视觉、组件、交互，但 Required Input 未将组件规范、Token、页面→组件映射作为独立字段。应补齐文档契约，而不是让 Coding 自行推断。

## 6. 本轮流程确认后的标准阶段关系

在不修改当前源生命周期的前提下，阶段依赖应理解为：

Project Initialization
→ Product
→ Feasibility（条件）
→ Design
→ Engineering/Coding
→ Build/Deploy/Preview
→ Acceptance
→ QA
→ Release
→ Data/Experiment（条件）
→ Review
→ Knowledge Update

其中：

- Product 定义业务边界和验收基础
- Design 定义页面、交互、视觉、组件及设计规范
- Coding 实现已确认的 Product + Design
- Preview 提供可验证版本
- Acceptance 验证产品/设计验收标准
- QA 验证功能、交互、视觉、适配和问题闭环
- Release 完成正式发布与发布后验证
- Review 复盘真实执行和流程质量
- Knowledge Update 将已验证结论沉淀并反哺下一轮

## 7. DoD 核对结论

当前全局 DoD 已定义为：

Input 完整 + Gate 通过 + 必需产出生成 + Output Verification + 地址/版本可追溯 + Handoff 完整 → 才允许 Stage COMPLETED。

因此，“已经执行过”不能直接等同于“Stage COMPLETED”。PARTIAL / BLOCKED / SKIPPED 必须保留其状态、依据、影响和 Resume Point。

## 8. 本轮复盘

本轮最重要的发现不是增加更多 Agent，而是确认 **Agent MD 本身必须成为可执行合同，而不能只是阶段说明文档**。

本轮形成的关键改进：

1. 用统一 Input → Readiness → Verification → Execution → Output → Verification → Gate → Handoff 检查每个 Agent。
2. 将 Design 的组件规范职责与 Coding 的实现职责明确分离。
3. 将 Project Initialization 的环境/分支/版本职责与 Coding 实现职责明确分离。
4. 不因为当前项目暂时跳过某个节点，就从标准生命周期删除该节点。
5. 用阶段间 Handoff 检查上下游资产血缘，而不是只检查单个 MD 是否“看起来完整”。
6. Review 与 Knowledge Update 必须成为真正的闭环，而不是项目结束后的附加文档。
7. 复盘结果必须能够回写 Agent / Workflow / Knowledge，并形成下一轮执行输入。

## 9. 建议的后续修复顺序

1. 统一全部 Agent MD 的标准合同字段。
2. 补充独立 Build / Deploy / Preview Agent MD。
3. 在 Coding Agent Required Input 中显式加入 Design 组件规范、Token、页面→组件映射。
4. 对 Acceptance / QA / Release / Review / Knowledge Update 做上下游血缘检查。
5. 修正 Agent 文件编号歧义，但保留历史文件，不直接删除。
6. 修复后重新执行一次 Agent Workflow Audit。

## 10. 本记录状态

- Audit：COMPLETED
- Code Implementation Review：SKIPPED（按本轮约定）
- Knowledge Update：本记录作为本轮 Knowledge Update 的 Evidence / Evolution Input
- 下一步：按上述修复顺序更新 Agent MD，再执行复核
