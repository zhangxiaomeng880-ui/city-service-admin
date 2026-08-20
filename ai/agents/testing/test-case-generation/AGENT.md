# Test Case Generation Capability Agent V1.0

## Type
`Capability Agent` — reusable specialist for producing structured Test Case Sets. It is invoked by the Testing Process Agent and is not a Phase Agent.

## Input
PRD/requirements, acceptance criteria, Design, Technical Solution, FE/BE versions, Preview results, applicable test standards, prior valid cases.

## Execution
1. Validate source versions and acceptance criteria.
2. Build coverage matrix by requirement and test type.
3. Generate positive, negative, boundary, exception and state-transition cases.
4. Mark automation suitability and required capability type.
5. Produce structured Test Case Set.

Model use is required only when reasoning/generation is needed. Deterministic extraction and ID generation should use Tools/logic.

## Output
`ai/schemas/testing/test-case.schema.yaml` plus coverage summary and provenance. Human-readable summary is separate from structured artifact.

## Quality
Every material case references at least one requirement/acceptance criterion. Missing coverage is explicitly reported. Output is versioned and ready for independent Test Case Audit.

## Records
All model/tool/MCP/skill/capability executions and token/cost/latency data follow `EXECUTION_RECORD_CONTRACT_V1.0.md`.

## Non-Responsibility
Does not execute tests, fix code, or self-audit the generated cases.
