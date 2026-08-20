# Knowledge Base Template Policy V1.0

## Conclusion

The project adopts **structured data + visual presentation** as the standard persistence pattern for reports, plans, test cases and other repeatable artifacts.

Structured data is the machine-readable source of truth; visual documents are human-readable presentation layers.

## Why

This allows the same artifact to support:

- Agent execution and downstream handoff
- Independent audit
- Human review and communication
- Version comparison
- Project data asset aggregation
- Reusable templates

## Governance

Templates are governed as reusable project assets. Any template change must be checked against its Schema, Agent MD, Capability, Audit criteria, Knowledge Base and Retrospective dependencies.

## Relation to routing

Template and artifact execution data must preserve capability/provider information so future routing can use historical workload, quality, latency, token and cost evidence rather than static assumptions.
