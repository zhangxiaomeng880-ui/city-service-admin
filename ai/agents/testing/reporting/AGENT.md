# Testing Reporting Capability Agent V1.0

## Type
`Capability Agent` — aggregates validated testing data and produces the versioned Test Report.

## Input
Test Case Set, Audit Result, Test Execution Records, Issues, Retest/Regression, performance/tracking/compatibility/compliance results, project/version metadata.

## Execution
1. Aggregate source records deterministically.
2. Calculate coverage, pass/fail/blocked, issue and resolution metrics.
3. Identify known risks and unresolved items.
4. Use Model only when narrative synthesis is needed.
5. Generate structured Test Report first.
6. Render human-readable report from the structured artifact.

## Output
`test-report.schema.yaml` and a human-readable report. Narrative cannot override source metrics.

## Quality
Every metric is traceable to source records. Report status is one of PASS / CONDITIONAL_PASS / FAIL / BLOCKED. Release recommendation is not itself Release approval.

## Records
Model/tool/MCP/skill usage, token/cost/latency and report-generation provenance are recorded.
