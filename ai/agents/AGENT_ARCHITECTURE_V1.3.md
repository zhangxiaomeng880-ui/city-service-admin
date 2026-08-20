# AI Native Agent Architecture V1.3

## 1. Purpose

This document defines the unified Agent classification and runtime architecture.

Agents are formally divided into two categories:

1. Process Agents
2. Capability Agents

This separation prevents specialist capabilities from being incorrectly embedded into a single lifecycle phase and enables parallel tasks, reusable capabilities, dynamic model routing, cost accounting, and independent audit.

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

Capability Agents are not subordinate to Product Agent or any other single Process Agent.

## 3. Common Agent Runtime

All Agents share:

- Project Context
- Task Manager
- Conversation Manager
- Context Manager
- Capability Router
- Model Router
- Tool Router
- Execution Engine
- State Manager
- Quality Gate
- Token & Cost Ledger
- Model Performance Registry
- Knowledge Manager
- Audit Logger

These are common runtime capabilities, not additional business Agents.

## 4. Execution Hierarchy

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
Model Run / Tool Run
  ↓
Quality Gate
  ↓
Structured Output
  ↓
Human Readable Output
```

A Phase can contain multiple independent Tasks and Conversations that run in parallel.

## 5. Task and Conversation Rules

- One Phase does not equal one Conversation.
- One Task owns its own execution context.
- Independent Tasks use independent Conversations.
- Tasks may run in parallel.
- Tasks exchange information through Project Context, Knowledge Base, and structured outputs.
- A completed capability result can be associated with later Tasks without re-running the capability.

## 6. Capability Router

Capability Router identifies which specialist capabilities may improve a Task.

For an interactive human requirement, the Agent should recommend relevant capabilities when they are useful, such as:

- Competitor Analysis
- Data Analysis

The user may choose to:

- associate an existing result;
- run a new capability Task;
- use multiple capabilities;
- skip the capability.

Existing valid results should be preferred over duplicate execution.

## 7. Model Router

Model Router is a global common capability.

Its objective is:

> Select the lowest-cost model that satisfies the required quality and capability constraints.

Selection considers:

- Task complexity
- Required capability
- Quality threshold
- Candidate model capability
- Historical model performance
- Input / output size
- Expected cost
- Latency requirements

Minimum Token is not equivalent to optimal model selection. The optimization target is Quality-Constrained Minimum Cost.

## 8. Model Escalation

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

Every escalation records its reason.

## 9. Model Run Accounting

Every model execution records:

- Project ID
- Phase
- Task ID
- Step ID
- Model
- Model Version
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Cost
- Execution Time
- Retry Count
- Model Escalation
- Quality Gate Result
- Final Result
- Model Selection Decision

This data is the evidence source for future model-routing optimization and independent Audit.

## 10. Tool First

Deterministic work should be performed by deterministic tools whenever possible.

For example, Data Analysis should use SQL, Python, or analytics tools for calculation, and use LLMs for interpretation, diagnosis, and recommendation.

## 11. Quality and Cost Feedback Loop

```text
Task
 ↓
Model Router
 ↓
Execution
 ↓
Quality Gate
 ↓
Token / Cost / Quality Recording
 ↓
Model Performance Registry
 ↓
Future Model Router Optimization
```

## 12. Audit Boundary

Audit Agent remains independent from Testing, Compliance, and the Agent being audited.

Audit may inspect:

- input completeness;
- execution evidence;
- model selection rationale;
- token and cost consumption;
- retries and escalations;
- output correctness and traceability;
- unnecessary or duplicated model/tool calls.

An Agent must not self-certify its own independent Audit result.
