# AI Native Product Workflow v0.2

## 1. Core principle

Tools and MCPs are supporting capabilities, not workflow stages. The workflow remains executable when optional tools are unavailable. A missing tool only blocks the stage that explicitly depends on it.

Human responsibilities: goals, scope, priority, business judgment, risk acceptance, and stage approval. AI responsibilities: research, analysis, drafting, execution, validation, traceability, and iteration support.

## 2. Project and version foundation

Project is the top-level container. Every project starts with Version V1.0. Every research result, decision, metric, experiment, design, code change, QA result and artifact is automatically associated with Project + Version.

Any material requirement/design/data change creates a new version or change set and triggers Impact Analysis before downstream work is rerun. Approved artifacts are never silently overwritten.

## 3. Lifecycle

Project Init → Capability Check → Scope Gate → Research → Research Synthesis → Product → KPI & Measurement → Experiment Strategy → UX → UI → Design-Code Contract → Figma High-Fidelity (optional) → Engineering → QA → Quality Gate → Release Gate → Release → Analytics → Experiment Analysis → Optimization → Version/Impact Review → Project Close.

Every stage follows:

Input → Execute → Quality Gate → Artifact → Human Confirmation → Version/Impact Update → Next Stage.

## 4. Project Init

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

Project Init only records whether measurement/experimentation is needed; it does not formally define KPI or experiment metrics.

The system must not silently expand scope.

## 5. Capability Check

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

## 6. Scope Gate

Validate goal, user/problem, bounded scope, non-goals, dependencies and success criteria. If ambiguous, ask targeted questions before proceeding.

## 7. Research

Research is a structured input to Product, not a source of uncontrolled scope expansion. Combine user-provided material with AI-assisted external research where useful.

### Competitor Research
Identify relevant competitors, comparable flows/features, differences, evidence, dates and confidence.

### Market Research
Identify industry patterns, market trends, user expectations, best practices and supporting evidence.

Keep facts, sources, assumptions and AI interpretation separate.

Artifact: Research Brief.

## 8. Research Synthesis

Combine:
- User Input
- Competitor Facts
- Market Facts
- Evidence
- AI Insights

Explicitly distinguish:
- User Input
- Competitor Fact
- Market Fact
- Evidence
- AI Insight
- Product Decision

Identify opportunities, conflicts, unknowns and implications. Product decisions are not generated from unsupported AI inference.

Artifact: Research Synthesis. Human confirmation required.

## 9. Product

Convert confirmed research and user input into:
- User stories
- Business rules
- Functional requirements
- Non-functional requirements where applicable
- Edge cases
- Acceptance criteria
- Dependencies
- Risks

Artifact: PRD / Product Spec. Human confirmation required.

## 10. KPI & Measurement

**Formal entry point for product metrics.** Define:
- Primary metric
- Secondary metrics
- Guardrails
- Metric definitions
- Formula
- Numerator/denominator
- User/session/event level
- Baseline
- Target / decision threshold
- Data source
- Measurement window
- Segmentation requirements

The KPI Spec becomes the shared metric contract for UX, implementation, QA, Release, Analytics and Experiment Analysis.

Artifact: KPI & Measurement Spec. Human confirmation required.

## 11. Experiment Strategy

Determine whether AB testing is necessary. If yes, define:
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

Artifact: Experiment Plan. Human confirmation required.

## 12. UX

Produce information architecture, flows, states, interaction rules and edge cases. UX traces back to Product acceptance criteria and KPI requirements.

Artifact: UX Spec. Human confirmation required.

## 13. UI

Produce visual specification including hierarchy, typography, spacing, color, components, states, responsive behavior and content rules. Do not invent unrelated modules.

Artifact: UI Spec. Human confirmation required.

## 14. Design-Code Contract

Translate design into implementation-ready contracts:
- Design tokens
- Component mapping
- States and variants
- Interaction behavior
- Responsive rules
- Accessibility requirements where applicable
- Naming conventions

Artifact: Design-Code Contract. Human confirmation required.

## 15. Figma High-Fidelity

Optional according to Project Brief. If required and Figma capability is Ready, create/update high-fidelity design. If unavailable, stop only this stage and provide a clear connection requirement.

Artifact: Figma Design Reference. Human confirmation required.

## 16. Engineering

Implement from approved Product Spec, Design-Code Contract and Figma where applicable. Maintain traceability from requirements to implementation and do not expand scope silently.

Artifact: Code + Implementation Notes. Human confirmation required at the stage gate.

## 17. QA

Generate tests from acceptance criteria. Cover happy path, edge cases, error states, regression risks, functional behavior, UI/visual behavior where applicable, and automated tests where tooling is available. Verify required analytics instrumentation against KPI Spec.

Artifact: QA Report. Human confirmation required.

## 18. Quality Gate

Every material stage has a gate. Result:
- Pass: continue
- Warning: continue only after explicit acceptance or mitigation
- Fail: fix/retry; do not silently continue

Quality gates evaluate completeness, consistency, correctness, traceability, acceptance-criteria coverage, metric consistency and risk.

Artifact: Quality Gate Result. Human confirmation required.

## 19. Release Gate

Release requires explicit confirmation after Product acceptance criteria, QA, known risks, metrics instrumentation, experiment configuration where applicable, security/risk and rollback readiness are checked.

Artifact: Release Checklist. Human confirmation required.

## 20. Release

Record version, scope, release time, owner, changes, known issues and rollback information.

Artifact: Release Record. Human confirmation required.

## 21. Analytics

After release, evaluate defined KPIs against baseline/target using actual connected data when available. Clearly distinguish measured results from assumptions.

Artifact: Analytics Report. Human confirmation required for conclusions/actions.

## 22. Experiment Analysis

For experiments, evaluate assignment quality/SRM, sample size and exposure, primary metric, secondary metrics, guardrails, segment effects, statistical validity where applicable, practical significance and decision against pre-defined rules.

Artifact: Experiment Report. Human confirmation required.

## 23. Optimization

Turn validated findings into prioritized actions. Each action states evidence, expected impact, confidence, effort and affected stages.

Artifact: Optimization Proposal. Human confirmation required.

## 24. Version / Impact Analysis

Any material change creates a new version/change set. Compare the changed input against existing artifacts and dependencies and identify affected stages.

Example: Product V2 → Impact Analysis → UX/UI/Figma/Code/QA affected; KPI/AB re-evaluated if applicable.

Only affected stages are re-executed. Unaffected artifacts remain valid unless explicitly invalidated.

Artifact: Impact Analysis. Human confirmation required before rerun.

## 25. Recovery / Retry / Rollback

When a stage fails:
- Retry
- Fix and rerun
- Return to upstream stage
- Skip only when explicitly permitted and documented
- Roll back to last approved artifact/version

Record failure reason, action, result and affected artifacts. Do not restart the entire project unless explicitly required.

Artifact: Recovery Record. Human confirmation required for consequential recovery actions.

## 26. Audit Trail

Automatically record actor, timestamp, Project/Version, stage, input reference, output artifact, quality gate result, human decision, tool/capability used, change reason and recovery/rollback events.

No routine human confirmation required.

## 27. Project Close

Close only after final artifacts are stored, release outcome recorded, analytics/experiment results captured where applicable, outstanding risks documented, lessons learned recorded and reusable knowledge identified.

Artifact: Project Review / Lessons Learned. Human confirmation required.

## 28. Artifact system

Every stage produces a named, versioned artifact carrying Project ID, Version, Stage, status, evidence/source, dependencies and supersession state. Downstream stages consume confirmed artifacts rather than relying on chat history alone.

## 29. Stage dependency contract

Each Skill declares:
- Inputs
- Outputs
- Required capabilities
- Optional capabilities
- Quality gate
- Confirmation requirement
- Downstream impact
- Recovery strategy

## 30. Tool/MCP rule

Tools are invoked opportunistically according to capability dependencies. Tool connection is never evidence that a project is complete. Tool absence is never project failure; it only pauses the dependent stage and provides a clear connection/action prompt.
