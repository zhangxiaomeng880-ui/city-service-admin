# AGENT MD Contract V1.0

## 1. Purpose

This is the mandatory common execution contract for every Agent MD.

Agent MD defines **what an Agent does**. This Contract defines **how it must execute**.

Agents are divided into:

- `Process Agent` — owns lifecycle Phase execution and Phase Output.
- `Capability Agent` — provides reusable specialist capability.

A Phase is owned by its Process Agent and MUST use the same Input / Execution / Output / Gate principles. A Phase must not create a second implementation of an Agent capability.

## 2. Mandatory Agent MD Structure

Every Agent MD MUST define:

1. Agent Type
2. Responsibility
3. Non-Responsibility
4. Trigger / Invocation
5. Owner Phase when Process Agent
6. Input
7. Input Validation
8. Context Assembly
9. Task Classification
10. Capability Detection
11. Execution Strategy / Tool / MCP / Skill Selection
12. Model Selection
13. Execution
14. Human-in-the-Loop
15. Output
16. Evidence
17. Quality Gate
18. Handoff
19. State
20. Parallel Task
21. Reuse
22. Token & Cost
23. Audit
24. Knowledge Handoff

## 3. Input Contract

Inputs consist of:

### System Context

- Project ID / Context
- Current Phase
- Version
- Agent Version
- Rules
- Knowledge Base
- Previous valid Outputs

### Task Input

- Task ID
- Task Type
- Goal
- Description
- Priority
- Trigger Source
- Related Task
- Deadline when applicable

### User Input

Classify as:

- Required Input
- Optional Input
- Decision Input
- Confirmation Input
- Approval Input

Existing valid context must not be requested again. Critical business facts must not be guessed.

### Previous Output

Reusable output must retain source Task, Agent, version, time, validity, and provenance.

## 4. Input Validation / Context

Before execution, check:

- completeness;
- validity;
- consistency;
- freshness;
- provenance;
- executability.

Build context from System Context + Project Context + Phase Input + Task Input + relevant validated Outputs + Knowledge + User Decisions.

Priority:

`System Rule > Project Rule > Current Task > User Decision > Validated Output > Historical Knowledge > Inference`

Missing critical input → `WAITING_FOR_INPUT`.
User choice required → `USER_DECISION_REQUIRED`.

## 5. Task Classification

Every Task is classified as one or more of:

- Information Retrieval
- Information Organization
- Analysis / Judgment
- Decision Support
- Content Generation
- Action / Execution
- Verification / Audit

## 6. Capability Detection

Before execution, determine whether reusable capabilities can materially improve the Task.

For interactive human requirements:

1. Offer valid existing results for reuse first.
2. If a new capability would materially help, tell the user which capability is available.
3. Allow the user to select one, multiple, reuse existing results, or skip.
4. Do not silently invoke optional specialist capabilities unless a Project Rule requires it.

## 7. Common Capability Pool

The common execution capability types are:

1. `TOOL`
2. `USER_MCP`
3. `USER_SKILL`
4. `CAPABILITY_AGENT`
5. `MODEL`

These are not additional lifecycle Agents.

### Tool

Use deterministic built-in / project tools for deterministic work.

### User-configured MCP

User-configured MCPs belong to the Common Capability Pool. Any authorized Agent may consider a compatible MCP.

MCP selection MUST verify authorization, capability-task compatibility, schema, availability, and applicable cost / latency / audit requirements. Agents must not call every available MCP by default.

### User Skill

A User Skill is a user-provided reusable skill / instruction package that declares domain knowledge, procedure, constraints, or execution guidance.

A User Skill:

- must be applicable to the current Task;
- should be registered / discoverable;
- must respect System Rules, Project Rules, permissions, security boundaries, and this Contract;
- may complement a Tool, MCP, Capability Agent, or Model;
- does not automatically replace them;
- should retain source / version information when available.

### Capability Agent

Use a registered specialist Agent such as Competitor Analysis or Data Analysis when specialist capability is required.

### Model

Use a Model when reasoning, interpretation, generation, judgment, or another model-dependent capability is genuinely required.

## 8. Execution Strategy

The default decision priority is:

```text
Task
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Capability Registry
 ↓
Tool / MCP / User Skill / Capability Agent / Model Selection
 ↓
Execution
```

This is a priority, not a prohibition on composition. One Task may combine multiple capability types.

Deterministic work should use deterministic Tools / MCPs whenever possible.

The Phase invokes its owning Process Agent; it does not maintain a separate Phase-specific Agent implementation.

## 9. Model Selection

Every Model Run must record, where available:

- Model / Version
- Selection Reason
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Estimated / Actual Cost
- Latency
- Retry Count
- Escalation
- Quality Result

The optimization target is **Quality-Constrained Minimum Cost**, not Token count alone.

The Dynamic Model Routing algorithm is a separate common-runtime concern and must not be duplicated inside individual Agents.

## 10. Execution Contract

Every Task must be decomposable into traceable Steps:

`Task → Input Validation → Context Assembly → Classification → Capability Detection → Tool / MCP / Skill / Capability / Model Selection → Execution → Quality Check → Output → Handoff`

Material Tool / MCP / Skill / Capability / Model executions must be traceable to Task and Step IDs.

## 11. Human-in-the-Loop

Standard states:

- `WAITING_FOR_INPUT`
- `USER_DECISION_REQUIRED`
- `USER_CONFIRMATION_REQUIRED`
- `USER_APPROVAL_REQUIRED`

Prompts must state what is missing / what must be decided and provide options where known.

## 12. Output Contract

Every Agent MUST provide:

### Structured Output

- task_id
- status
- input_summary
- execution
- findings / result
- evidence
- decisions when applicable
- recommendations when applicable
- quality
- handoff

### Human-Readable Output

Default order:

`Conclusion → Key Findings → Evidence → Analysis → Recommendation → Next Step`

For a Process Agent, the formal **Phase Output is mandatory** and is the primary downstream boundary.

## 13. Phase Output / Handoff

A Process Agent owning a Phase MUST produce a versioned Phase Output.

The approved Phase Output becomes the formal primary input of the next Phase.

```text
Product Output → Design Input
Design Output → Planning Input
Planning Output → Coding Input
Coding Output → Testing Input
Testing Output → Release Input
Release Output → Maintenance Input
```

A Phase Handoff must preserve artifact version, provenance, decisions, constraints, unresolved items, required next inputs, and readiness.

After Quality + independent Audit + next-Phase Readiness pass, the system SHOULD proactively prompt the user to start the next Phase. The next business Phase starts only after user confirmation unless an explicit Project Rule authorizes automatic progression.

## 14. Evidence Contract

Material conclusions must identify evidence. Distinguish:

- Fact
- Finding
- Hypothesis
- Recommendation
- Decision

Evidence may originate from User Input, Project Context, Tool, MCP, User Skill, Data, Competitor Source, Agent Output, Knowledge Base, or Model Inference.

## 15. Quality Gate

Every Agent / Phase must define:

- Input Quality
- Execution Quality
- Output Quality
- Evidence Quality
- Handoff Quality
- Independent Audit where required

Standard outcomes:

`PASS / PARTIAL / BLOCKED / FAIL`

A Phase is not complete without required Phase Output and required gates.

## 16. State

Standard Task lifecycle:

`CREATED → INPUT_CHECK → [WAITING_FOR_INPUT / USER_DECISION_REQUIRED] → EXECUTING → QUALITY_REVIEW → COMPLETED`

Exceptions:

`PARTIAL / BLOCKED / FAILED / SKIPPED`

Phase lifecycle is governed by `PHASE_CONTRACT_V1.0.md`.

## 17. Parallel Task

One Phase may contain multiple independent Tasks / Conversations.

Each independent Task keeps its own:

- Task ID
- Conversation
- State
- Execution Record
- Token / Cost
- Model / Tool / MCP / Skill Runs

Tasks communicate through structured Outputs / Artifacts, Project Context, and Knowledge Base.

## 18. Reuse

Before expensive execution, check whether a valid Artifact can be reused.

Reuse only when relevant, sufficiently current, complete enough, quality-approved, and compatible with the current Task.

## 19. Token & Cost

Usage is traceable:

`Project → Phase → Task → Step → Tool / MCP / Skill / Model Run`

Record applicable Tool Cost, MCP Cost, Skill usage, Model Cost, Retry Cost, Escalation Cost, latency, and quality.

Detailed record definitions are in `EXECUTION_RECORD_CONTRACT_V1.0.md`.

## 20. Audit

Independent Audit must check:

- Agent category / scope;
- input / context / validation;
- capability detection;
- Tool / MCP / User Skill / Capability Agent / Model selection;
- execution traceability;
- human intervention;
- structured / human output;
- evidence;
- Phase Output where applicable;
- quality gates;
- handoff;
- state;
- parallel-task isolation;
- reuse;
- Token / Cost;
- PRD / decision / evidence linkage where applicable.

An Agent must not self-certify its independent Audit.

Only `AUDIT_PASS` is formally acceptable.

## 21. Knowledge Handoff

Classify results as:

- one-time output → Artifact / archive;
- reusable rule → Knowledge Base;
- execution rule → Agent / Rules;
- process learning → Retrospective.

## 22. Contract References

- `ai/rules/PHASE_CONTRACT_V1.0.md`
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md`
- `ai/rules/CAPABILITY_REGISTRY_V1.0.md`

Changes to this Contract require compatibility review of affected Agent MDs, Phase definitions, Architecture, Audit criteria, Knowledge Base, and Retrospective.
