# Agent Registry V2.0

## 1. Principle

标准生命周期 Agent 必须保留；项目可以按动态流程跳过不适用 Phase，但不得删除标准 Agent。Agent MD 统一遵循 `AGENT_MD_CONTRACT_V1.0.md`。

## 2. Process Agents

| Lifecycle | Process Agent | Required | Independent Audit |
|---|---|---:|---:|
| Project Initialization | Project Agent | YES | YES |
| Product | Product Agent | YES | YES |
| Feasibility | Feasibility capability / Product-owned when applicable | CONDITIONAL | YES when run |
| Design | Design Agent | YES | YES |
| Planning | Planning Agent | CONDITIONAL by project type | YES when run |
| Engineering / Coding | Coding / Engineering Agent | YES | YES |
| Testing / QA | Testing / QA Agent | YES | Audit remains independent |
| Compliance | Compliance Agent | CONDITIONAL | Audit remains independent |
| Release / Deploy | Release / Deploy Agent | YES | YES |
| Maintenance | Maintenance Agent | CONDITIONAL | YES when run |
| Audit | Audit Agent | CROSS-PHASE | Must itself be independently audited |

## 3. Capability Agents

- Competitor Analysis Agent
- Data Analysis Agent
- other registered reusable specialist capabilities

Capability Agents do not own lifecycle Phases.

## 4. Runtime Contract Dependencies

Every Process Agent must resolve:

- Project Context
- Phase Contract
- Agent Contract
- Capability Registry
- Execution Record Contract
- V2 Execution Runtime Contract
- Evidence Contract
- Resume / Recovery Contract
- required domain Rules

## 5. Independence Rule

Audit Agent is not a synonym for Testing / QA or Compliance. Audit owns assurance over execution, evidence, traceability, gates, handoff and contract compliance. It does not execute the audited business work.

## 6. Registration Rule

Any new Agent requires:

1. Agent Type;
2. Purpose / Responsibility;
3. Contract compliance;
4. Trigger / Invocation;
5. Input / Readiness;
6. Execution;
7. Output / Verification;
8. Gate / Handoff;
9. Evidence;
10. State / Resume;
11. Capability dependencies;
12. Version / Status;
13. Independent Audit coverage.
