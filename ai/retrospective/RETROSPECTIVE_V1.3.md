# AI Native 流程复盘 V1.3

## 1. 复盘范围

本轮在 Agent 分类、统一 AGENT MD Contract、Capability Agent、MCP 公共能力池、Task / Conversation 隔离、执行成本记录和 Audit 体系基础上，进一步明确了 **Execution Record 与 Business Output Artifact 的边界，以及需求 Task 的 PRD 汇聚机制**。

## 2. 关键问题

### 2.1 执行记录不能等同于业务输出

运行系统需要记录 Agent、Step、Tool / MCP / Model Run、Token、Cost、Retry、Escalation、Quality 和 Evidence；但业务用户需要的是可读、可复用的业务文档。

因此形成两个层次：

- **Execution Record**：回答“这个结果是怎么产生的”。
- **Output Artifact**：回答“这个结果是什么、下游如何使用”。

两者通过 `task_id / step_id / run_id / artifact_id` 关联，但不混为一体。

### 2.2 需求 Task 不能输出一堆孤立报告

人工需求可能同时使用：用户输入、Competitor Analysis、Data Analysis、Project Context、历史有效 Artifact、产品决策。如果这些结果分别停留在不同 Conversation 或报告中，Design 阶段无法获得一个权威需求定义。

结论：

> **Requirement-definition Task 必须最终形成一个权威、版本化 PRD Artifact。**

Competitor / Data 报告是支撑来源，Decision Record 是决策来源，Evidence 是证据来源；PRD 是最终业务消费结果。

### 2.3 PRD 需要可追溯，但不能成为运行日志

PRD 不应塞入 Model Trace、MCP 调用日志、Token 明细、Cost 明细或 Retry 日志。这些保留在 Execution / Usage 层。

PRD 中的材料结论需要能够反向追溯到：

```text
PRD Section
 ↓
Decision Record
 ↓
Supporting Artifact / Evidence
 ↓
Task
 ↓
Step / Tool / MCP / Model Run
```

### 2.4 Recommendation 与 Decision 必须区分

Competitor / Data Agent 可以输出 Recommendation，但不能自行把 Recommendation 变成 Product Decision。

除非项目规则明确授权自动接受，否则必须由授权决策者确认，并形成 Decision Record。

## 3. 本轮形成的标准架构

```text
AI Native
│
├── Process Agents
│   └── Product / Design / Planning / Coding / Testing / ...
│
├── Capability Agents
│   ├── Competitor Analysis
│   └── Data Analysis
│
└── Common Runtime
    ├── Task / Conversation Manager
    ├── Capability Router
    ├── Tool Router
    ├── Model Router
    ├── Execution Record Store
    ├── Output Artifact Store
    ├── Token & Cost Ledger
    ├── Quality Gate
    ├── Knowledge Manager
    └── Audit Logger
```

## 4. Requirement Execution Model

```text
Human Requirement
      ↓
Product Task
      ↓
Capability Detection
      ├─ Existing Competitor Artifact → Reuse
      ├─ Existing Data Artifact → Reuse
      └─ New Capability Needed → User Choice
                    ↓
          Independent Capability Tasks
                    ↓
          Competitor / Data Artifacts
                    ↓
             Product Synthesis
                    ↓
              Decision Records
                    ↓
             Authoritative PRD
                    ↓
             Product Quality Gate
                    ↓
                  Audit
                    ↓
                 Design
```

## 5. Execution Data Model

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
 ├─ Tool Run
 ├─ MCP Run
 └─ Model Run
 ↓
Execution Record
 ↓
Quality Gate
 ↓
Output Artifact
 ↓
Decision Record when applicable
 ↓
Knowledge / Handoff / Next Task
```

Metrics remain separately aggregatable: Token, Cost, Latency, Retry, Escalation, Tool / MCP usage, Model usage, Quality, and Reuse.

## 6. Audit Requirements

Audit must verify not only Agent execution but also the **business result provenance**.

For requirement Tasks, Audit must verify:

1. Requirement input is valid.
2. Relevant existing capability results were checked for reuse.
3. Optional capabilities were surfaced when materially useful.
4. Capability Tasks remain independently traceable.
5. Findings are validated before Product synthesis.
6. Material decisions have Decision Records.
7. One authoritative versioned PRD exists.
8. PRD is business-readable and does not contain runtime logs.
9. Material PRD conclusions are traceable to Decisions / Artifacts / Evidence.
10. Execution and usage data remain separately traceable.

## 7. Long-Term Principles

1. Process Agent owns stage execution; Capability Agent owns specialist capability.
2. One Phase may contain multiple parallel Tasks and Conversations.
3. Existing valid Artifact is preferred over duplicate execution.
4. User-configured MCP belongs to the Common Capability Pool.
5. Tool First is preferred for deterministic work.
6. Dynamic Model Routing is a Common Runtime capability and remains separately designed.
7. Execution Record and Output Artifact must remain separate.
8. Requirement Task must converge to one authoritative PRD Artifact.
9. Recommendation does not equal Decision.
10. Every material business conclusion must remain traceable.
11. Audit cannot be self-certified.
12. Contract changes require dependent Agent review and Audit.

## 8. Next Audit Scope

After this change, Audit should validate at minimum:

- AGENT MD Contract
- Execution Record Contract
- Stage Contract
- Conversation Orchestration
- Product Agent
- Competitor Analysis Agent
- Data Analysis Agent
- Audit Agent
- Agent Architecture
- Knowledge Base
- Retrospective synchronization

Dynamic Model Routing is explicitly excluded from final algorithm approval until its separate design is completed.
