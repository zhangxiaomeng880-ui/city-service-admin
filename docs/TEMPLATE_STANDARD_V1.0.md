# Template Standard V1.0

## 1. Purpose

Reports, plans, test cases and similar project deliverables use a unified **structured data + visual presentation** pattern.

The template is a reusable project asset, not a one-off document format.

## 2. Core principle

```text
Structured Data
    ↓
Standard Schema
    ↓
Validation / Audit
    ↓
Visual Presentation
    ↓
Human-readable Artifact
    ↓
Project Data Asset
```

The structured representation is the source of truth. Markdown, HTML, PDF, dashboard or other visual formats are presentation layers derived from the structured data.

## 3. Applicable artifacts

- Reports
- Plans
- Test cases
- Test execution summaries
- Test reports
- Audit reports
- Technical方案 / design records where structured output is applicable
- Other reusable project deliverables

## 4. Required structure

Every applicable template should define:

1. Identity: project, requirement, phase, task and version references.
2. Input: source artifacts and required context.
3. Execution: actions, capability calls and decisions.
4. Output: structured result with explicit status.
5. Evidence: links/references to execution evidence.
6. Metrics: workload, execution count, duration, token, cost and quality metrics where applicable.
7. Audit: independent audit result and gate status where applicable.
8. Handoff: downstream artifact/version reference.

## 5. Structured-first rule

- Do not make prose the only source of truth when the artifact contains repeatable structured data.
- Schemas must be versioned.
- Visual documents must be generated from or remain consistent with the structured source.
- Changes to a schema require checking dependent Agent MD, Capability definitions, Audit criteria and Knowledge Base references.

## 6. Capability and execution trace

Where generation, analysis, external operation or automation is required, the artifact must preserve the relevant execution trace:

- Capability type
- Tool
- MCP
- User Skill
- Capability Agent
- Model
- Selection reason when applicable
- Execution ID
- Token consumption
- Cost
- Duration
- Retry / rework
- Human intervention
- Result

## 7. Test case standard

A test case should be stored structurally with at least:

- Test Case ID
- Project / Requirement / Version
- Test type
- Priority
- Preconditions
- Steps
- Expected result
- Test data
- Acceptance criteria references
- Automation support / method
- Status
- Version

## 8. Test report standard

A test report should be structurally backed by:

- Scope
- Test case counts and coverage
- Execution counts
- Automated/manual split
- Pass/fail/blocked/skipped
- Issue counts and severity
- Resolution status
- Retest and regression results
- Performance / tracking / compatibility / compliance results where applicable
- Workload
- Token / cost
- Known risks
- Release recommendation
- Evidence
- Report version

## 9. Visual presentation rule

Visual presentation should optimize human readability without changing the underlying data. It may include tables, status summaries, charts, timelines and other appropriate views.

The visual artifact must preserve:

- source/version identity
- status
- key metrics
- risks
- decisions
- audit conclusion

## 10. Governance

Template assets are part of the project knowledge base and must be versioned in Git.

When a template changes, perform an impact check across:

```text
Template
 → Schema
 → Agent MD
 → Capability
 → Audit
 → Knowledge Base
 → Retrospective
```

This standard is intended to make artifacts both machine-executable and human-readable while preserving complete project traceability.
