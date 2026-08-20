# AI Native 流程复盘 V1.3

## 1. 复盘范围

本次复盘聚焦 Agent 架构、Product 多任务线、竞品与数据分析专业能力、动态模型路由、Token / Cost 记录，以及知识沉淀机制。

## 2. 本轮确认的关键问题

### 2.1 Agent 分类边界需要重新明确

**问题：** 原有体系容易把数据分析、竞品分析等专业能力放进 Product 或其他流程阶段，导致 Agent 职责边界不清、能力难复用。

**结论：** Agent 正式分为两大类：

- 流程类 Agent：负责生命周期阶段执行、阶段决策、Gate 和 Handoff。
- 能力类 Agent：负责跨阶段复用的专业能力。

当前能力类 Agent 首批正式定义为 Competitor Analysis Agent 和 Data Analysis Agent。

### 2.2 一个阶段不能等于一个 Conversation

**问题：** Product 同时存在人工需求、竞品周报和 KPI 周报等任务线，如果共用一个 Conversation，会导致上下文污染、任务互相阻塞和成本不可控。

**改进：** 采用 `Phase → Task → Conversation` 模型。不同 Task 拥有独立 Conversation，可并行执行，通过 Project Context、Knowledge Base 和 Structured Output 汇聚结果。

### 2.3 Product 需要调用专业能力，但不应拥有专业能力

**问题：** 人工需求可能需要竞品和数据分析支持，但强制每次执行会增加成本。

**改进：** Capability Router 识别可增强结果的能力；已有有效结果优先关联，没有有效结果时向用户推荐直接调用。用户可选择竞品分析、数据分析、组合调用或跳过。

### 2.4 周期任务必须是独立任务

**问题：** 仅定义“每周竞品周报”和“每周 KPI 周报”不足以形成可靠的执行闭环。

**改进：** Scheduler 每周分别创建独立 Task 和 Conversation。任务记录输入、执行状态、输出资产、异常和知识更新；数据不足时进入 `WAITING_FOR_INPUT`，而不是错误结束。

### 2.5 模型选择不能写死在阶段 Agent 中

**问题：** 如果每个 Agent 自己指定固定模型，无法根据任务复杂度和真实成本进行优化。

**改进：** Model Router 作为 Common Agent Runtime 的全局能力。以“满足质量门槛的最低成本”为目标，结合任务复杂度、能力要求、历史模型表现和成本进行动态选择。

### 2.6 Token 数据必须下沉到 Model Run

**问题：** 只统计一个 Task 的总 Token，无法判断具体步骤、模型和重试造成的成本。

**改进：** 统一记录 `Task → Step → Model Run`，包括输入/输出 Token、Cache Token、Total Token、Cost、耗时、Retry、Escalation、Quality Gate 和模型选择理由。

### 2.7 Data Analysis 必须 Tool First

**问题：** 如果让 LLM 承担确定性数据计算，会造成不必要 Token 消耗，并降低可验证性。

**改进：** SQL、Python、Analytics Tool 优先完成确定性计算；LLM 主要负责解释、诊断和优化建议。

## 3. 本轮形成的标准架构

```text
AI Native
│
├── Common Agent Runtime
│   ├── Task Manager
│   ├── Conversation Manager
│   ├── Capability Router
│   ├── Model Router
│   ├── Tool Router
│   ├── Quality Gate
│   ├── Token & Cost Ledger
│   ├── Model Performance Registry
│   ├── Knowledge Manager
│   └── Audit Logger
│
├── Process Agents
│   ├── Project
│   ├── Product
│   ├── Design
│   ├── Planning
│   ├── Coding
│   ├── Testing
│   ├── Compliance
│   ├── Audit
│   ├── Release / Deploy
│   └── Maintenance
│
└── Capability Agents
    ├── Competitor Analysis
    └── Data Analysis
```

## 4. 模型与成本闭环

统一闭环：

```text
Task
 ↓
Capability Identification
 ↓
Model Router
 ↓
Lowest-Cost Feasible Model
 ↓
Execution
 ↓
Quality Gate
 ├─ PASS → Complete
 └─ FAIL → Model Escalation
 ↓
Token / Cost / Quality Recording
 ↓
Model Performance Registry
 ↓
Future Routing Optimization
```

优化目标不是最低 Token，而是：

> **Quality-Constrained Minimum Cost。**

## 5. 本轮沉淀的长期原则

1. 流程类 Agent 与能力类 Agent 必须保持架构边界。
2. 一个 Phase 可以存在多个并行 Task 和 Conversation。
3. 能力应可独立运行，也应可被流程 Agent 按需调用。
4. 已有有效结果优先复用，避免重复执行。
5. 动态模型路由属于全局通用能力。
6. 每次 Model Run 必须保留成本和质量证据。
7. Tool First 优先于 LLM 完成确定性计算。
8. Quality Gate 是模型升级和任务完成判断的依据。
9. Agent 的分析结果与产品实施决策保持边界。
10. 重大架构变化必须同步 Agent MD、Knowledge Base、Retrospective 和索引文档。

## 6. 下一轮复盘关注项

- Capability Router 推荐准确率
- 已有结果复用率
- 重复 Task / 重复分析率
- 多 Task 并行成功率
- Model Router 选择准确率
- Quality-Constrained Cost
- Model Escalation 率
- Tool First 命中率
- Token / Cost 记录完整率
- 周期任务成功率
- 周期任务等待输入时间
- 竞品报告有效信息率
- KPI 分析结论验证率

## 7. 复盘同步规则

重大架构升级后必须同步：

1. Agent MD
2. Stage Contract / Runtime Contract
3. AI Rules
4. Knowledge Base
5. Conversation / Task Orchestration
6. Retrospective
7. Agent Index / README

不得只修改单个 Agent 文档而不更新公共架构和知识沉淀。
