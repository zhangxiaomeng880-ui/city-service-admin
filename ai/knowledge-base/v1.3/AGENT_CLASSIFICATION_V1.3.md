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

## Governing Contract

All Agent MDs must follow:

`ai/rules/AGENT_MD_CONTRACT_V1.0.md`

Agent-specific MDs define professional responsibility; the Contract defines the common execution method.

## Common Capability Pool

The Common Capability Pool contains authorized reusable execution capabilities, including:

- Built-in / system tools
- Project tools
- User-configured MCPs
- Registered specialist Capability Agents

User-configured MCPs are shared capabilities, not private Agent capabilities. They require authorization, registered capability / schema, availability, and auditability before use.

Agents must not call every available MCP by default.

## Runtime Model

```text
Project → Phase → Task → Conversation → Step → Tool / MCP / Capability Run and/or Model Run → Quality Gate → Output → Handoff
```

A Phase may contain multiple independent Tasks and Conversations that execute in parallel.

## Product Interaction

Human requirements may associate existing competitor or KPI analysis results or invoke new capability Tasks.

When relevant capabilities exist, Product should inform the user and let the user choose. Existing valid results should be reused before new execution.

## Execution Strategy

Default priority:

`Deterministic Tool / MCP → Capability Agent → Model`

The strategies may be combined when required for correctness.

## Model Routing

Model Router is a global capability. The detailed Dynamic Model Routing algorithm remains a separate design and is not embedded in individual Agent MDs.

Every Model Run records model, version, selection reason, input/output/cache/total Tokens, cost when available, latency, retry, escalation, quality result, and final result.

## Data Analysis Principle

Data Analysis follows Tool First: deterministic calculations should use SQL, Python, Analytics Tools, or authorized MCPs. LLMs are primarily used for interpretation, diagnosis, and recommendations.

## Auditability

Task, Step, Tool / MCP Run, Capability Run, Model Run, Quality Gate, Handoff, and output evidence must be traceable so Audit can independently inspect execution quality and cost efficiency.

Only an independent Audit `AUDIT_PASS` qualifies for formal acceptance.
