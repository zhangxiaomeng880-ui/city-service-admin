# Skill contracts

## product-analysis
Input: raw product request, domain, constraints.
Output: problem, users, goal, scope, business rules, acceptance criteria.
Rule: never invent missing business rules; surface assumptions.

## data-kpi
Input: product goal and key user actions.
Output: primary metric, secondary metrics, guardrails, definitions, event requirements.
Rule: distinguish business outcome metrics from diagnostic metrics.

## ab-experiment
Input: hypothesis, KPI, baseline/traffic when available.
Output: eligibility, hypothesis, primary metric, guardrails, allocation, duration, decision rule.
Rule: do not claim significance without data.

## ux-design
Input: approved product scope.
Output: information architecture, user flow, states, edge cases.

## ui-design
Input: approved UX.
Output: visual hierarchy, components, typography, spacing, states, responsive behavior.

## figma-design
Input: approved UI spec and project Figma setting.
Output: high-fidelity Figma implementation plan/design context and QA checklist.
Rule: only execute when project.figmaHighFidelity=true.

## vibe-coding
Input: approved design/spec and repository context.
Output: implementation, tests, diff summary.
Rule: do not make release decisions.

## qa
Input: implementation and acceptance criteria.
Output: functional test results, defects, regression status.
Rule: on failure, loop to coding and retest.

## visual-qa
Input: UI implementation and visual reference.
Output: visual mismatch report.
Rule: on failure, loop to implementation and retest.

## release-check
Input: QA status, build status, release checklist.
Output: release readiness assessment.
Rule: deployment always requires explicit user approval.

## data-analysis
Input: KPI data.
Output: trends, funnel, segments, anomalies, driver hypotheses.
Rule: separate observed facts from hypotheses.

## product-optimization
Input: validated findings/experiment results.
Output: prioritized recommendations and expected impact.
Rule: rollout, rollback, or continued experimentation requires explicit decision.

## project-review
Input: all stage outputs.
Output: outcome summary, lessons, reusable rules, next actions.