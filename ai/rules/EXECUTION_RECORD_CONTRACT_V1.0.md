# Execution Record Contract V1.0

## 1. Purpose

`AGENT_MD_CONTRACT` defines how an Agent executes. This Contract defines what execution data, business outputs, evidence, decisions, and usage metrics remain traceable after execution.

Core principle:

> **Execution Records serve system traceability; Output Artifacts serve business consumption.**

## 2. Canonical Relationship

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
 ├─ User Skill Usage
 ├─ Capability Task
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
Phase Output / Handoff / Knowledge
```

`task_id` is the primary execution correlation key. `phase_id`, `step_id`, `run_id`, `artifact_id`, and `decision_id` provide traceability.

## 3. Execution Record

Every material Task MUST produce an Execution Record.

Minimum fields:

- task_id
- project_id
- phase
- agent
- agent_version
- conversation_id
- task_type
- trigger
- start_time
- end_time
- input_status
- execution_status
- execution_strategy
- step references
- quality_gate
- final_status
- evidence references

## 4. Step and Run Records

Every significant Step receives a `step_id`.

### Tool / MCP Run

Record, where applicable:

- run_id
- task_id
- step_id
- provider_type
- tool / MCP name
- version
- input reference
- output reference
- authorization reference where applicable
- status
- latency
- retry count
- estimated / actual cost
- error reference

User-configured MCP is a Tool / MCP Run and MUST be distinguishable from built-in / project tools.

### User Skill Usage

Record, where applicable:

- skill_id / name
- skill_version
- source / owner
- task_id
- step_id
- usage purpose
- relevant input / output references
- status
- quality result

A User Skill's content should not be copied into the PRD or execution log merely because it was used.

### Capability Agent Task

Record the Capability Agent Task and its `artifact_id` / execution references. A Capability Agent is an independent reusable Task provider, not a Phase-specific implementation.

### Model Run

Record, where applicable:

- run_id
- task_id
- step_id
- model
- model_version
- selection reason
- input tokens
- output tokens
- cached tokens
- total tokens
- estimated cost
- actual cost
- latency
- retry count
- escalation
- quality result

Dynamic Model Routing remains outside this Contract.

## 5. Output Artifact

A completed business Task MUST produce a versioned Output Artifact when the Task is expected to create a reusable business result.

Minimum fields:

- artifact_id
- project_id
- task_id
- agent
- artifact_type
- version
- created_at
- status
- content / structured data reference
- evidence references
- quality status
- intended consumer
- validity / supersession information when applicable

## 6. Requirement / PRD Output Rule

When the business Task is a requirement-definition Task, the final business output MUST be one unified, versioned PRD Artifact.

Competitor Analysis, Data Analysis, User Input, User Skill results, and Product Decisions are supporting sources; they do not replace the PRD.

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

The PRD integrates validated, decision-relevant information and keeps source references for material conclusions. It MUST NOT become a dump of execution logs or raw model responses.

## 7. Phase Output Rule

Every Process Agent owning a Phase MUST produce a formal Phase Output.

Phase Output is distinct from the underlying execution logs and is the primary input boundary for the next Phase.

Minimum traceability:

`Phase Output → source Artifacts → Decision / Evidence → Task / Step / Run`

## 8. Decision Record

A material product or user decision MUST be represented by a Decision Record when it changes requirement, scope, solution, priority, acceptance criteria, or downstream behavior.

Minimum fields:

- decision_id
- project_id
- phase
- task_id
- decision
- rationale
- source references
- deciding party
- decision time
- status

A recommendation is not a decision until authorized confirmation or an explicit Project Rule accepts it.

## 9. Evidence Record

Material claims retain provenance.

Evidence classes include:

- User Input
- Project Context
- Tool Result
- MCP Result
- User Skill Result / Usage
- Data
- Competitor Source
- Previous Agent Output
- Knowledge Base
- Model Inference

Fact, Finding, Hypothesis, Recommendation, and Decision remain distinguishable.

## 10. Metrics and Usage

Metrics remain separate from business content.

### Task Metrics

- duration
- tool calls
- MCP calls
- User Skill usages
- capability tasks
- model runs
- input / output / total tokens
- model cost
- tool cost
- MCP cost
- retry cost
- escalation cost
- total cost
- quality status
- reuse indicator

### Phase / Project Metrics

Task-level metrics may be aggregated by:

- Phase
- Agent
- Task Type
- Tool / MCP / Skill
- Capability Agent
- Model
- Quality outcome
- Reuse outcome

Aggregations MUST retain links to underlying Task / Run records.

## 11. Reuse and Supersession

Before expensive execution, check whether a valid Artifact can be reused.

A reusable result is relevant, current enough, complete enough, quality-approved, and compatible with the current Task.

If reused, record `artifact_id` rather than duplicating content.

When a newer Artifact supersedes an older one, retain the supersession relationship.

## 12. Requirement Integration Flow

For a requirement Task:

1. Product receives human requirement input.
2. Product detects Competitor / Data / other relevant capabilities.
3. Existing valid results are offered for reuse first.
4. If new analysis is useful, user chooses optional capabilities where required.
5. Selected capability Tasks execute independently.
6. Their Outputs become source Artifacts.
7. Product combines validated findings and user decisions.
8. Material decisions become Decision Records.
9. Product produces one authoritative PRD Artifact.
10. Product assembles the Product Phase Output containing the PRD and downstream-required information.
11. Product Quality + independent Audit verify the Phase Output.
12. Approved Product Phase Output becomes the Design Phase's formal primary input.

## 13. Auditability

Audit must be able to navigate:

```text
Phase Output / PRD section / decision
 ↓
Decision Record
 ↓
Supporting Artifact(s)
 ↓
Evidence
 ↓
Task
 ↓
Step
 ↓
Tool / MCP / Skill / Capability / Model Run
```

If a material Phase Output / PRD conclusion cannot be traced to accepted evidence or a decision where required, the output is not fully auditable.

## 14. Lifecycle / Immutability

Execution evidence must not be silently rewritten.

Updates create new versions or traceable events.

Business Artifacts are versioned. The latest accepted version is the active consumer-facing result.

## 15. Storage Boundary

- Execution Records → runtime / audit data
- Run Records → tool / MCP / Skill / model usage data
- Metrics → analytics / cost data
- Evidence → evidence store / references
- Output Artifacts → business artifact store
- Phase Output / Handoff → lifecycle handoff store
- Decision Records → decision log
- Knowledge-worthy conclusions → Knowledge Base
- Process lessons → Retrospective

Each layer keeps its own responsibility while retaining cross-references.
