# Agent Classification Knowledge V1.3

## Formal Classification

AI Native Agents are divided into two categories:

### Process Agents

Responsible for lifecycle-stage execution, stage decisions, gates, and handoff.

Current examples: Project, Research, Product, Design, Planning, Coding, Testing, Compliance, Audit, Release / Deploy, Maintenance.

### Capability Agents

Responsible for reusable specialist capabilities that may run independently or be invoked by Process Agents.

Current capabilities:

- Competitor Analysis Agent
- Data Analysis Agent

## Runtime Model

```text
Project → Phase → Task → Conversation → Step → Tool / MCP / Model Run → Execution Record → Quality Gate → Output Artifact → Decision Record when applicable → Handoff
```

A Phase may contain multiple independent Tasks and Conversations that execute in parallel.

## Common Capability Pool

Execution may use built-in tools, project tools, user-configured MCPs, registered Capability Agents, or Models.

User-configured MCPs are part of the Common Capability Pool and are available to authorized Agents according to registered capability, schema, permission, availability, cost, and audit requirements. Agents must not call all available MCPs by default.

## Product Interaction

Human requirements may associate existing competitor or KPI analysis results or invoke new capability Tasks.

When relevant capabilities exist, the Agent should inform the user and let the user choose. Existing valid results should be reused before new execution.

A requirement-definition Task must eventually produce one authoritative, versioned PRD Artifact. Competitor Analysis, Data Analysis, User Input, and Product Decisions are supporting sources that are integrated into the PRD rather than separate substitutes for it.

## Requirement Traceability

```text
Evidence
 ↓
Analysis
 ↓
Finding
 ↓
Recommendation
 ↓
Product / Human Decision
 ↓
Requirement
 ↓
PRD Artifact
```

The PRD is the business-consumption output. Execution Records, Model / Tool / MCP Runs, Token / Cost Metrics, Evidence Records, and Decision Records remain separate traceability layers.

## Model Routing

Model Router is a global capability. It selects the lowest-cost model that satisfies capability and quality constraints.

Every Model Run records model, version, input/output/cache/total tokens, cost, latency, retry, escalation, quality result, and selection rationale where available.

Detailed Dynamic Model Routing remains a separate design topic.

## Data Analysis Principle

Data Analysis follows Tool First: deterministic calculations should use SQL, Python, analytics tools, or compatible MCPs. LLMs are primarily used for interpretation, diagnosis, and recommendations.

## Auditability

Task, Step, Tool Run, MCP Run, Model Run, Execution Record, Output Artifact, Decision Record, Quality Gate, and evidence must be traceable so Audit can independently inspect execution quality, business-result provenance, and cost efficiency.
