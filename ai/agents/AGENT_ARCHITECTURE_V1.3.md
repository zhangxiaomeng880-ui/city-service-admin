# AI Native Agent Architecture V1.3

## 1. Purpose

This document defines the unified Agent classification and runtime architecture.

Agents are formally divided into two categories:

1. Process Agents
2. Capability Agents

The execution mechanism is governed by `ai/rules/AGENT_MD_CONTRACT_V1.0.md`.

## 2. Agent Categories

### 2.1 Process Agents

Process Agents are responsible for lifecycle-stage execution, decision-making, stage gates, and handoff.

Current Process Agents:

- Project Agent
- Research Agent
- Product Agent
- Design Agent
- Planning Agent
- Coding / Engineering Agent
- Testing / QA Agent
- Compliance Agent
- Audit Agent
- Release / Deploy Agent
- Maintenance Agent

A Process Agent may call Capability Agents, but does not own their specialist capabilities.

### 2.2 Capability Agents

Capability Agents provide reusable specialist capabilities and can operate independently or be invoked by Process Agents.

Current Capability Agents:

- Competitor Analysis Agent
- Data Analysis Agent

Capability Agents are not subordinate to Product Agent or another single Process Agent.

## 3. Common Agent Runtime

All Agents share:

- Project Context
- Task Manager
- Conversation Manager
- Context Manager
- Capability Router
- Tool Router
- Common Capability Pool
- Model Router
- Execution Engine
- State Manager
- Quality Gate
- Token & Cost Ledger
- Model Performance Registry
- Knowledge Manager
- Audit Logger

These are common runtime capabilities, not additional business Agents.

## 4. Common Capability Pool

The Common Capability Pool contains reusable authorized tools and integrations available to eligible Agents.

It includes:

- Built-in / system tools
- Project tools
- User-configured MCPs
- Registered Capability Agents as a separate specialist capability class

User-configured MCPs are not owned by one Agent. Their authorization, schema, availability, cost, and auditability must be registered before use.

Agents must not call every available MCP by default. They must first verify capability-task compatibility and authorization.

## 5. Execution Hierarchy

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
Tool / MCP / Capability Run and/or Model Run
  ↓
Quality Gate
  ↓
Structured Output
  ↓
Human Readable Output
  ↓
Handoff
```

A Phase can contain multiple independent Tasks and Conversations that run in parallel.

## 6. Task and Conversation Rules

- One Phase does not equal one Conversation.
- One Task owns its own execution context.
- Independent Tasks use independent Conversations.
- Tasks may run in parallel.
- Tasks exchange information through Project Context, Knowledge Base, and structured outputs.
- A completed capability result can be associated with later Tasks without rerunning the capability when it remains valid.

## 7. Capability Router

Capability Router identifies which specialist capabilities may improve a Task.

For an interactive human requirement, the Agent should recommend relevant capabilities when useful:

- Competitor Analysis
- Data Analysis
- other registered capabilities

The user may choose to associate an existing result, run one capability, combine multiple capabilities, or skip optional capabilities.

Existing valid results should be preferred over duplicate execution.

## 8. Execution Strategy

The common execution strategy is:

```text
Task
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Deterministic Tool / MCP?
 ├─ Yes → Use Tool / MCP
 └─ No
      ↓
Specialist Capability Agent?
 ├─ Yes → Use Capability Agent
 └─ No
      ↓
Model
```

This is a default priority, not an absolute prohibition on combining strategies. Correct execution may combine Tool + Capability + Model.

## 9. Model Router

Model Router is a global common capability.

Its objective is:

> Select the lowest-cost model that satisfies required quality and capability constraints.

The exact Dynamic Model Routing algorithm is intentionally maintained separately and is not duplicated in individual Agent MDs.

Every model run records model/version, selection reason, Token usage, cost when available, latency, retry, escalation, Quality Gate result, and final result.

## 10. Model Escalation

```text
Lowest-Cost Feasible Model
 ↓
Quality Gate
 ├─ PASS → Complete
 └─ FAIL
      ↓
Model Escalation
      ↓
Higher-Capability Model
      ↓
Quality Gate
```

This is an architecture-level pattern only. Routing thresholds and algorithms remain a separate approved specification.

## 11. Tool First

Deterministic work should be performed by deterministic tools whenever possible.

For example, Data Analysis should use SQL, Python, Analytics Tools, or authorized MCPs for deterministic retrieval / calculation, and use models primarily for interpretation, diagnosis, and recommendation.

## 12. Model Run / Tool Run Accounting

Every execution should be traceable to Project / Phase / Task / Step.

Model Run records:

- Model
- Model Version
- Selection Reason
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Cost when available
- Execution Time
- Retry Count
- Escalation
- Quality Gate Result
- Final Result

Tool / MCP Run records:

- Tool / MCP identifier
- Task / Step
- Input / Output reference where appropriate
- Execution time
- Cost when available
- Success / failure
- Evidence reference

## 13. Quality and Cost Feedback Loop

```text
Task
 ↓
Execution Strategy
 ↓
Tool / MCP / Capability / Model
 ↓
Execution
 ↓
Quality Gate
 ↓
Token / Cost / Quality Recording
 ↓
Model Performance Registry
 ↓
Future Routing Optimization
```

## 14. Audit Boundary

Audit Agent remains independent from Testing, Compliance, and the Agent being audited.

Audit may inspect:

- Contract compliance;
- input / context completeness;
- execution evidence;
- Tool / MCP / Capability / Model selection rationale;
- Token and cost consumption;
- retries and escalations;
- output correctness and traceability;
- unnecessary or duplicated execution;
- handoff and knowledge evidence.

An Agent must not self-certify its own independent Audit result.

The formal Audit procedure is defined by `ai/agents/audit/AGENT.md`.
