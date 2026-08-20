# Retrospective: Structured + Visual Artifact Template Standard V1.0

## Context

The project previously treated reports, plans and test cases primarily as readable documents. The agreed improvement is to make structured data the source of truth and visual documents the presentation layer.

## Decision

Adopt:

```text
Structured Data
 → Schema
 → Audit / Validation
 → Visual Presentation
 → Artifact / Project Data Asset
```

## Impact

This improves:

1. Machine readability and downstream Agent execution.
2. Human readability through tables, status views and charts.
3. Traceability between input, execution, output and evidence.
4. Consistent versioning and reuse of templates.
5. Future capability/provider routing using actual historical execution data.

## Governance lesson

A template is not merely formatting. It is a contract for the data that must be produced, audited and handed off. Therefore template changes require dependency checks across Schema, Agent MD, Capability, Audit, Knowledge Base and Retrospective.

## Freeze rule

The structured-first and visual-presentation policy is the current baseline. Future changes should be versioned and audited rather than introduced as ad-hoc document formatting.
