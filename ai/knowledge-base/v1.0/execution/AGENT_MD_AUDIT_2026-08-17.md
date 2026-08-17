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
- 是否存在阶段职责重叠、遗漏或生命周期歧义
- **阶段如何启动、Input 如何提示、Execution 如何进入、Output 如何验证**

本次不检查 Coding 具体代码实现质量，只检查 Coding Agent 的流程契约与文档完整性。

## 2. 审计基准

- Agent Registry
- Project Manifest
- Handoff / Automation Contract
- Version / Environment Manifest
- 各 Stage Agent MD
- AI Native Project OS
- `AGENT_STAGE_LIFECYCLE_RULES_V1.1.md`
- `AGENT_STAGE_INTERACTION_PROTOCOL_V1.0.md`

## 3. 全量核对结果

| Agent | 当前完整度 | 主要结论 |
|---|---|---|
| Project Initialization | PARTIAL | 核心职责完整；当前 Environment Gate 仍需按项目状态判定 |
| Product | PARTIAL | 核心 Input / Execution / Output / Gate / Handoff 完整；统一 Contract 结构仍需持续统一 |
| Feasibility | PARTIAL | 条件阶段定义完整，SKIPPED 规则明确；统一 Contract 仍需持续统一 |
| Design | PARTIAL | 页面、交互、视觉、组件规范、Token、状态、Figma 等已覆盖；需统一交互协议 |
| Engineering / Coding | PARTIAL | 实现链路完整；需显式消费 Design 组件资产并统一交互协议 |
| Build / Deploy / Preview | COMPLETED | 已补独立 Agent MD，并纳入统一 Stage Contract |
| Acceptance | PARTIAL | 独立 Agent 已存在；需统一交互协议和 Contract 字段 |
| QA | PARTIAL | 测试、Issue、Retest、Gate、Handoff 完整；需统一交互协议 |
| Release | PARTIAL | 发布、Human Gate、Post-Release 已覆盖；需统一交互协议 |
| Data / Experiment | CONDITIONAL | 已补独立 Agent；本项目不适用时必须 SKIPPED，不删除 Agent |
| Review | PARTIAL | 已补独立 Contract，并纳入复盘与流程改进闭环 |
| Knowledge Update | PARTIAL | 已补独立 Contract，并纳入知识沉淀闭环 |

## 4. 本轮确认的职责边界

### Design 负责组件规范
组件定义、Variants、Token / Design System、页面→组件映射、交互及状态规范、Figma 均属于 Design 输出。

### Coding 负责实现
Coding 消费 Product + Design + 组件规范，不重新定义 Product / Design。

### Project Initialization 负责环境
Repository、Branch、权限、Runtime、Build / Deploy / Preview 环境、项目版本由 Project Initialization 建立基线；后续阶段只验证依赖。

### Conditional Agent 永久存在
Feasibility / Data / Experiment 等条件能力仍必须有 Agent MD。本项目不适用时使用 `SKIPPED` 并记录判断依据、影响和 Re-entry 条件。

## 5. 阶段交互协议已补齐

新增统一协议：

`workflows/AGENT_STAGE_INTERACTION_PROTOCOL_V1.0.md`

标准操作：

- `启动 [Stage]`：自动读取 Contract、Project Context、上游 Output / Handoff、Knowledge，并执行 Input Readiness / Verification / Gate；通过后自动进入 Execution。
- `继续 [Stage]`：读取 Resume Point 并恢复。
- `检查 [Stage]`：只审计，不执行。
- `复盘 [Stage]`：只复盘，不重新执行。
- `全量执行项目`：按生命周期、Gate 和条件节点自动推进。
- `检查全部 Agent MD`：全量 Contract 审计。
- `更新 Knowledge`：执行知识沉淀。

### Input 提示

Agent 应输出 Required Input、已满足项、Warning、Missing / Fail、Input Gate。用户无需重复提供系统已有输入。

### Execution 提示

Input Gate = PASS 后自动执行；PASS WITH WARNING 且非 blocker 时自动执行。Execution 开始前展示执行计划，并记录 Decision / Gap / Evidence / Deviation / Asset。

### Output 提示

Execution 完成后必须 Output Verification → Gate → Handoff，不能只宣布完成。

### 用户介入

只有 Required Input 缺失、无法自动解决的冲突、Human Gate、高风险不可逆操作或明确人工决策才暂停。

## 6. DoD

Stage 只有在以下条件全部满足后才能 COMPLETED：

Input Ready + Input Verification + Execution Complete + Output Generated + Output Verification + Gate Passed + Handoff Complete。

## 7. 本轮复盘

本轮的关键不是增加 Prompt，而是把“启动一个 Agent”定义为一套可执行协议：

**用户发起阶段意图 → Agent 自动读取规则与上下文 → Input 检查 → Gate → Execution → Output Verification → Handoff → 状态更新。**

这避免用户重复提供已有信息，也避免 Agent 在没有输入验证的情况下直接执行。

同时确认：

1. Agent 是能力资产，Stage 是项目执行实例。
2. SKIPPED 不等于 Agent 不存在。
3. Stage MD 保存执行事实，Knowledge Base 保存经过验证的可复用规则。
4. Human Intervention 应是例外，不应成为每一步的默认确认机制。
5. 关键状态必须可追溯，不能用“做过了”替代 Gate / Verification。

## 8. 当前状态

- Full Agent MD Audit：COMPLETED
- Stage Interaction Protocol：COMPLETED
- Conditional Agent Rule：COMPLETED
- Knowledge / Evolution Update：COMPLETED
- Coding Implementation Review：SKIPPED（按本轮约定）
- 下一步：统一现有全部 Agent MD 的 Contract 字段，并重新执行全量 Audit。
