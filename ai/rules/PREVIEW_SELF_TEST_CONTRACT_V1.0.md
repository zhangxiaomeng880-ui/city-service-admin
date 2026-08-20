# Preview / R&D Self-Test Contract V1.1

## Purpose

Preview is the mandatory validation boundary between Coding and formal Testing for implementations that can be run or previewed.

It is a **R&D self-test**, not the formal Testing phase and not an Audit.

## Position in Lifecycle

```text
Technical Solution
 ↓
Frontend Coding Task ─┐
Backend Coding Task ──┤
                      ↓
              R&D Preview / Self-Test
                      ↓
               Integration Check
                      ↓
                  Testing
```

## Input

Preview consumes the versioned outputs of upstream phases and implementation tasks:

- project and project version;
- requirement;
- PRD and version;
- Design Output and version;
- Technical Solution and version;
- approved API / Data Contract;
- Frontend implementation and version;
- Backend implementation and version;
- preview environment configuration;
- available Tool / User MCP / User Skill / Capability Agent / Model capabilities.

## Scope

Preview MUST validate the implementation in a runnable environment to the extent supported by the project:

- frontend preview / runtime;
- backend runtime / API verification;
- automatic Mock / Fixture validation when real dependencies are unavailable;
- automated API self-test;
- frontend / backend integration smoke check when both sides are available;
- key user flows;
- critical acceptance criteria;
- obvious runtime errors;
- API / UI contract compatibility.

## Mock / Fixture Contract

When real backend services, data or external dependencies are unavailable, Preview MUST support compliant Mock / Fixture execution.

Rules:

1. Mock / Fixture data MUST follow the approved API / Data Contract.
2. Field names, types, requiredness, validation and status semantics MUST NOT be invented arbitrarily.
3. Mock mode MUST be explicitly marked `MOCK_MODE`.
4. Mock success MUST NOT be reported as real backend success.
5. Mock generation and execution MUST be recorded as execution activity and linked to the relevant task/run.
6. When the real dependency becomes available, the relevant integration check MUST be performed before claiming real integration readiness.

## Automated API Self-Test

Where API endpoints are available, Preview MUST automatically verify as applicable:

- reachability;
- request parameters;
- response schema;
- HTTP status;
- required fields;
- data types;
- normal cases;
- error cases;
- boundary cases.

Each API self-test produces an `API Self-Test Record` containing:

- API / endpoint;
- request;
- expected result;
- actual result;
- status;
- evidence;
- implementation / contract version.

## Frontend Gate

At minimum:

1. build succeeds;
2. preview starts;
3. primary target flow is reachable;
4. critical interactions execute;
5. console / runtime blockers are checked;
6. API calls are compatible with the Technical Solution Contract or approved Mock / Fixture;
7. critical UI states are validated.

## Backend Gate

At minimum:

1. build / compile succeeds;
2. service starts;
3. required endpoints are reachable;
4. automated API self-test executes;
5. critical request / response behavior is verified;
6. runtime errors are checked;
7. API / data contract is compatible.

## Integration Gate

When both frontend and backend are available:

```text
Frontend Preview
      +
Backend Runtime
      ↓
Integration Smoke Test
      ↓
Core Flow Self-Test
```

The integration check MUST use the approved API / Data Contract.

If backend is unavailable, frontend may run against compliant Mock / Fixture mode, but the result MUST remain explicitly classified as mock validation.

## Core Business Flow Self-Test

Preview MUST execute the critical user / business flow defined by Requirement, PRD, Design and Acceptance Criteria, including where applicable:

- page entry;
- user interaction;
- API invocation;
- response handling;
- UI state transition;
- continuation actions;
- successful completion of the core flow.

## Capability Execution

Preview uses the unified Capability Pool and MUST NOT create a separate execution system.

Available capability types include:

- Tool;
- User MCP;
- User Skill;
- Capability Agent;
- Model.

Capability selection and execution follow the common Agent / Phase Contract. Model selection is not hard-coded into Preview.

All capability calls MUST produce Execution Records where applicable, including capability identity, result, token / cost where measurable, retry, failure and escalation information.

## Required Evidence

Where applicable record:

- preview environment;
- URL / runtime reference;
- build identifier;
- frontend code version;
- backend code version;
- technical solution version;
- project version;
- requirement / PRD reference;
- Mock / real execution mode;
- API self-test scenarios and results;
- integration scenarios and results;
- core-flow scenarios and results;
- screenshots / logs / traces where available;
- unresolved issues.

## Gate

Statuses:

- `PASS` — runnable and required self-test scope completed;
- `PARTIAL` — some preview evidence exists but required scope remains unresolved;
- `BLOCKED` — preview cannot run because environment / dependency is unavailable;
- `FAIL` — runnable but required self-test fails.

`PASS` requires no known blocking runtime issue in the defined self-test scope and sufficient evidence for the required scope.

Preview PASS does NOT mean Testing PASS or Audit PASS.

## Output

Preview produces a versioned `Preview Self-Test Record` and a structured `Preview Output` linked to the relevant Coding Task(s).

The output MUST include:

- project / requirement / version references;
- upstream Design / Technical Solution references;
- frontend / backend implementation references;
- environment;
- Mock / real mode;
- API self-test summary;
- frontend self-test summary;
- backend self-test summary;
- integration smoke-test summary;
- core-flow summary;
- evidence;
- known limitations;
- readiness status;
- recommendation to proceed to Testing.

## Handoff

```text
Preview PASS
 ↓
Testing Readiness Check
 ↓
Testing Phase
```

`Preview Output` becomes formal input to the Testing Phase.

If `PARTIAL`, `BLOCKED` or `FAIL`, the system MUST not represent the Coding work as Testing-ready.

The user may be prompted to fix, retry, or explicitly accept a documented non-blocking limitation when project rules permit.

## Boundary

Preview does NOT replace:

- formal Testing;
- Compliance validation;
- independent Audit;
- release verification.
