# AI Native Project OS Plugin V1.0

## What this package is

A reusable Agent workflow package that turns a project lifecycle into explicit, auditable Stage Contracts.

It separates universal workflow capability from any single project's business content.

## Package structure

- `README.md` — overview and Quick Start
- `INSTALLATION.md` — installation requirements and capability dependencies
- `SELF_CHECK.md` — post-install self-check protocol
- `PLUGIN_MANIFEST.md` — plugin identity and capability definition
- `STAGE_CONTRACT.md` — universal Agent contract
- `COMMAND_PROTOCOL.md` — user-facing stage commands
- `PLUGIN_VALIDATION_V1.0.md` — external validation criteria
- `VALIDATION_CASE_CURRENT_PROJECT.md` — real project validation case

## Installation model

The plugin uses **Core + Optional Capabilities**.

### Core requirements

- Agent Runtime capable of reading/executing Markdown Agent Contracts
- Workspace / File access
- Persistent Stage State and Resume Point storage
- Knowledge / Evolution storage
- Git-capable project workspace when the project uses Git

### Recommended capabilities

- GitHub / Git provider
- Figma
- Build / Deploy / Preview runtime

### Optional capabilities

- Data / Analytics
- Experiment / A/B platform
- CI/CD
- Deployment platform
- Project management or issue tracking
- Domain-specific tools

Do not install every optional capability by default. Capability requirements are evaluated when the corresponding Stage starts.

## Installation

1. Load the plugin package.
2. Run `Plugin Self Check` using `SELF_CHECK.md`.
3. Resolve any `BLOCKED` core dependency.
4. Review optional capability warnings.
5. Bind the plugin to the target project workspace/repository.
6. Use `启动 Project` to initialize or verify project context.

## Quick Start

1. Load the plugin package.
2. Give the plugin the target project's repository/context.
3. Run `Plugin Self Check`.
4. Use `启动 Project` to initialize or verify the project context.
5. Use `启动 Product`, `启动 Design`, `启动 Coding` and other stage commands as needed.
6. Do not repeat inputs that already exist in upstream outputs or the project manifest.
7. Let the plugin stop only when a Required Input, Decision, Human Gate or irreversible action requires the user.

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

## Automatic Stage Interaction

After `启动 [Stage]`, the plugin should automatically perform:

`Load Context → Input Readiness → Input Verification → Gate → Execution → Output → Output Verification → Gate → Handoff → Status Update`

It should not ask the user to restate information already available in the Agent Contract, Project Manifest or upstream verified outputs.

### Intervention rules

- `PASS`: continue automatically.
- `PASS WITH WARNING`: record the warning and continue when it is non-blocking.
- `BLOCKED`: stop and request the missing required input/capability.
- `Decision Required`: stop and request the user's decision.
- `Human Gate`: stop for the explicit approval required by the workflow.

## Universal contract

Every Agent should expose:

Purpose / Mission → Version → Input → Input Readiness → Input Verification → Execution → Output → Output Verification → Gate → Handoff → Environment Dependency → Version Dependency → Status → Resume Rule.

## Conditional stages

Feasibility and Data / Experiment remain available Agents even when a project does not need them. The plugin records `SKIPPED`, reason, evidence and re-entry condition.

## Design / Coding boundary

Design owns visual design, interaction design, component specifications, design tokens and page-to-component mapping. Coding consumes those outputs and implements them; it must not redefine upstream decisions.

## Environment boundary

Project Initialization establishes repository, branch, runtime, build/deploy/preview and project version baselines. Later stages verify compatibility rather than re-initializing the environment.

## External sharing rule

The package must not contain project-specific business rules, private credentials, account information, private URLs, current project code or other project-only configuration. Those belong to the consuming project's context.

## Validation

Use `PLUGIN_VALIDATION_V1.0.md` before external sharing. The package should pass installation self-check and the real-project validation case before being treated as a validated V1.0 release.