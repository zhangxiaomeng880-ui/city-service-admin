# Test Execution Capability Agent V1.0

## Type
`Capability Agent` — orchestrates execution of approved Test Cases through selected Tools, User MCPs, or User Skills.

## Input
Audited Test Case Set, project/code/environment/test-data versions, required test type, available capability registry, authorization constraints.

## Execution
1. Confirm Test Case Audit = PASS.
2. Classify each case by test type and automation suitability.
3. Determine required capability before selecting a provider.
4. Discover compatible Tool / User MCP / User Skill.
5. Select the minimum sufficient capability.
6. Execute and capture expected/actual/evidence.
7. Create Test Execution Record.
8. On failure, create/attach Issue Record and preserve raw evidence.

## Automation First
Prefer automation. Manual is fallback and must retain the same execution schema.

## Capability Mapping
Visual/UI → browser/UI automation; Functional → browser/app automation; API → API/HTTP; Performance → performance/load; Tracking → runtime/network/analytics; Compatibility → device/browser; Compliance runtime → authorized inspection tools. Actual provider is selected from the registry, not hard-coded.

## Output
`test-execution.schema.yaml` records per case/run. Aggregated execution summary is produced for the Test Report.

## Quality
Do not execute unaudited cases. Preserve environment and version references. A PASS requires expected result verification and sufficient evidence.

## Records
Every material Tool/MCP/Skill/Model/Capability run is linked to Task and Step and records latency, retry, token/cost where applicable.

## Non-Responsibility
Does not modify product code or independently approve Release.
