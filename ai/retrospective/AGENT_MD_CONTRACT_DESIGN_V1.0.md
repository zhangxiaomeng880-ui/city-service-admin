# AGENT MD Contract 设计过程沉淀 V1.0

## 1. 背景

此前各 Agent 分别定义 Input、Execution、Model、Output 等内容，容易逐渐形成每个 Agent 自己的一套执行套路。

本次确定：专业能力可以不同，但 Agent 的执行机制必须统一。

> Agent MD 描述“这个 Agent 做什么”；统一 AGENT MD Contract 描述“所有 Agent 必须怎么做”。

## 2. 为什么必须统一

统一 Contract 用于解决：

- 输入标准不一致；
- 用户询问方式不一致；
- Task 与 Conversation 边界不一致；
- Tool / MCP / Model 选择无法比较；
- Token / Cost 无法统一统计；
- Audit 无法形成统一标准；
- Agent 越权和职责漂移。

## 3. 两大 Agent 分类

正式分为：

### Process Agent

负责生命周期阶段执行、阶段决策、Gate 和 Handoff。

### Capability Agent

负责跨阶段复用的专业能力，可独立执行，也可被 Process Agent 调用。

当前能力类 Agent：

- Competitor Analysis
- Data Analysis

## 4. 多任务 / 多 Conversation

Product 阶段可能同时存在：

- 人工需求 Task；
- 每周竞品 Task；
- 每周 KPI 数据分析 Task。

因此采用：

```text
Phase
├─ Task A → Conversation A
├─ Task B → Conversation B
└─ Task C → Conversation C
```

Task 独立拥有 Context、State、Execution Evidence、Token、Cost 和 Model Run，可并行执行，并通过结构化结果 / Project Context / Knowledge Base 汇聚。

## 5. 人工需求与能力调用

人工进入 Product 不意味着自动调用全部能力。

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

这同时兼顾分析完整性、用户决策权和成本控制。

## 6. Common Capability Pool 与 MCP

本轮进一步明确：工具不是只有系统内置工具。

Common Capability Pool 包含：

- Built-in / System Tools
- Project Tools
- User-configured MCPs
- Registered Capability Agents（作为专业能力类）

用户配置的 MCP 属于公共能力池，而不是某一个 Agent 的私有能力。

但“公共”不等于“无条件调用”。Agent 必须检查：

- 授权；
- 能力是否匹配 Task；
- 输入 / 输出 Schema；
- 可用状态；
- 成本 / 延迟；
- 审计能力。

并记录 MCP Tool Run。

## 7. 统一执行策略

```text
Task
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Deterministic Tool / MCP?
 ├─ Yes → Tool / MCP
 └─ No
      ↓
Specialist Capability Agent?
 ├─ Yes → Capability Agent
 └─ No
      ↓
Model
```

这不是绝对互斥关系。正确执行可以组合 Tool + Capability + Model。

核心原则是：**能可靠由工具完成的确定性工作，不应该无意义地消耗 LLM Token。**

## 8. 通用能力

### Capability Router

识别专业能力是否能增强当前 Task，并处理能力结果复用 / 推荐。

### Tool Router / Common Capability Pool

发现和选择系统工具、项目工具、用户 MCP，并验证权限与能力匹配。

### Model Router

属于 Common Agent Runtime 的通用能力。本轮只定义 Model Selection Contract，不锁定 Dynamic Model Routing 算法，后续单独设计。

### Quality Gate

统一检查 Input、Execution、Output、Evidence、Handoff。

### Token & Cost Ledger

记录到 Task / Step / Tool / MCP / Model Run，形成成本优化证据。

### Audit

独立依据 Contract 审计 Agent MD 和实际执行，不允许被审计 Agent 自我认证。

## 9. 统一 Contract 最终结构

所有 Agent MD 固定遵循：

1. Agent Type
2. Responsibility
3. Non-Responsibility
4. Trigger
5. Input
6. Input Validation
7. Context Assembly
8. Task Classification
9. Capability Detection
10. Execution Strategy / Tool / MCP Selection
11. Model Selection
12. Execution
13. Human-in-the-Loop
14. Output
15. Evidence
16. Quality Gate
17. Handoff
18. State
19. Parallel Task
20. Reuse
21. Token & Cost
22. Audit
23. Knowledge Handoff

## 10. Audit 原则

Audit Agent 按统一 Contract 逐项审计，不为每个 Agent 发明独立标准。

必须检查：

- Agent 分类与职责边界；
- Input / Validation；
- Context；
- Capability Detection；
- Tool / MCP / Capability / Model；
- Execution；
- Human-in-the-Loop；
- Output / Evidence；
- Quality Gate；
- Handoff；
- State；
- Parallel Task；
- Reuse；
- Token / Cost；
- Knowledge Handoff。

只有 `AUDIT_PASS` 才允许正式接受；缺失关键证据应为 `AUDIT_BLOCKED`，不能猜测 PASS。

## 11. 动态模型路由边界

动态模型路由属于 Common Agent Runtime 通用能力，不属于 Competitor Analysis 或 Data Analysis 私有能力。

本轮只规定所有 Agent 必须记录 Model Selection evidence；不提前锁定动态路由算法。

后续专项设计：

- 候选模型池；
- Task / Complexity 识别；
- Quality Threshold；
- 成本计算；
- 路由策略；
- 升级策略；
- 历史表现反馈；
- Quality-Constrained Minimum Cost 优化。

## 12. 本轮最终沉淀

1. Process / Capability 两大分类；
2. Unified AGENT MD Contract；
3. Product 多 Task / 多 Conversation；
4. Capability Detection + 用户选择；
5. Common Capability Pool；
6. User-configured MCP 作为公共能力；
7. Tool First；
8. Model Selection 统一记录；
9. Quality Gate；
10. Token / Cost Ledger；
11. 独立 Audit；
12. Dynamic Model Routing 单独专项设计。
