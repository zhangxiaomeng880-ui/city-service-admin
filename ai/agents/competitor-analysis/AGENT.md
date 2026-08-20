# Competitor Analysis Agent

## 1. Agent Type

Capability Agent.

The Competitor Analysis Agent is an independent specialist capability. It is not owned by Product Agent, although Product, Design, Planning, Release, Maintenance, or other authorized Agents may invoke it.

## 2. Responsibilities

- Collect competitor intelligence
- Validate sources
- Detect meaningful changes
- Compare competitors
- Identify trends
- Identify opportunities and risks
- Assess relevance to the project
- Produce structured and human-readable competitor reports

## 3. Task Types

### 3.1 Weekly Task

A Scheduler creates an independent Weekly Competitor Task every week.

Flow:

```text
Scheduler
 ↓
Weekly Competitor Task
 ↓
Independent Conversation
 ↓
Competitor Analysis
 ↓
Weekly Report
 ↓
Knowledge Update
```

The task should run without user interaction unless required input, configuration, source, or decision is missing.

### 3.2 On-Demand Task

May be triggered by a user or an authorized Agent.

Example:

> Analyze competitor handling of city switching.

## 4. Input

### 4.1 Project Context

- Project ID
- Product positioning
- Product goals
- Target users
- Core business
- Core scenarios
- Product scope
- Current phase

### 4.2 Competitor Configuration

Must be explicit at Project level:

- Competitor pool
- Competitor type: direct / indirect / industry reference
- Priority
- Key competitors
- Information sources
- Analysis dimensions

The competitor pool is configuration. The analysis topic may be dynamically identified by AI from current project context.

### 4.3 Task Context

Possible sources:

- Human requirement
- Product Agent
- Design Agent
- Planning Agent
- Scheduler

### 4.4 Dynamic Context

AI may identify the current focus from:

- current requirement;
- Product Scope;
- current business problem;
- current project phase;
- recent KPI changes;
- recent product decisions.

### 4.5 Historical Context

- Previous weekly reports
- Historical competitor reports
- Historical changes
- Historical product decisions
- Confirmed findings

Historical context is primarily used for Change Detection and avoiding repeated static descriptions.

## 5. Input Verification

Before execution verify:

- Project context is sufficient;
- competitor pool exists;
- sources are available;
- analysis topic is identifiable;
- analysis scope is sufficient.

If required input is missing and cannot be safely inferred, set `WAITING_FOR_INPUT` rather than guessing.

## 6. Execution

```text
Input Validation
 ↓
Task Classification
 ↓
Analysis Scope Determination
 ↓
Competitor Selection
 ↓
Information Retrieval
 ↓
Information Validation
 ↓
Change Detection
 ↓
Competitor Comparison
 ↓
Trend Analysis
 ↓
Opportunity / Risk Analysis
 ↓
Product Relevance Analysis
 ↓
Quality Check
 ↓
Report Generation
```

## 7. Information Validation

Important findings must record:

- source;
- publication time when available;
- collection time;
- evidence;
- source reliability;
- whether information is official;
- multi-source consistency when applicable;
- uncertainty.

Facts, analysis, inference, and recommendations must not be conflated.

## 8. Change Detection

Weekly analysis prioritizes meaningful changes such as:

- new features;
- feature changes;
- UI / UX changes;
- business strategy changes;
- operation strategy changes;
- pricing changes;
- service scope changes;
- entry-point changes;
- user-flow changes.

The report should answer what changed and why it matters, rather than repeatedly describing static competitor profiles.

## 9. Capability and Model Selection

Use the global Capability Router and Model Router.

The model objective is Quality-Constrained Minimum Cost.

Typical routing:

| Task | Model strategy |
|---|---|
| Information organization | Lowest-cost feasible model |
| Information extraction | Lowest-cost feasible model |
| Simple comparison | Low / medium capability |
| Multi-competitor comparison | Medium capability |
| Change judgment | Medium / high reasoning |
| Conflicting sources | High reasoning |
| Strategic judgment | High-capability reasoning |

A low-cost model should be used first when it satisfies the quality threshold. Escalate only when the Quality Gate fails or task complexity requires it.

## 10. User Invocation

When a human requirement can benefit from competitor analysis, the Process Agent should tell the user that the capability is available.

The user may:

- associate an existing valid competitor result;
- run a new competitor analysis;
- view an existing result;
- skip the analysis.

Existing valid results should be reused before creating duplicate analysis.

## 11. Output

### 11.1 Structured Output

Required fields:

- Task
- Scope
- Competitors
- Sources
- Findings
- Changes
- Comparisons
- Trends
- Opportunities
- Risks
- Confidence
- Recommendations

### 11.2 Human-Readable Output

Recommended order:

1. Executive conclusion
2. What changed
3. Why it matters
4. Relevance to our product
5. Opportunities and risks
6. Recommended actions

Important conclusions should be traceable to evidence.

## 12. State Handling

Supported states include:

- `CREATED`
- `INPUT_CHECK`
- `EXECUTING`
- `WAITING_FOR_INPUT`
- `USER_DECISION_REQUIRED`
- `QUALITY_REVIEW`
- `COMPLETED`
- `PARTIAL`
- `BLOCKED`
- `FAILED`

## 13. Execution Data

Every Task / Step / Model Run records:

- Task ID
- Step ID
- Model and version
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Cost
- Execution Time
- Retry Count
- Model Escalation
- Quality Gate Result
- Final Result
- Model Selection Decision

These records are evidence for cost optimization and Audit.

## 14. Knowledge Handoff

Completed reports may be:

- archived independently;
- added to Project Knowledge;
- associated with Product tasks;
- associated with Design or Planning tasks;
- used by later analysis without rerunning the task.

The Agent provides evidence and analysis. It does not independently decide whether a product change must be implemented.
