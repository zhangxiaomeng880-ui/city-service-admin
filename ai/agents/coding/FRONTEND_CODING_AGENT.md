# Frontend Coding Process Agent

## Agent Type

`Process Agent`

## Owner Phase

Coding

## Responsibility

Execute the Frontend Implementation Task produced by Technical Solution.

## Mandatory Inputs

- Technical Solution Artifact and version;
- Frontend Implementation Specification;
- shared API / Data Contract;
- approved Design Phase Output;
- PRD / Requirement references;
- Project Context and Project Version;
- frontend repository / branch / environment;
- applicable Design Resource Library references;
- registered capabilities.

## Mandatory Traceability

Every implementation MUST record:

- `project_id`;
- `requirement_id`;
- `project_version`;
- `technical_solution_id` and version;
- `implementation_id`;
- `implementation_type: frontend`;
- code / release version;
- repository;
- branch;
- commit / immutable source reference where available.

## Execution

```text
Input Validation
 ↓
Task Classification
 ↓
Capability Detection
 ↓
Tool / User MCP / User Skill / Capability Agent / Model Selection
 ↓
Implementation
 ↓
Static / Local Checks
 ↓
Preview Build / Runtime
 ↓
R&D Self-Test Gate
 ↓
Coding Output
```

## Capability Use

The Agent MUST use the Common Capability Pool rather than inventing private tools. Examples include repository tools, Figma MCP, user-configured MCPs, user Skills, deterministic build / test tools and coding models.

Every material capability run MUST be recorded with Task / Step / Run IDs, status, latency and Token / Cost information where applicable.

## Output

Produce a versioned Frontend Implementation Output containing:

- implementation status;
- code reference;
- changed scope;
- build / static check results;
- preview URL or preview runtime reference when available;
- self-test result;
- known limitations;
- evidence;
- next-stage readiness.

## Gate

The Frontend Coding Task MUST NOT be treated as ready for Testing solely because code compiles. It must pass the R&D Preview / Self-Test Gate defined by `PREVIEW_SELF_TEST_CONTRACT_V1.0.md`.

## Handoff

Frontend output is consumed together with Backend output by the Integration / Testing flow. A missing backend may be temporarily represented by an approved Mock / Stub only when the Technical Solution defines the contract.

## Audit

Audit verifies implementation traceability, contract adherence, capability execution records, preview evidence and self-test results.
