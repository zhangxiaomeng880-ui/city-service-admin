# Execution Record Contract V1.0

## 1. Purpose

`AGENT_MD_CONTRACT` defines how an Agent executes. This Contract defines what execution data, business outputs, evidence, decisions, and usage metrics must remain traceable after execution.

The core principle is:

> **Execution Records serve system traceability; Output Artifacts serve business consumption.**

A business Task MUST NOT be represented only by runtime logs, and runtime evidence MUST NOT be lost merely because a human-readable document is produced.

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
Knowledge / Next Task / Handoff
```

`task_id` is the primary execution correlation key. `step_id`, `run_id`, `artifact_id`, and `decision_id` provide downward and cross-layer traceability.

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

The record describes **how the result was produced**, not the complete business document itself.

## 4. Step and Run Records

Every significant execution Step receives a `step_id`.

### Tool Run / MCP Run

Record, where applicable:

- run_id
- task_id
- step_id
- tool_type
- tool_name
- tool_version
- input reference
- output reference
- status
- latency
- retry count
- estimated / actual cost
- error reference

User-configured MCP is treated as a Tool Run and MUST be distinguishable from built-in or project tools.

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

The detailed Dynamic Model Routing algorithm is intentionally outside this Contract.

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

Examples:

- PRD
- Weekly Competitor Report
- KPI Analysis Report
- Data Quality Report
- Design Specification
- Technical Plan
- Test Report

Artifacts MUST be reusable by reference. Downstream Agents should consume `artifact_id` / path / version rather than copying the full artifact into context.

## 6. Requirement / PRD Output Rule

When the business Task is a **requirement-definition Task**, the final business output MUST be a unified, versioned **PRD Artifact**.

Competitor Analysis, Data Analysis, User Input, and Product Decisions are supporting sources; they are not substitutes for the PRD.

The relationship is:

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

The PRD MUST integrate only validated and decision-relevant information. It MUST NOT become a dump of execution logs or every model response.

The PRD MUST retain source references for material conclusions so that each important requirement or decision can be traced back to supporting artifacts / evidence.

## 7. Decision Record

A material product or user decision MUST be represented by a Decision Record when it changes the requirement, scope, solution, priority, acceptance criteria, or other downstream behavior.

Minimum fields:

- decision_id
- project_id
- task_id
- decision
- rationale
- source references
- deciding party
- decision time
- status

A Decision Record may reference:

- User Input
- Competitor Artifact
- Data Artifact
- Project Context
- Other validated evidence

A recommendation is not a decision until the authorized decision-maker confirms it or an explicit project rule authorizes automatic acceptance.

## 8. Evidence Record

Material claims MUST retain provenance.

Evidence classes include:

- User Input
- Project Context
- Tool Result
- MCP Result
- Data
- Competitor Source
- Previous Agent Output
- Knowledge Base
- Model Inference

Fact, Finding, Hypothesis, Recommendation, and Decision MUST remain distinguishable.

## 9. Metrics and Usage Records

Metrics are recorded separately from business content so they can be aggregated without polluting the PRD or other artifacts.

### Task Metrics

- duration
- tool calls
- MCP calls
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
- Tool / MCP
- Model
- Quality outcome
- Reuse outcome

Aggregations MUST retain links back to the underlying Task / Run records.

## 10. Reuse and Supersession

Before creating a new expensive result, the system MUST check whether a valid Artifact can be reused.

A result is reusable when it is:

- relevant;
- sufficiently current;
- complete enough;
- quality-approved;
- compatible with the current Task.

If reused, the new Task MUST record the referenced `artifact_id` and should not duplicate the artifact content unnecessarily.

When a newer Artifact supersedes an older one, the relationship MUST be recorded rather than silently deleting the old result.

## 11. Human Decision and PRD Integration

For a requirement Task:

1. Product Agent receives human requirement input.
2. Product Agent detects whether Competitor / Data capabilities materially help.
3. Existing valid analysis artifacts are offered for association first.
4. If new analysis is useful and no valid result exists, the user is offered the relevant capability choices.
5. Selected capability Tasks execute independently.
6. Their Outputs become source Artifacts.
7. Product Agent combines validated findings and user decisions.
8. Material decisions are persisted as Decision Records.
9. Product Agent produces or updates one authoritative PRD Artifact for the requirement.
10. PRD references supporting artifacts instead of embedding execution logs.
11. Product Gate and Audit verify the result before handoff to Design.

## 12. Auditability

Audit must be able to navigate:

```text
PRD section / decision
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
Tool / MCP / Model Run
```

If a material PRD conclusion cannot be traced to an accepted decision or evidence source, the requirement output is not fully auditable.

## 13. Lifecycle

Records follow the lifecycle of the originating Task but must remain immutable enough to support audit history.

Updates create new versions or append traceable events; they must not silently rewrite historical execution evidence.

Business Artifacts may be revised through versioning. The latest accepted version is the active consumer-facing result.

## 14. Storage Boundary

- Execution Records → runtime / audit data
- Run Records → tool / MCP / model usage data
- Metrics → analytics / cost data
- Evidence → evidence store / references
- Output Artifacts → business document / artifact store
- Decision Records → decision log
- Knowledge-worthy conclusions → Knowledge Base
- Process lessons → Retrospective

The same source may be referenced by multiple layers, but each layer keeps its own responsibility.
