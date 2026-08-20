# Agent Classification Knowledge V1.5

## Formal Classification

AI Native Agents are divided into two categories:

### Process Agents

Responsible for lifecycle-stage execution, Phase Input, Phase Output, stage decisions, gates, and handoff.

### Capability Agents

Responsible for reusable specialist capabilities that may run independently or be invoked by Process Agents.

Current examples:

- Competitor Analysis Agent
- Data Analysis Agent

## Phase Principle

A Phase is owned by its Process Agent and uses the same Input / Execution / Output / Gate principles as that Agent.

The Phase does not create a second Agent implementation.

```text
Phase Input
 ↓
Process Agent
 ↓
Capability Detection
 ↓
Tool / MCP / User Skill / Capability Agent / Model
 ↓
Execution
 ↓
Phase Output
 ↓
Quality + Independent Audit
 ↓
Phase Handoff
 ↓
Next Phase Input
```

The approved Phase Output is the formal primary input of the next Phase.

## Common Capability Pool

Execution may use:

1. built-in / project Tools;
2. user-configured MCPs;
3. User Skills;
4. registered Capability Agents;
5. Models.

User-configured MCPs are shared capabilities available to authorized Agents according to capability, schema, permission, availability, cost, and audit requirements.

User Skills are user-provided reusable skill / instruction packages. They are discoverable capabilities but cannot override System Rules, Project Rules, permissions, security boundaries, or the Agent Contract.

Agents must not invoke every available capability by default.

## Runtime Model

```text
Project → Phase → Task → Conversation → Step
→ Tool / MCP / Skill / Capability / Model Run
→ Execution Record
→ Quality Gate
→ Output Artifact
→ Phase Output
→ Decision Record when applicable
→ Phase Handoff
→ Next Phase Input
```

A Phase may contain multiple independent Tasks and Conversations that execute in parallel.

## Execution Record vs Business Artifact

- **Execution Record** records how execution happened.
- **Output Artifact** records the reusable business result.
- **Phase Output** records the accepted lifecycle result and downstream input boundary.
- **Decision Record** records material authorized decisions.
- **Evidence** preserves provenance.
- **Metrics** record Token, Cost, latency, retry, escalation, quality, and reuse data.

These layers are related by IDs but must not be collapsed into one document.

## Product Interaction

Human requirements may associate existing competitor / KPI analysis results or invoke new capability Tasks.

When relevant capabilities exist, Product should inform the user and let the user choose. Existing valid results should be reused before new execution.

A requirement-definition Task must eventually produce one authoritative, versioned PRD Artifact. Competitor Analysis, Data Analysis, User Input, User Skill results, and Product Decisions are supporting sources integrated into the PRD rather than substitutes for it.

The Product Phase Output contains the accepted PRD and downstream-required decisions, evidence, constraints, and unresolved items. It becomes the Design Phase's formal primary input.

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
 ↓
Product Phase Output
 ↓
Design Input
```

Material conclusions remain traceable to Decision Records, supporting Artifacts, Evidence, Tasks, Steps, and relevant Tool / MCP / Skill / Model Runs.

## Phase Handoff

After Phase Quality + independent Audit + next-Phase Readiness pass, the system should proactively notify the user that the next Phase is ready.

The next business Phase starts after user confirmation unless an explicit Project Rule authorizes automatic progression.

## Model Routing

Model Router is a global capability. It selects the lowest-cost model that satisfies capability and quality constraints.

Every Model Run records model, version, input/output/cache/total tokens, cost, latency, retry, escalation, quality result, and selection rationale where available.

Detailed Dynamic Model Routing remains a separate design topic.

## Data Analysis Principle

Data Analysis follows Tool First: deterministic calculations should use SQL, Python, analytics tools, or compatible MCPs. LLMs are primarily used for interpretation, diagnosis, and recommendations.

## Auditability

Task, Step, Tool Run, MCP Run, Skill Usage, Capability Task, Model Run, Execution Record, Output Artifact, Phase Output, Decision Record, Quality Gate, and Evidence must be traceable so Audit can independently inspect execution quality, business-result provenance, phase handoff integrity, and cost efficiency.

Missing critical evidence blocks a formal Audit PASS.

## Contract References

- `ai/rules/AGENT_MD_CONTRACT_V1.0.md`
- `ai/rules/PHASE_CONTRACT_V1.0.md`
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md`
- `ai/rules/CAPABILITY_REGISTRY_V1.0.md`
- `ai/agents/audit/AGENT.md`
