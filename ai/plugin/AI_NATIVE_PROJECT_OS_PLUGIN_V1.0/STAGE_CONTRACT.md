# Universal Stage Contract V1.0

Every Stage Agent is a persistent capability. Project execution status is separate from Agent existence.

## Required sections

1. Purpose / Mission
2. Version
3. Input
4. Input Readiness
5. Input Verification
6. Execution
7. Output
8. Output Verification
9. Gate
10. Handoff
11. Environment Dependency
12. Version Dependency
13. Status
14. Resume Rule

## Execution behavior

### Input phase

The plugin loads the Agent MD, project manifest, upstream outputs, current stage status and relevant knowledge. It reports missing, warning and valid inputs.

### Gate

- PASS: proceed automatically.
- PASS WITH WARNING: record warning and proceed when non-blocking.
- BLOCKED: stop and request only the missing decision/input.
- SKIPPED: keep Agent available, record skip reason and re-entry condition.

### Execution phase

The plugin follows the Agent MD and records decisions, evidence, gaps, deviations and artifacts. It must not silently redefine upstream decisions.

### Output phase

The plugin produces declared artifacts, verifies them, records version/address/provenance where applicable, then performs Handoff.

### Human intervention

Ask the user only when the contract cannot be satisfied automatically: missing required information, unresolved conflict, Human Gate, or high-risk irreversible action.

## Completion rule

A stage is COMPLETED only when Input is valid, Gate passes, required outputs exist, Output Verification passes and Handoff is complete.
