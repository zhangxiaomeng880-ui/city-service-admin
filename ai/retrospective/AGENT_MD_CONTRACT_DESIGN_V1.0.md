# AGENT MD Contract 设计过程沉淀 V1.0

## 1. 背景

此前各 Agent 已分别定义 Input、Execution、Model、Output 等内容，但容易出现每个 Agent 自己形成一套执行套路的问题。

本次讨论确认：专业 Agent 的能力可以不同，但 Agent 的执行机制必须统一。

## 2. 核心判断

> Agent MD 描述“这个 Agent 做什么”；统一 AGENT MD Contract 描述“所有 Agent 必须怎么做”。

因此 Contract 应成为所有 Agent MD 的上层约束。

## 3. 为什么必须统一

### 3.1 避免 Agent 套路分裂

如果 Product、Design、Competitor、Data 各自定义 Input / Output / Execution，长期会导致：

- 输入标准不一致；
- 用户询问方式不一致；
- Task 与 Conversation 边界不一致；
- 模型选择不可比较；
- Token / Cost 无法统一统计；
- Audit 无法形成统一标准。

### 3.2 支持多任务并行

Product 阶段可能同时存在：

- 人工需求 Task；
- 每周竞品 Task；
- 每周 KPI 数据分析 Task。

这些 Task 应独立 Conversation、独立状态、独立成本记录，并通过结构化结果汇聚。

### 3.3 支持能力复用

Competitor Analysis 与 Data Analysis 属于 Capability Agent，而不是 Product Agent 的子功能。

Product Agent 应通过 Capability Detection 判断是否需要能力，并在人工需求场景向用户提示可选能力；已有有效结果优先复用。

## 4. 本次确定的统一执行链路

```text
Task
 ↓
Input Validation
 ↓
Context Assembly
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Tool / Model Selection
 ↓
Execution
 ↓
Quality Gate
 ↓
Structured Output
 ↓
Human-Readable Output
 ↓
Handoff
 ↓
Knowledge / Audit Evidence
```

## 5. 本次确定的关键通用能力

### Capability Router

识别是否存在可复用专业能力。

### Tool Router

判断确定性工作是否应由工具完成。

### Model Router

属于 Common Agent Runtime 的通用能力。本次只确定 Contract，不锁定具体动态路由算法，后续单独设计。

### Quality Gate

统一判断输入、执行、输出、证据和 Handoff 质量。

### Token & Cost Ledger

记录到 Task / Step / Model Run，形成模型选择和成本优化的证据。

### Audit

独立检查 Agent 是否遵守 Contract，并检查证据、成本和结果可追溯性。

## 6. 人工需求的特殊规则

人工进入 Product 时，不意味着自动执行所有能力。

正确方式：

```text
Human Requirement
 ↓
Product Agent
 ↓
Capability Detection
 ↓
Existing Valid Result?
 ├─ Yes → Offer Reuse
 └─ No → Recommend Relevant Capability
          ↓
       User Choice
          ├─ Competitor
          ├─ Data
          ├─ Competitor + Data
          └─ Skip
```

该设计兼顾分析完整性、用户决策权和 Token / Cost 控制。

## 7. 审计原则

统一 Contract 完成后，Audit Agent 不再针对每个 Agent 自己发明检查标准，而是依据 Contract 逐项审计。

重点检查：

- Agent 分类；
- 职责边界；
- Input；
- Input Validation；
- Context；
- Capability；
- Tool / Model；
- Execution；
- Human-in-the-Loop；
- Output；
- Evidence；
- Quality Gate；
- Handoff；
- State；
- Parallel Task；
- Reuse；
- Token / Cost；
- Knowledge Handoff。

只有 `AUDIT_PASS` 才允许正式接受。

## 8. 动态模型路由边界

本次明确：动态模型路由是 Common Agent Runtime 的通用能力，不属于 Competitor Analysis 或 Data Analysis Agent 私有能力。

但本轮只定义统一 Contract 对 Model Selection 的要求，不提前锁定动态模型路由算法。

后续将单独设计：

- 候选模型池；
- 任务复杂度识别；
- 质量阈值；
- 成本计算；
- 路由策略；
- 升级策略；
- 模型表现反馈；
- 成本 / 质量优化。

## 9. 沉淀结论

本轮最终形成：

1. 两大 Agent 分类：Process / Capability；
2. 统一 AGENT MD Contract；
3. Product 多 Task / 多 Conversation 模型；
4. Capability Detection 与用户选择机制；
5. Tool First 原则；
6. Model Selection 统一记录机制；
7. Quality Gate；
8. Token / Cost Ledger；
9. 独立 Audit；
10. 动态模型路由单独专项设计。
