# Phase Contract V1.0

## 1. Purpose

A Phase is a project-level execution boundary. Every Phase MUST use the same core Input → Validation → Execution → Output → Gate model as its owning Process Agent.

The Phase is not a separate, weaker orchestration layer. The Process Agent defines the domain work; this Contract defines the mandatory phase lifecycle and handoff.

## 2. Core Principle

```text
Phase Input
  ↓
Input Validation
  ↓
Context / Task Assembly
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
Audit Gate
  ↓
Phase Handoff
  ↓
Next Phase Input
```

The Phase and its Process Agent MUST share the same execution contract. A Phase MUST NOT have a weaker input, execution, output, or gate standard than its Process Agent.

## 3. Phase Input

Every Phase MUST define a structured input contract containing:

- phase_id;
- project_id;
- previous_phase_id where applicable;
- previous_phase_output / required source Artifacts;
- current Task inputs;
- applicable project rules;
- required user decisions;
- relevant validated previous outputs.

The previous Phase's approved Phase Output is the default primary input to the next Phase.

A downstream Phase MUST NOT require the user to manually reconstruct information already present in the approved upstream Phase Output.

## 4. Phase Readiness

Before execution, the Phase performs a Readiness Check using the same validation principles as its Process Agent:

- completeness;
- validity;
- consistency;
- freshness;
- provenance;
- executability.

Statuses:

- `READY`
- `WAITING_FOR_INPUT`
- `USER_DECISION_REQUIRED`
- `BLOCKED`

A Phase cannot start execution when a mandatory input is unresolved.

## 5. Phase Execution

The Phase MUST use the same execution strategy contract as Process Agents:

```text
Task Classification
        ↓
Capability Detection
        ↓
Tool / MCP / Capability Agent / Model
        ↓
Execution
```

User-configured MCPs are part of the Common Capability Pool and may be selected when authorized and appropriate.

The Phase MUST record execution evidence, Tool/MCP Runs, Model Runs, Token, Cost, latency, retry, escalation, and quality data according to the Execution Record Contract.

## 6. Phase Output

Every Phase MUST produce a formal, structured Phase Output. Phase completion without Phase Output is invalid.

The Phase Output MUST contain at minimum:

- phase_id;
- phase_status;
- output_artifacts;
- key decisions;
- key findings where applicable;
- evidence references;
- quality status;
- audit status;
- downstream inputs;
- unresolved items / constraints.

The Phase Output is a business handoff artifact, not merely an execution log.

## 7. Phase Output as Next Phase Input

The approved Phase Output is the formal input boundary of the next Phase.

```text
Product Output
   ↓
Design Input

Design Output
   ↓
Planning Input

Planning Output
   ↓
Coding Input

Coding Output
   ↓
Testing Input

Testing Output
   ↓
Release Input

Release Output
   ↓
Maintenance Input
```

Each transition MUST preserve provenance and version information.

## 8. Phase Gate

Phase gates MUST be identical in principle to Process Agent gates.

A Phase MUST pass:

1. Input Quality Gate
2. Execution Quality Gate
3. Output Quality Gate
4. Evidence Quality Gate
5. Handoff Quality Gate
6. Independent Audit Gate

Standard gate outcomes:

- `PASS`
- `PARTIAL`
- `BLOCKED`
- `FAIL`

A Phase is formally complete only when its required gates pass.

## 9. Phase Handoff

After successful completion, the system creates a structured Phase Handoff:

```yaml
handoff_id:
project_id:
from_phase:
to_phase:
source_phase_output:
required_inputs:
optional_inputs:
readiness:
recommended_tasks:
next_process_agent:
```

The Handoff MUST reference the approved Phase Output rather than duplicating its content.

## 10. User Confirmation for Next Phase

Completion of a Phase does not silently start the next business Phase.

After Quality + Audit + Readiness pass, the system SHOULD proactively notify the user:

- current Phase is complete;
- Phase Output is ready;
- next Phase is ready to start;
- required inputs are satisfied;
- recommended capabilities / Tools / MCPs are available where applicable.

The user confirms whether to start the next Phase unless an explicit project rule authorizes automatic progression.

## 11. Phase / Conversation Relationship

Phase and Conversation are different concepts.

One Phase may contain multiple independent Tasks and Conversations. Phase-level Output aggregates the approved results needed for the next Phase.

```text
Phase
├── Task / Conversation A
├── Task / Conversation B
└── Task / Conversation C
        ↓
   Phase Output
```

## 12. Product → Design Example

Product Phase MUST produce a PRD as its principal business Artifact for a requirement-type project.

The PRD may integrate:

- user requirements;
- Competitor Analysis Artifacts;
- Data Analysis Artifacts;
- Product Decisions;
- business rules;
- acceptance criteria.

After Product Quality + Audit pass, the Product Phase Output becomes the primary Design Phase input.

The system then performs Design Readiness and prompts the user to start Design.

## 13. Phase Lifecycle

```text
CREATED
 ↓
INPUT_CHECK
 ↓
READY / WAITING_FOR_INPUT
 ↓
EXECUTING
 ↓
OUTPUT_VALIDATION
 ↓
QUALITY_GATE
 ↓
AUDIT_GATE
 ↓
COMPLETED
 ↓
HANDOFF_READY
 ↓
USER_CONFIRMATION
 ↓
NEXT_PHASE
```

The actual state must reflect execution; the system MUST NOT claim completion when mandatory output or gates are missing.

## 14. Relationship to Process Agent MD

Every Process Agent MD MUST define the phase-specific implementation of this Contract.

The Phase Contract supplies the common lifecycle; the Process Agent supplies domain-specific:

- inputs;
- outputs;
- tasks;
- capabilities;
- execution decisions;
- quality criteria;
- phase-specific handoff content.

No Process Agent may bypass the common Phase Contract.
