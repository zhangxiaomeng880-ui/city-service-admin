# Project Weekly Intelligence V1.3

## KPI Weekly Intelligence

Each Project configures KPI, target, definition, data source, reporting period, and historical context.

The Scheduler creates an independent weekly Data Analysis Task and Conversation.

The task must validate data quality before analysis. Missing or invalid data enters `WAITING_FOR_INPUT` or `DATA_QUALITY_BLOCKED` and must not be replaced with guesses.

Each KPI record should retain:

- Project
- KPI
- Value / Unit
- Definition
- Target
- Source
- Source Detail
- Time Range
- Collection / Input Time
- Data Version / Batch when applicable
- User Provided / System Collected
- Evidence Reference

Weekly reports should include actual value, target, variance, attainment, trend, data quality, evidence, conclusion, recommendation, and follow-up metrics.

## Competitor Weekly Intelligence

Each Project independently configures competitor pool, competitor type, priority, analysis dimensions, and sources.

The Scheduler creates an independent weekly Competitor Analysis Task and Conversation.

The competitor pool is project configuration. AI may dynamically identify the most relevant weekly analysis topic from Project Context, current requirements, KPI changes, current problems, and historical reports.

Weekly analysis prioritizes changes rather than repeating static competitor descriptions.

Each important finding should retain:

- Competitor
- Event / Topic
- Publication Time when available
- Collection Time
- Source
- Evidence Reference
- Fact / Analysis / Inference classification
- Uncertainty
- Product Relevance

## Reuse and Product Association

Existing valid weekly results should be reused when a human requirement or another Process Agent needs competitor or KPI context. New analysis should only be created when existing results are missing, stale, or insufficient for the task.

## Reliability and Isolation

- Different Projects must not mix KPI, competitor configuration, sources, reports, or historical data.
- Missing data, source anomalies, definition conflicts, and unverifiable information must be explicit.
- Analysis must not be presented as fact.
- All Task, Model Run, Tool Run, and output evidence must remain traceable for Audit.
