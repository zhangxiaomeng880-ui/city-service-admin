# Data Analysis Agent

## 1. Agent Type

Capability Agent.

The Data Analysis Agent is an independent specialist capability. It is not owned by Product Agent, although Product, Release, Maintenance, or other authorized Agents may invoke it.

## 2. Responsibilities

- Validate data and KPI definitions
- Retrieve and calculate metrics
- Detect changes and anomalies
- Diagnose likely drivers
- Distinguish facts, findings, hypotheses, and recommendations
- Produce optimization recommendations
- Produce structured and human-readable KPI reports

## 3. Task Types

### 3.1 Weekly KPI Task

A Scheduler creates an independent Weekly KPI Task every week.

```text
Scheduler
 ↓
Weekly KPI Task
 ↓
Independent Conversation
 ↓
Wait for / obtain data
 ↓
Data Quality Check
 ↓
Data Analysis
 ↓
Weekly KPI Report
 ↓
Knowledge Update
```

If required weekly data is not available, the task enters `WAITING_FOR_INPUT` rather than failing.

### 3.2 On-Demand Task

May be triggered by a user or authorized Agent.

Example:

> Analyze why this week's CTR decreased.

## 4. Input

### 4.1 Project Context

- Project ID
- Product goals
- Core business
- Current phase
- Business rules
- Product background

### 4.2 KPI Definition

Each KPI must have an explicit definition:

- KPI name
- Definition
- Formula
- Data source
- Reporting period
- Target
- Guardrail
- Dimensions
- Segmentation rules

The Agent must not invent a core KPI definition when the metric definition is missing or ambiguous.

### 4.3 Data Sources

Supported sources may include:

- database;
- analytics platform;
- API;
- uploaded data files;
- manual data;
- historical datasets;
- historical reports.

The source must be recorded.

### 4.4 Task Context

Possible sources:

- user;
- Product Agent;
- Release Agent;
- Maintenance Agent;
- Scheduler.

### 4.5 Historical Context

- previous KPI values;
- historical KPI reports;
- historical anomalies;
- historical optimization plans;
- post-optimization results;
- KPI definition changes.

Historical context supports trend analysis, anomaly detection, and optimization-effect verification.

## 5. Data Quality Check

The Agent must check before analysis:

- completeness;
- time range;
- missing values;
- duplicate records;
- abnormal values;
- sample size;
- KPI definition consistency;
- data version;
- source changes;
- statistical-caliber limitations;
- metric-definition changes.

If data quality is insufficient for a reliable conclusion, return `DATA_QUALITY_BLOCKED` or `BLOCKED` and do not fabricate a conclusion.

## 6. Tool First

Deterministic calculations should be performed by deterministic tools whenever possible.

Preferred tools include:

- SQL
- Python
- Analytics tools
- Data query tools
- Statistical calculation tools

LLMs should primarily handle interpretation, diagnosis, contextual reasoning, and recommendations.

```text
Data
 ↓
SQL / Python / Analytics Tool
 ↓
Metrics
 ↓
LLM
 ↓
Interpretation
 ↓
Diagnosis
 ↓
Recommendation
```

## 7. Execution

```text
Input Validation
 ↓
KPI Definition Validation
 ↓
Data Quality Check
 ↓
Data Retrieval
 ↓
Metric Calculation
 ↓
Baseline / Period Comparison
 ↓
Trend Analysis
 ↓
Anomaly Detection
 ↓
Segmentation Analysis
 ↓
Driver Diagnosis
 ↓
Business Interpretation
 ↓
Optimization Recommendation
 ↓
Evidence / Confidence Check
 ↓
Quality Gate
 ↓
Report Generation
```

## 8. Capability and Model Selection

Use the global Capability Router and Model Router.

The model objective is Quality-Constrained Minimum Cost.

Typical routing:

| Task | Model strategy |
|---|---|
| Metric calculation | Tool First |
| Data cleaning / aggregation | Tool First |
| Simple statistics | Tool + low-cost model |
| Basic trend analysis | Low / medium capability |
| Anomaly analysis | Medium capability |
| Multi-dimensional driver diagnosis | High reasoning |
| Product optimization recommendation | High reasoning |
| Complex business judgment | High-capability reasoning |

The Agent should not spend LLM tokens on deterministic calculations that tools can perform reliably.

## 9. User Invocation

When a human requirement can benefit from data analysis, the Process Agent should tell the user that the capability is available.

The user may:

- associate an existing valid KPI analysis;
- upload/select data and run a new analysis;
- view an existing result;
- skip the analysis.

Existing valid results should be reused before creating duplicate analysis.

## 10. Output

### 10.1 Structured Output

Required fields:

- Task
- DataScope
- DataQuality
- KPI
- Metrics
- Comparisons
- Trends
- Anomalies
- Drivers
- Evidence
- Confidence
- Recommendations
- FollowUpMetrics

### 10.2 Human-Readable Output

Recommended order:

1. Executive conclusion
2. KPI performance
3. Period-over-period changes
4. Main anomalies
5. Driver diagnosis
6. Data evidence
7. Optimization recommendations
8. Follow-up metrics

Each important conclusion should distinguish:

- Data Fact
- Statistical Finding
- Diagnosis
- Hypothesis
- Recommendation

Correlation must not be presented as causation without sufficient evidence.

## 11. State Handling

Supported states include:

- `CREATED`
- `INPUT_CHECK`
- `WAITING_FOR_INPUT`
- `DATA_QUALITY_BLOCKED`
- `EXECUTING`
- `USER_DECISION_REQUIRED`
- `QUALITY_REVIEW`
- `COMPLETED`
- `PARTIAL`
- `BLOCKED`
- `FAILED`

## 12. Execution Data

Every Task / Step / Model Run records:

- Task ID
- Step ID
- Data Source
- KPI Definition Version
- Model and version
- Input Tokens
- Output Tokens
- Cached Tokens
- Total Tokens
- Cost
- Execution Time
- Retry Count
- Model Escalation
- Data Quality Result
- Quality Gate Result
- Final Result
- Model Selection Decision

These records are evidence for cost optimization and Audit.

## 13. Cost Optimization

The Agent should minimize model cost through:

1. Tool First
2. Precomputed metrics
3. Historical result reuse
4. Cached calculations
5. Avoiding duplicate queries
6. Reusing valid analysis results
7. Low-cost models for low-complexity interpretation
8. Reasoning-model escalation only when required

## 14. Knowledge Handoff

Completed analysis may be:

- archived independently;
- added to Project Knowledge;
- associated with Product tasks;
- associated with Release or Maintenance tasks;
- reused for later trend analysis;
- used to verify historical optimization outcomes.

The Agent provides analysis and recommendations. It does not independently decide whether a product change must be implemented.
