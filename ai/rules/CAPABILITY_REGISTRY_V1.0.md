# Capability Registry V1.0

## 1. Purpose

The Capability Registry is the common discovery contract for execution capabilities.

A Phase or Process Agent does not create a separate capability implementation. It discovers and invokes registered capabilities through the common runtime.

## 2. Capability Types

The Common Capability Pool contains five provider types:

1. `TOOL`
2. `USER_MCP`
3. `USER_SKILL`
4. `CAPABILITY_AGENT`
5. `MODEL`

These are execution capability types, not additional Process Agents.

## 3. Registry Entry

Every registered capability should define:

- capability_id
- provider_type
- name
- description
- supported_tasks
- input_schema / requirements
- output_schema
- authorization / permission scope
- availability
- owner / configuration source
- cost information when available
- latency / timeout when applicable
- quality expectations
- auditability
- version

## 4. Provider Types

### 4.1 TOOL

Deterministic built-in or project tooling.

Examples:

- SQL
- Python
- file / repository operations
- analytics query tools

### 4.2 USER_MCP

A user-configured MCP exposed to the Common Capability Pool.

Rules:

- must be authorized;
- must match the Task capability requirement;
- must follow declared schemas;
- must be auditable;
- must not be invoked merely because it is available.

### 4.3 USER_SKILL

A user-provided reusable skill / instruction package that declares domain knowledge, procedure, constraints, or execution guidance.

Rules:

- applicability must be evaluated per Task;
- the Skill must be registered / discoverable;
- it must not override System Rules, Project Rules, permissions, security boundaries, or the Agent Contract;
- material use should be recorded in the execution evidence;
- the Skill's version / source should be retained when available.

A User Skill may complement a Capability Agent, Tool, MCP, or Model. It does not automatically replace them.

### 4.4 CAPABILITY_AGENT

A registered specialist Agent providing reusable domain capability.

Current examples:

- Competitor Analysis Agent
- Data Analysis Agent

Capability Agents are reusable and independent from a specific Process Phase.

### 4.5 MODEL

A model selected for reasoning, interpretation, generation, judgment, or other model-dependent execution.

Model selection is governed by the common Model Selection Contract. Dynamic routing is a separate runtime concern.

## 5. Selection Logic

```text
Task
 ↓
Task Classification
 ↓
Capability Requirement
 ↓
Capability Registry
 ↓
Candidate Providers
 ↓
Authorization / Availability Check
 ↓
Quality / Cost / Latency Constraints
 ↓
Tool / MCP / Skill / Capability Agent / Model Selection
 ↓
Execution
```

Deterministic Tools / MCPs should be preferred for deterministic work. Capability Agents should be used for specialist analysis. Models should be used when model capability is genuinely required.

These providers may be composed in one Task.

## 6. User Choice

When an interactive requirement can be materially improved by optional capabilities, the Process Agent should present relevant capability choices to the user.

Example:

```text
可选择的能力：
- 竞品分析
- 数据分析
- 用户 Skill X
- 暂不调用
```

Existing valid results should be offered for reuse before proposing duplicate execution.

## 7. Execution Traceability

Every selected capability must be traceable to:

`Project → Phase → Task → Step → Capability Run`

For Models, retain Model Run data. For Tools / MCPs / Skills, retain applicable run / usage evidence. For Capability Agents, retain the Agent Task / Artifact references.

## 8. Capability and Phase Relationship

A Phase calls the owning Process Agent. The Process Agent uses the Capability Registry to discover supporting capabilities.

```text
Phase
 ↓
Process Agent
 ↓
Capability Registry
 ├─ Tool
 ├─ User MCP
 ├─ User Skill
 ├─ Capability Agent
 └─ Model
```

No duplicate Phase-specific capability Agent should be created merely to satisfy a Phase.

## 9. Quality / Failure

A capability candidate may be rejected when:

- unauthorized;
- unavailable;
- schema incompatible;
- outside scope;
- insufficient quality;
- excessive cost for the required outcome;
- required human approval is unavailable.

Failure must be recorded and handled through the Agent's defined fallback / escalation rules.

## 10. Registry Governance

Registry changes require:

- versioned entry updates;
- compatibility check with affected Agents / Phases;
- permission review where applicable;
- Audit criteria update when execution behavior changes.

The Registry is a discovery contract, not a license to invoke capabilities without Task-level authorization and relevance checks.
