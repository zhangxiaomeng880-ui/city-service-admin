# AI Native Product Workflow v0.2

## 1. Core principle

Tools and MCPs are supporting capabilities, not workflow stages. The workflow must remain executable even when optional tools are unavailable. A missing tool only blocks the stage that explicitly depends on it.

Human responsibilities: goals, scope, priority, business judgment, risk acceptance, and stage approval.
AI responsibilities: research, analysis, drafting, execution, validation, traceability, and iteration support.

## 2. Lifecycle

Project Init → Capability Check → Scope Gate → Research → Product → KPI & Measurement → Experiment Strategy → UX → UI → Design-Code Contract → Figma High-Fidelity (optional) → Engineering → QA → Release Gate → Release → Analytics → Experiment Analysis → Optimization → Impact Review → Project Close.

Every stage follows:

Input → Execute → Quality Gate → Artifact → Human Confirmation → Version/Impact Update → Next Stage.

## 3. Project Init

Required Project Brief:
- Project name
- Business background
- Problem statement
- Target users
- Goals and expected outcomes
- In-scope
- Explicit non-goals / out-of-scope
- Platform/channel
- Constraints and dependencies
- Need for Figma high-fidelity
- Need for coding
- Need for QA
- Need for data analysis
- Need for experimentation
- Expected release window

The system must not silently expand scope.

## 4. Capability Check

Check available capabilities before execution:
- Figma
- GitHub
- Coding/runtime
- Browser/Playwright
- Data source/analytics
- Experiment/AB platform
- Image/visual generation
- Other project-specific tools

Status: Ready / Optional / Required Missing / Error.

Capability gaps are reported with the affected stage and suggested action. They do not block unrelated stages.

## 5. Scope Gate

Before detailed work, validate:
- Goal is measurable
- User/problem is clear
- Scope is bounded
- Non-goals are explicit
- Dependencies are known
- Success criteria are defined

If ambiguous, ask targeted questions before proceeding.

## 6. Research

Collect only research needed for the decision. Record evidence, assumptions, unknowns, and source quality. Avoid turning research into uncontrolled scope expansion.

Artifact: Research Brief.

## 7. Product

Convert the problem into:
- User stories
- Business rules
- Functional requirements
- Non-functional requirements where applicable
- Edge cases
- Acceptance criteria
- Dependencies
- Risks

Artifact: PRD / Product Spec.

## 8. KPI & Measurement

Define before implementation when measurement matters:
- Primary metric
- Secondary metrics
- Guardrails
- Metric definitions
- Baseline
- Target / decision threshold
- Data source
- Measurement window
- Segmentation requirements

Artifact: KPI & Measurement Spec.

## 9. Experiment Strategy

If experimentation is required, define:
- Hypothesis
- Control / treatment
- Population and allocation
- Eligibility
- Primary metric
- Secondary metrics
- Guardrails
- Duration / sample requirements
- SRM or assignment-quality checks where applicable
- Decision rules
- Rollback criteria

If AB tooling is unavailable, record the experiment design without blocking unrelated work.

Artifact: Experiment Plan.

## 10. UX

Produce information architecture, flows, states, interaction rules, and edge cases. UX must trace back to Product acceptance criteria.

Artifact: UX Spec.

## 11. UI

Produce visual specification including hierarchy, typography, spacing, color, components, states, responsive behavior, and content rules. Do not invent unrelated modules.

Artifact: UI Spec.

## 12. Design-Code Contract

Translate design into implementation-ready contracts:
- Design tokens
- Component mapping
- States and variants
- Interaction behavior
- Responsive rules
- Accessibility requirements where applicable
- Naming conventions

Artifact: Design-Code Contract.

## 13. Figma High-Fidelity

Optional according to Project Brief. If required and Figma capability is Ready, create/update high-fidelity design. If unavailable, stop only this stage and provide a clear connection requirement.

Artifact: Figma Design Reference.

## 14. Engineering

Implement from approved Product Spec, Design-Code Contract, and Figma where applicable. Keep implementation scope aligned with approved requirements.

Artifact: Code + Implementation Notes.

## 15. QA

Generate tests from acceptance criteria. Cover:
- Happy path
- Edge cases
- Error states
- Regression risks
- Functional behavior
- UI/visual behavior where applicable
- Automated tests where tooling is available

Artifact: QA Report.

## 16. Quality Gates

Every material stage has a gate. Gate result:
- Pass: continue
- Warning: continue only after explicit acceptance or mitigation
- Fail: fix/retry; do not silently continue

Quality gates evaluate completeness, consistency, traceability, correctness, and risk.

## 17. Release Gate

Release requires explicit confirmation after:
- Product acceptance criteria satisfied
- QA status acceptable
- Known risks documented
- Metrics instrumentation ready where required
- Experiment configuration reviewed where required
- Rollback plan available

Artifact: Release Checklist.

## 18. Release

Record version, scope, release time, owner, changes, known issues, and rollback information.

Artifact: Release Record.

## 19. Analytics

After release, evaluate defined KPIs against baseline/target. Use actual connected data when available. Clearly distinguish measured results from assumptions.

Artifact: Analytics Report.

## 20. Experiment Analysis

For experiments, evaluate:
- Assignment quality / SRM
- Sample size and exposure
- Primary metric
- Secondary metrics
- Guardrails
- Segment effects
- Statistical validity where applicable
- Practical significance
- Decision against pre-defined rules

Artifact: Experiment Report.

## 21. Optimization

Turn validated findings into prioritized actions. Each action must state evidence, expected impact, confidence, effort, and affected stages.

Artifact: Optimization Proposal.

## 22. Version & Impact Analysis

Any material requirement/design/data change creates a new version or change set. The system identifies affected artifacts and downstream stages.

Example:
Product V2 → impact analysis → UX/UI/Figma/Code/QA affected.

Do not silently overwrite approved artifacts.

## 23. Recovery / Retry / Rollback

When a stage fails:
- Retry
- Fix and rerun
- Return to upstream stage
- Skip only if explicitly permitted
- Roll back to last approved artifact/version

Record failure reason and recovery decision.

## 24. Audit Trail

Record:
- Actor
- Timestamp
- Project/version
- Stage
- Input reference
- Output artifact
- Quality gate result
- Human decision
- Tool/capability used
- Change reason
- Recovery/rollback events

## 25. Project Close

Close only after:
- Final artifacts are stored
- Release outcome recorded
- Analytics/experiment results captured when applicable
- Outstanding risks documented
- Learnings recorded
- Reusable knowledge identified

Artifact: Project Review / Lessons Learned.

## 26. Tool/MCP rule

Tools are invoked opportunistically according to capability dependencies. The workflow must never treat a tool connection as evidence that a project is complete. Conversely, tool absence must not be treated as project failure.

## 27. Stage dependency contract

Each Skill declares:
- Inputs
- Outputs
- Required capabilities
- Optional capabilities
- Quality gate
- Confirmation requirement
- Downstream impact
- Recovery strategy

This enables the same workflow to run across different projects and different user environments.
