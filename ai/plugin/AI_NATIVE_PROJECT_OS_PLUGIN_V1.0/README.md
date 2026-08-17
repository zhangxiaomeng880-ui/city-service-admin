# AI Native Project OS Plugin V1.0

## What this package is

A reusable Agent workflow package that turns a project lifecycle into explicit, auditable Stage Contracts.

It separates universal workflow capability from any single project's business content.

## Quick Start

1. Load the plugin package.
2. Give the plugin the target project's repository/context.
3. Use `启动 Project` to initialize or verify the project context.
4. Use `启动 Product`, `启动 Design`, `启动 Coding` and other stage commands as needed.
5. Do not repeat inputs that already exist in upstream outputs or the project manifest.
6. Let the plugin stop only when a Required Input, Decision, Human Gate or irreversible action requires the user.

## Stage command protocol

### Start

`启动 Design`

The plugin automatically loads the Design Agent contract, current project state, upstream outputs and relevant knowledge, then performs Input Readiness and Input Verification before execution.

### Resume

`继续 Design`

The plugin loads the saved Resume Point and continues from the last valid checkpoint after re-verifying inputs.

### Audit

`检查 Design`

The plugin audits Input, Execution evidence, Output, Gate, Handoff and Status without changing the stage.

### Review

`复盘 Design`

The plugin analyzes the actual execution, decisions, gaps, rework and reusable patterns.

### Full lifecycle

`全量执行项目`

The plugin advances through the canonical lifecycle and evaluates conditional stages rather than deleting or bypassing their Agents.

### Knowledge

`更新 Knowledge`

The plugin compares validated conclusions with the existing knowledge base, deduplicates, updates reusable rules and records Evolution.

## Universal contract

Every Agent should expose:

Purpose / Mission → Version → Input → Input Readiness → Input Verification → Execution → Output → Output Verification → Gate → Handoff → Environment Dependency → Version Dependency → Status → Resume Rule.

## Conditional stages

Feasibility and Data / Experiment remain available Agents even when a project does not need them. The plugin records `SKIPPED` plus reason and re-entry condition.

## Design / Coding boundary

Design owns visual design, interaction design, component specifications, design tokens and page-to-component mapping. Coding consumes those outputs and implements them; it must not redefine upstream decisions.

## Environment boundary

Project Initialization establishes repository, branch, runtime, build/deploy/preview and project version baselines. Later stages verify compatibility rather than re-initializing the environment.

## Validation

Use the package validation checklist in `PLUGIN_VALIDATION_V1.0.md` before external sharing.
