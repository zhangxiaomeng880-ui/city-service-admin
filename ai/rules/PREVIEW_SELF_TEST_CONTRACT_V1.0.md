# Preview / R&D Self-Test Contract V1.0

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

## Scope

Preview MUST validate the implementation in a runnable environment to the extent supported by the project:

- frontend preview / runtime;
- backend runtime / API verification;
- integration smoke check when both sides are available;
- key user flows;
- critical acceptance criteria;
- obvious runtime errors;
- API / UI contract compatibility.

## Boundary

Preview does NOT replace:

- formal Testing;
- Compliance validation;
- independent Audit;
- release verification.

A Preview PASS means the implementation is suitable to hand to Testing, not that the product is formally approved.

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
- test scenario list;
- execution result;
- screenshots / logs / traces where available;
- unresolved issues.

## Gate

Statuses:

- `PASS` — runnable and required self-test scope completed;
- `PARTIAL` — some preview evidence exists but required scope remains unresolved;
- `BLOCKED` — preview cannot run because environment / dependency is unavailable;
- `FAIL` — runnable but required self-test fails.

`PASS` requires no known blocking runtime issue in the defined self-test scope.

## Frontend Gate

At minimum:

1. build succeeds;
2. preview starts;
3. primary target flow is reachable;
4. critical interactions execute;
5. console / runtime blockers are checked;
6. API calls are compatible with the Technical Solution Contract or approved Mock / Stub.

## Backend Gate

At minimum:

1. build / compile succeeds;
2. service starts;
3. required endpoints are reachable;
4. critical request / response behavior is verified;
5. runtime errors are checked;
6. API / data contract is compatible.

## Integration Gate

When both frontend and backend are available:

```text
Frontend Preview
      +
Backend Runtime
      ↓
Integration Smoke Test
```

The integration check MUST use the approved API / Data Contract.

## Output

Preview produces a versioned `Preview Self-Test Record` linked to the relevant Coding Task(s).

The record MUST include:

- project / requirement / version references;
- implementation references;
- environment;
- scenarios;
- evidence;
- result;
- known limitations;
- recommendation to proceed to Testing.

## Handoff

```text
Preview PASS
 ↓
Testing Readiness Check
 ↓
Testing Phase
```

If `PARTIAL`, `BLOCKED` or `FAIL`, the system MUST not represent the Coding work as Testing-ready.

The user may be prompted to fix, retry, or explicitly accept a documented non-blocking limitation when project rules permit.
