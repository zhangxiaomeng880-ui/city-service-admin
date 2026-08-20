# Agent Classification Knowledge V1.3

## Formal Classification

AI Native Agents are divided into two categories:

### Process Agents

Responsible for lifecycle-stage execution, stage decisions, gates, and handoff.

Current examples: Project, Product, Design, Planning, Coding, Testing, Compliance, Audit, Release / Deploy, Maintenance.

### Capability Agents

Responsible for reusable specialist capabilities that may run independently or be invoked by Process Agents.

Current capabilities:

- Competitor Analysis Agent
- Data Analysis Agent

## Runtime Model

```text
Project → Phase → Task → Conversation → Step → Model Run / Tool Run → Quality Gate → Output
```

A Phase may contain multiple independent Tasks and Conversations that execute in parallel.

## Product Interaction

Human requirements may associate existing competitor or KPI analysis results or invoke new capability Tasks.

When relevant capabilities exist, the Agent should inform the user and let the user choose. Existing valid results should be reused before new execution.

## Model Routing

Model Router is a global capability. It selects the lowest-cost model that satisfies capability and quality constraints.

Every Model Run records model, version, input/output/cache/total tokens, cost, latency, retry, escalation, quality result, and selection rationale.

## Data Analysis Principle

Data Analysis follows Tool First: deterministic calculations should use SQL, Python, or analytics tools. LLMs are primarily used for interpretation, diagnosis, and recommendations.

## Auditability

Task, Step, Model Run, Tool Run, Quality Gate, and output evidence must be traceable so Audit can independently inspect execution quality and cost efficiency.
