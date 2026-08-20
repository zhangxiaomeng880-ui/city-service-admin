# Agent Classification Knowledge V1.6

## 1. Formal Classification

AI Native Agents are divided into two categories:

### Process Agents

Responsible for lifecycle-stage execution, Phase Input, Phase Output, stage decisions, gates, and handoff.

### Capability Agents

Responsible for reusable specialist capabilities that may run independently or be invoked by Process Agents.

Current examples include:

- Competitor Analysis Agent
- Data Analysis Agent
- Test Case Generation Capability
- Test Execution Capability
- Testing Issue Management Capability
- Testing Reporting Capability

Capability Agents do not replace Process Agents. A Phase invokes reusable capabilities through the Common Capability Pool and does not create a second implementation of the same lifecycle responsibility.

## 2. Phase Principle

A Phase is owned by its Process Agent and uses the same Input / Execution / Output / Gate principles as that Agent.

The Phase does not create a second Agent implementation.

```text
Phase Input
 ↓
Process Agent
 ↓
Capability Detection
 ↓
Required Capability
 ↓
Tool / MCP / User Skill / Capability Agent / Model Selection
 ↓
Execution
 ↓
Execution Record
 ↓
Phase Output
 ↓
Quality Gate
 ↓
Independent Audit
 ↓
Phase Handoff
 ↓
Next Phase Input
```

The approved Phase Output is the formal primary input of the next Phase.

## 3. Common Capability Pool

Execution may use:

1. built-in / project Tools;
2. user-configured MCPs;
3. User Skills;
4. registered Capability Agents;
5. Models.

The selection order is capability-first, provider-second:

```text
Task / Step
 ↓
Determine whether external capability is required
 ↓
Determine required capability type
 ↓
Discover eligible capabilities
 ↓
Select provider according to capability, quality, authorization, availability and cost
 ↓
Execute
 ↓
Record
```

Agents must not invoke every available capability by default. Deterministic orchestration should remain Agent logic where no external capability is needed.

User-configured MCPs are shared capabilities available to authorized Agents according to capability, schema, permission, availability, cost, and audit requirements.

User Skills are user-provided reusable skill / instruction packages. They are discoverable capabilities but cannot override System Rules, Project Rules, permissions, security boundaries, or the Agent Contract.

## 4. Runtime Model

```text
Project → Phase → Task → Conversation → Step
→ Capability Requirement
→ Provider Selection
→ Tool / MCP / Skill / Capability / Model Run
→ Execution Record
→ Quality Gate
→ Output Artifact
→ Phase Output
→ Decision Record when applicable
→ Independent Audit
→ Phase Handoff
→ Next Phase Input
```

A Phase may contain multiple independent Tasks and Conversations that execute in parallel.

Every material capability run must retain sufficient provenance to explain what was selected, why it was selected, what was executed, what it produced, and what it consumed.

## 5. Execution Record vs Business Artifact

- **Execution Record** records how execution happened.
- **Output Artifact** records the reusable business result.
- **Phase Output** records the accepted lifecycle result and downstream input boundary.
- **Decision Record** records material authorized decisions.
- **Evidence** preserves provenance.
- **Metrics** record Token, Cost, latency, retry, escalation, workload, quality, issue and reuse data.

These layers are related by IDs but must not be collapsed into one document.

Project execution data is a durable project data asset. At minimum, material execution must be aggregatable as:

```text
Project → Phase → Task → Step → Run
```

with workload, execution, quality, issue, evidence and consumption dimensions.

## 6. Audit Replaces Default Human Review

Independent Audit is a structural quality capability, not an optional final review note.

The default review path is:

```text
Stage / Task Output
 ↓
Quality Gate
 ↓
Independent Audit Agent
 ↓
PASS → Handoff
FAIL / BLOCKED / LOW CONFIDENCE / HIGH RISK → Remediation or Human Decision
```

Audit is independent of the Agent or Capability that produced the object being audited. A producer Agent must not self-certify its own formal Audit PASS.

Human review is an escalation path for failed, blocked, high-risk, low-confidence, exceptional, or explicitly user-requested cases; it is not the default replacement for automated Audit.

This principle applies consistently to Product, Design, Technical Solution, Coding, Testing, Release and relevant Capability outputs.

## 7. Testing Phase Knowledge

Testing is a Process Phase with reusable Testing Capability Agents. The agreed Testing lifecycle is:

```text
Testing Input
 ↓
Readiness Gate
 ↓
Test Planning
 ↓
Test Case Generation
 ↓
Test Case Audit
 ↓
Test Execution
 ↓
Issue Record / Workflow
 ↓
Coding Fix
 ↓
Preview / R&D Self-Test
 ↓
Retest
 ↓
Regression
 ↓
Test Report
 ↓
Report Audit
 ↓
Testing Gate
 ↓
Release Handoff
```

Testing prioritizes automation. Manual testing is a controlled supplement when automation is unsuitable, requires human judgment, or is explicitly required.

Testing scope includes, as applicable:

- Visual
- Functional
- API / Interface
- Performance
- Boundary / Edge
- Data Tracking / Analytics Reporting
- Compatibility
- Runtime Compliance

Test Case Audit must occur before formal Test Execution. Report Audit must occur before Testing Gate / Release Handoff.

Retest and Regression reuse Test Execution Capability rather than creating duplicate Agents.

Testing must retain structured assets for Test Case, Test Case Audit, Test Execution, Issue, Retest, Regression, Test Report and Testing Phase Output.

Testing execution records must capture applicable Project / Phase / Task / Step / Conversation references, environment and version information, capability requirement, provider selection, Tool / MCP / Skill / Capability / Model runs, input/output, duration, retry, human intervention, rework, token, cost, evidence and result.

Testing is also a project data-asset producer. Workload, test coverage, execution counts, issue counts, severity, resolution, reopen rate, retest/regression outcomes, automation ratio, human intervention, token and cost are retained for project-level analysis.

## 8. Product Interaction

Human requirements may associate existing competitor / KPI analysis results or invoke new capability Tasks.

When relevant capabilities exist, Product should inform the user and let the user choose. Existing valid results should be reused before new execution.

A requirement-definition Task must eventually produce one authoritative, versioned PRD Artifact. Competitor Analysis, Data Analysis, User Input, User Skill results, and Product Decisions are supporting sources integrated into the PRD rather than substitutes for it.

The Product Phase Output contains the accepted PRD and downstream-required decisions, evidence, constraints, and unresolved items. It becomes the Design Phase's formal primary input.

## 9. Requirement Traceability

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

## 10. Phase Handoff

After Phase Quality + independent Audit + next-Phase Readiness pass, the system should proactively notify the user that the next Phase is ready.

The next business Phase starts after user confirmation unless an explicit Project Rule authorizes automatic progression.

## 11. Model Routing

Model Router is a global capability. It selects a model that satisfies capability and quality constraints while considering cost efficiency.

Every Model Run records model, version, input/output/cache/total tokens, cost, latency, retry, escalation, quality result, and selection rationale where available.

Detailed Dynamic Model Routing remains a separate design topic.

## 12. Data Analysis Principle

Data Analysis follows Tool First: deterministic calculations should use SQL, Python, analytics tools, or compatible MCPs. LLMs are primarily used for interpretation, diagnosis, and recommendations.

## 13. Auditability

Task, Step, Capability Requirement, Provider Selection, Tool Run, MCP Run, Skill Usage, Capability Task, Model Run, Execution Record, Output Artifact, Phase Output, Decision Record, Quality Gate, Audit Record, and Evidence must be traceable so Audit can independently inspect execution quality, business-result provenance, phase handoff integrity, and cost efficiency.

Missing critical evidence blocks a formal Audit PASS.

## 14. Contract Synchronization Rule

When a phase or capability is materially changed, the change must be checked across the dependent asset set. A complete update is not considered finished if only an Agent MD changes.

At minimum, the affected:

- Agent MD
- Capability definition / Registry
- Structured schemas
- Execution Record contract
- Phase Contract
- Audit criteria
- Knowledge Base
- Retrospective / decision record

must be reviewed for consistency. This prevents process rules from diverging from executable assets.

## Contract References

- `ai/rules/AGENT_MD_CONTRACT_V1.0.md`
- `ai/rules/PHASE_CONTRACT_V1.0.md`
- `ai/rules/EXECUTION_RECORD_CONTRACT_V1.0.md`
- `ai/rules/CAPABILITY_REGISTRY_V1.0.md`
- `ai/agents/audit/AGENT.md`
- `ai/audit/TESTING_ASSET_AUDIT_V1.0.md`
