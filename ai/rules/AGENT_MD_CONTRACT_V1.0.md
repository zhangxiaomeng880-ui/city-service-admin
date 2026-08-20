# AGENT MD Contract V1.0

## 1. Purpose

This is the mandatory common contract for every Agent MD.

It defines how an Agent must receive input, assemble context, classify tasks, detect reusable capabilities, select tools/models, execute, involve humans, produce output, hand off, record cost, and pass Audit.

Agent-specific MDs define **what the Agent does**. This Contract defines **how every Agent must do it**.

No Agent may invent a separate execution pattern that conflicts with this Contract.

## 2. Mandatory Agent MD Structure

Every Agent MD must contain, at minimum:

1. Agent Type
2. Responsibility
3. Non-Responsibility
4. Trigger
5. Input
6. Input Validation
7. Context Assembly
8. Task Classification
9. Capability Detection
10. Tool Selection
11. Model Selection
12. Execution
13. Human-in-the-Loop
14. Output
15. Evidence
16. Quality Gate
17. Handoff
18. State
19. Parallel Task
20. Reuse
21. Token & Cost
22. Audit
23. Knowledge Handoff

## 3. Agent Definition Contract

Each Agent must explicitly define:

- Agent Name
- Agent Type: `Process` or `Capability`
- Responsibility
- Non-Responsibility
- Trigger
- Owner Phase when Process Agent
- Invocation rules when Capability Agent
- Dependencies
- Output Consumers

`Non-Responsibility` is mandatory to prevent Agent scope creep and unauthorized decisions.

## 4. Input Contract

Inputs are separated into:

### 4.1 System Context

- Project ID
- Project Context
- Current Phase
- Current Version
- Agent Version
- Knowledge Base
- Rules
- Previous valid outputs

Existing System Context must not be requested from the user again.

### 4.2 Task Input

- Task ID
- Task Type
- Task Goal
- Task Description
- Priority
- Trigger Source
- Related Task
- Deadline when applicable

### 4.3 User Input

User input is requested only when System Context and Task Input cannot safely satisfy the task.

Distinguish:

- Required Input
- Optional Input
- Decision Input
- Confirmation Input
- Approval Input

The Agent must name the missing information and explain why it is required.

### 4.4 Previous Output

Reusable outputs must record:

- Source Task
- Source Agent
- Output Version
- Generated Time
- Validity

## 5. Input Validation Contract

Before execution, check:

1. Completeness
2. Validity
3. Cross-source consistency
4. Timeliness
5. Source reliability
6. Executability

If information is missing:

- safely inferable → continue;
- requires user choice → `USER_DECISION_REQUIRED`;
- critical required input missing → `WAITING_FOR_INPUT`.

Critical business facts must never be guessed.

## 6. Context Assembly Contract

Build a Task Context before model execution:

`System Context + Project Context + Phase Context + Task Input + Relevant Previous Outputs + Relevant Knowledge + User Decision`

Context must be deduplicated and trimmed to task relevance.

Priority order:

`System Rule > Project Rule > Current Task > User Decision > Validated Previous Output > Historical Knowledge > Inference`

## 7. Task Classification Contract

Every Task must be classified as one or more of:

- Information Retrieval
- Information Organization
- Analysis / Judgment
- Decision Support
- Content Generation
- Action / Execution
- Verification / Audit

Task classification informs tool choice, model choice, and Quality Gate.

## 8. Capability Detection Contract

Before execution, the Agent must determine whether specialist Capability Agents can improve the result.

For human-facing flows:

1. If a valid reusable capability result exists, offer association/reuse.
2. If no valid result exists but a capability would materially help, explicitly tell the user which capability is available.
3. The user may select one capability, multiple capabilities, existing results, or skip.
4. Capability invocation is not mandatory unless a higher-level Project Rule explicitly makes it required.
5. Existing valid results must be preferred over duplicate execution.

Current specialist capabilities include Competitor Analysis and Data Analysis.

## 9. Tool Selection Contract

Prefer deterministic tools for deterministic work.

Default priority:

`Deterministic Tool → Capability Agent → LLM`

Examples:

- SQL / Python / Analytics Tool for deterministic data calculation;
- Competitor Analysis Agent for competitor intelligence;
- Data Analysis Agent for KPI analysis and diagnosis;
- LLM for interpretation, reasoning, generation, and judgment where appropriate.

## 10. Model Selection Contract

Every model execution must be attributable to a selection decision.

Record:

- Model
- Model Version
- Selection Reason
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Estimated Cost
- Actual Cost when available
- Latency
- Retry Count
- Escalation
- Quality Result

The exact Dynamic Model Routing algorithm is defined separately and must not be duplicated inside individual Agent MDs.

## 11. Execution Contract

Every Task must be decomposable into auditable Steps.

Minimum execution chain:

`Task → Input Validation → Context Assembly → Capability Detection → Tool / Model Selection → Execution → Quality Check → Output`

The Agent must preserve execution evidence.

## 12. Human-in-the-Loop Contract

User intervention uses standardized states:

- `WAITING_FOR_INPUT`
- `USER_DECISION_REQUIRED`
- `USER_CONFIRMATION_REQUIRED`
- `USER_APPROVAL_REQUIRED`

User prompts must state what decision or information is needed and the available options when options are known.

## 13. Output Contract

Every Agent produces two layers.

### 13.1 Structured Output

Minimum fields:

- task_id
- status
- input_summary
- execution
- findings
- evidence
- decision
- recommendations
- quality
- confidence
- handoff

### 13.2 Human-Readable Output

Default order:

`Conclusion → Key Findings → Evidence → Analysis → Recommendation → Next Step`

Internal traces or raw JSON must not be presented as the primary user-facing result.

## 14. Evidence Contract

Important conclusions must identify their evidence source.

Evidence types include:

- User Input
- Project Context
- Tool Result
- Data
- Competitor Source
- Previous Agent Output
- Knowledge Base
- Model Inference

Distinguish explicitly:

- Fact
- Finding
- Hypothesis
- Recommendation

Hypothesis must not be presented as fact.

## 15. Quality Gate Contract

Every Agent defines Quality Gates for:

- Input Quality
- Execution Quality
- Output Quality
- Evidence Quality
- Handoff Quality

Standard results:

- `PASS`
- `PARTIAL`
- `BLOCKED`
- `FAIL`

## 16. Handoff Contract

Every completed Task must identify:

- Output
- Consumer Agent / Phase
- Intended use
- Whether downstream can consume directly
- Whether human confirmation is required

## 17. State Contract

Standard lifecycle:

`CREATED → INPUT_CHECK → [WAITING_FOR_INPUT / USER_DECISION_REQUIRED] → EXECUTING → QUALITY_REVIEW → COMPLETED`

Exceptional states:

`PARTIAL / BLOCKED / FAILED / SKIPPED`

## 18. Parallel Task Contract

One Phase may contain multiple independent Tasks and Conversations.

Each independent Task must have:

- independent Task ID;
- independent Conversation;
- independent execution state;
- independent Token / Cost record;
- independent Model Run record.

Tasks communicate through Project Context, Knowledge Base, and structured outputs.

A Phase must not be treated as one mandatory Conversation.

## 19. Reuse Contract

Before starting a new expensive execution, check whether a valid result already exists.

Reuse when the result is:

- available;
- still valid;
- sufficiently scoped;
- quality-acceptable.

Re-execution is justified only when the result is missing, stale, insufficient, or quality-deficient.

## 20. Token & Cost Contract

Cost must be traceable at:

`Project → Phase → Task → Step → Model Run`

Task cost should account for:

`Tool Cost + Model Cost + Retry Cost + Escalation Cost`

This evidence is required for future model-routing optimization and Audit.

## 21. Audit Contract

Every Agent MD must be auditable.

Audit checks:

### Architecture

- Correct Agent category
- Clear responsibility boundary
- No unauthorized scope

### Input

- Required inputs defined
- Existing context reused
- Input validation present

### Execution

- Common execution chain followed
- Correct Tool / Capability / Model use
- Execution evidence retained

### Output

- Structured output complete
- Human-readable output usable
- Evidence traceable
- Handoff explicit

### Cost

- Model Run recorded
- Token recorded
- Cost recorded
- Retry / escalation recorded

### State

- State transitions comply with the standard contract

### Independence

- Agent does not self-certify independent Audit
- Audit remains independent from the Agent being audited

Final Audit result:

`AUDIT_PASS / AUDIT_PARTIAL / AUDIT_FAIL`

Only `AUDIT_PASS` is eligible for formal acceptance.

## 22. Knowledge Contract

After completion, classify knowledge:

- One-time result → archive only
- Reusable long-term rule → Knowledge Base
- Execution/process rule → AGENT / Rules
- Learning from failure or change → Retrospective

Do not place every execution result into permanent knowledge.

## 23. Compliance Rule

When an existing Agent MD conflicts with this Contract, this Contract wins unless an explicitly versioned higher-level rule supersedes it.

Any exception must be documented and audited.

## 24. Versioning Rule

Changes to this Contract require synchronized review of:

1. Agent Architecture
2. Agent MDs
3. Rules
4. Knowledge Base
5. Retrospective
6. Audit criteria

A Contract update is not complete until dependent Agent MDs have been checked for compliance.
