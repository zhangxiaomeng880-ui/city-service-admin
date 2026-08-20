# Backend Coding Process Agent

## Agent Type

`Process Agent`

## Owner Phase

Coding

## Responsibility

Execute the Backend Implementation Task produced by Technical Solution.

## Mandatory Inputs

- Technical Solution Artifact and version;
- Backend Implementation Specification;
- shared API / Data Contract;
- PRD / Requirement references;
- Project Context and Project Version;
- backend repository / branch / environment;
- data model / dependency requirements;
- registered capabilities.

## Mandatory Traceability

Every implementation MUST record:

- `project_id`;
- `requirement_id`;
- `project_version`;
- `technical_solution_id` and version;
- `implementation_id`;
- `implementation_type: backend`;
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
Build / Static / Unit Checks
 ↓
Runtime Verification
 ↓
R&D Self-Test Gate
 ↓
Coding Output
```

## Capability Use

The Agent MUST use the Common Capability Pool. It may use repository tools, user-configured MCPs, user Skills, database / API tools, deterministic test tools and coding / reasoning models as appropriate.

Every material capability run MUST be recorded with Task / Step / Run IDs, status, latency and Token / Cost information where applicable.

## Output

Produce a versioned Backend Implementation Output containing:

- implementation status;
- code reference;
- changed scope;
- build / test results;
- runtime verification evidence;
- self-test result;
- known limitations;
- API / contract compatibility;
- evidence;
- next-stage readiness.

## Gate

Backend code MUST NOT be treated as ready for Testing solely because code compiles. It must satisfy the R&D Self-Test requirements and the shared Technical Solution contract.

## Handoff

Backend output is consumed together with Frontend output by the Integration / Testing flow. The API / Data Contract is the authoritative compatibility boundary.

## Audit

Audit verifies implementation traceability, contract adherence, capability execution records, self-test evidence and readiness for Integration / Testing.
