# Engineering Phase Addendum V1.0

This addendum extends `PHASE_CONTRACT_V1.0.md` for the Technical Solution → Coding → Preview → Testing transition without creating a competing Phase contract.

## 1. Technical Solution → Coding

The Technical Solution Process Agent is the single professional execution owner for technical planning. It consumes the approved Design Phase Output and produces one versioned Technical Solution Artifact.

When both client and server work are required, the Technical Solution MUST split implementation into two independent Tasks:

- `FRONTEND_CODING_TASK`
- `BACKEND_CODING_TASK`

Both Tasks share:

- Technical Solution Artifact + version;
- API / Data Contract;
- Project Context;
- Requirement / PRD references;
- Project Version;
- approved Design Output.

They retain independent Conversation, State, Execution Record, Token / Cost, capability runs and implementation outputs.

## 2. Traceability and Versioning

Technical Solution and implementation outputs MUST link:

```text
Project
 ↓
Requirement
 ↓
PRD Version
 ↓
Design Output Version
 ↓
Technical Solution Version
 ↓
Frontend Implementation Version
Backend Implementation Version
```

Project Version is independent from Technical Solution and Code versions. Every implementation records repository, branch and commit where available.

Upstream artifact changes MUST trigger dependency / impact assessment before downstream work is considered current.

## 3. Capability Execution

Technical Solution and both Coding Agents use the same Common Capability Pool:

- Tool;
- User MCP;
- User Skill;
- Capability Agent;
- Model.

Capability selection is performed by the owning Process Agent through the Capability Registry. Phase does not select or execute capabilities directly.

Every material capability invocation MUST be linked to Task / Step / Run records and include Token / Cost / latency information when available.

## 4. Coding Output

Frontend and Backend each produce a versioned implementation output. Their outputs MUST state compatibility with the shared Technical Solution / API Contract and include evidence of their own quality checks.

## 5. Preview / R&D Self-Test

Before formal Testing, runnable implementations MUST pass the Preview / R&D Self-Test boundary where the project supports a runnable environment.

Preview is not formal Testing and is not an Audit. It is developer / R&D self-validation of the implementation actually produced.

Minimum sequence:

```text
Frontend Coding Output ─┐
Backend Coding Output ──┤
                        ↓
            Preview / R&D Self-Test
                        ↓
               Testing Readiness
                        ↓
                    Testing
```

The Preview Record links Project, Requirement, Project Version, Technical Solution Version, Frontend / Backend Implementation Versions and execution evidence.

`PASS` → eligible for Testing Readiness.

`PARTIAL` / `BLOCKED` / `FAIL` → not Testing-ready.

## 6. Preview Scope

Where applicable:

### Frontend

- build succeeds;
- preview runtime starts;
- target page / flow is reachable;
- critical interactions execute;
- runtime / console blockers are checked;
- API contract or approved Mock / Stub is compatible.

### Backend

- build / compile succeeds;
- service starts;
- required endpoints are reachable;
- critical request / response behavior works;
- runtime errors are checked;
- API / Data Contract is compatible.

### Integration

When both sides are available, execute a smoke-level integration check using the approved API / Data Contract.

## 7. Testing Boundary

Testing receives the approved Preview Self-Test Record as an input artifact in addition to the Coding Phase Output.

Testing MUST NOT interpret Preview PASS as formal Testing PASS.

The Testing Agent remains responsible for formal functional / regression / quality verification according to its own Agent Contract.
