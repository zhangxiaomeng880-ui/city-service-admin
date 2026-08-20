# AI Native Agent Architecture V1.4

## 1. Purpose

This document defines the unified Agent classification and runtime architecture.

Agents are formally divided into two categories:

1. Process Agents
2. Capability Agents

This separation prevents specialist capabilities from being incorrectly embedded into a single lifecycle phase and enables parallel tasks, reusable capabilities, phase handoff, dynamic model routing, cost accounting, business artifact generation, and independent audit.

## 2. Agent Categories

### 2.1 Process Agents

Process Agents are responsible for lifecycle-stage execution, decision-making, stage gates, Phase Output, and handoff.

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
- Phase Manager
- Task Manager
- Conversation Manager
- Context Manager
- Capability Router
- Tool / MCP Router
- Model Router
- Execution Engine
- State Manager
- Phase Readiness Gate
- Quality Gate
- Audit Gate
- Phase Handoff Manager
- Execution Record Store
- Output Artifact Store
- Token & Cost Ledger
- Model Performance Registry
- Knowledge Manager
- Audit Logger

These are common runtime capabilities, not additional business Agents.

## 4. Phase Contract

Every project Phase follows the same core contract as its owning Process Agent:

```text
Phase Input
 ↓
Input Validation / Readiness
 ↓
Task / Context Assembly
 ↓
Capability Detection
 ↓
Tool / MCP / Capability / Model Selection
 ↓
Execution
 ↓
Phase Output
 ↓
Quality Gate
 ↓
Independent Audit Gate
 ↓
Phase Handoff
 ↓
Next Phase Input
```

The Phase MUST have explicit Input, Execution, Output, and Gates. A Phase is not complete merely because its Process Agent stopped executing.

The approved Phase Output is the formal primary input boundary for the next Phase.

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
Tool Run / MCP Run / Model Run
  ↓
Execution Record
  ↓
Quality Gate
  ↓
Output Artifact
  ↓
Decision Record when applicable
  ↓
Phase Output
  ↓
Phase Handoff
  ↓
Next Phase Input
```

A Phase can contain multiple independent Tasks and Conversations that run in parallel.

## 6. Task and Conversation Rules

- One Phase does not equal one Conversation.
- One Task owns its own execution context.
- Independent Tasks use independent Conversations.
- Tasks may run in parallel.
- Tasks exchange information through Project Context, Knowledge Base, and structured Outputs / Artifacts.
- A completed capability result can be associated with later Tasks without re-running the capability.

## 7. Capability Router and Common Capability Pool

Capability Router identifies which specialist capabilities may improve a Task.

The execution strategy may use:

- built-in / system tools;
- project tools;
- user-configured MCPs;
- registered Capability Agents;
- Models.

User-configured MCPs belong to the Common Capability Pool and are not owned by a single Agent. Authorized Agents may discover and use a compatible MCP subject to its registered schema, permission, availability, cost, and audit requirements.

Agents must not call every available MCP by default.

For an interactive human requirement, the Agent should recommend relevant capabilities such as Competitor Analysis and Data Analysis, allow user choice, and prefer valid reusable results.

## 8. Execution Strategy

Before selecting a Model, the Agent determines whether the Task can be reliably completed through a Tool / MCP or a registered Capability Agent.

```text
Task
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Execution Strategy
 ├─ Tool / MCP
 ├─ Capability Agent
 └─ Model
```

These strategies may be composed. Deterministic work should use deterministic Tools / MCPs whenever possible.

## 9. Model Router

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

The detailed Dynamic Model Routing algorithm is maintained separately.

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

Every escalation records its reason.

## 11. Model Run Accounting

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

## 12. Execution Records and Business Artifacts

Execution Records and Output Artifacts have different responsibilities.

### Execution Record

Records how a Task was executed, including Steps, Tool / MCP / Model Runs, quality, state, and usage.

### Output Artifact

Stores the reusable business result intended for downstream consumption.

Examples include PRD, Competitor Report, KPI Report, Design Specification, Technical Plan, and Test Report.

For a requirement-definition Task, Product MUST produce one authoritative versioned PRD Artifact. Competitor Analysis, Data Analysis, user input, and Product Decisions remain supporting sources and are linked to the PRD through evidence / decision references.

The PRD MUST NOT contain raw execution logs. Runtime and cost evidence remains in the Execution Record / Usage layer.

## 13. Decision and Traceability Chain

Material product decisions should be represented as Decision Records.

```text
PRD section
 ↓
Decision Record
 ↓
Supporting Artifact / Evidence
 ↓
Source Task
 ↓
Step / Tool / MCP / Model Run
```

This permits Audit to verify why a requirement exists and what evidence supported it.

## 14. Phase Handoff and Next-Phase Start

After a Phase passes its required Quality and independent Audit gates, the system creates a Phase Handoff referencing the approved Phase Output.

The next Phase performs its own Readiness Check against that handoff. The system SHOULD proactively notify the user when the next Phase is ready and explain the expected inputs and relevant Tools / MCPs / capabilities. The next business Phase starts only after user confirmation unless an explicit project rule authorizes automatic progression.

Example:

```text
Product Output / PRD
        ↓
Design Readiness
        ↓
User confirmation
        ↓
Design Input
```

## 15. Standard Phase Chain

```text
Product Output → Design Input
Design Output → Planning Input
Planning Output → Coding Input
Coding Output → Testing Input
Testing Output → Release Input
Release Output → Maintenance Input
```

Each handoff preserves Artifact version, provenance, decisions, constraints, and unresolved items.

## 16. Tool First

Deterministic work should be performed by deterministic tools whenever possible.

For example, Data Analysis should use SQL, Python, analytics tools, or compatible MCPs for calculation / retrieval, and use LLMs for interpretation, diagnosis, and recommendation.

## 17. Quality and Cost Feedback Loop

```text
Task
 ↓
Execution Strategy
 ↓
Model / Tool / MCP Execution
 ↓
Quality Gate
 ↓
Execution + Token / Cost / Quality Recording
 ↓
Model Performance Registry
 ↓
Future Optimization
```

## 18. Audit Boundary

Audit Agent remains independent from Testing, Compliance, and the Agent being audited.

Audit may inspect:

- phase input readiness;
- phase output completeness;
- phase gate results;
- execution evidence;
- model selection rationale;
- tool / MCP selection and authorization;
- token and cost consumption;
- retries and escalations;
- output correctness and traceability;
- PRD-to-decision-to-evidence linkage;
- phase-to-phase handoff integrity;
- unnecessary or duplicated model/tool calls.

An Agent must not self-certify its own independent Audit result.

## 19. Contract References

- `ai/rules/AGENT_MD_CONTRACT_V1.0.md` — mandatory Agent execution contract
- `ai/rules/PHASE_CONTRACT_V1.0.md` — mandatory Phase lifecycle, output, gate, and handoff contract
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md` — execution records, artifacts, metrics, evidence, and decisions
- `ai/rules/CONVERSATION_ORCHESTRATION.md` — natural-language interaction and parallel Conversation orchestration
