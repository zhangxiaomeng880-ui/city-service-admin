# EVOLUTION-005 — Plugin Packaging / Installation / Capability Model

## 1. Background

The AI Native Project OS workflow, Agent contracts, stage interaction protocol, Knowledge and Evolution mechanisms have reached a stable V1.0 structure. The next objective is external sharing and validation of the plugin packaging and usage model.

## 2. Problem

A complete workflow package is not equivalent to an installable or runtime-validated plugin. External sharing requires explicit installation requirements, capability dependencies, self-check behavior and release criteria.

## 3. Decision

Use a **Core + Optional Capabilities** plugin model.

Core capabilities are required for installation and project execution. External capabilities are bound only when the corresponding Stage requires them.

## 4. Core Requirements

- Agent Runtime
- Workspace / File access
- Persistent Stage State / Resume storage
- Knowledge / Evolution storage
- Git-capable workspace when applicable

## 5. Optional Capability Rule

Figma, GitHub, Build/Deploy/Preview, Data/Experiment, CI/CD and other external tools are not global installation requirements. They are checked when the corresponding Stage starts.

A missing optional capability blocks only the dependent Stage, not the plugin as a whole.

## 6. Installation Self Check

The package now defines a post-install self-check covering:

- Manifest
- Registry
- Stage Contract
- Command Protocol
- 12 Stage Agents
- persistent state
- Resume Point
- Knowledge / Evolution
- Workspace
- repository / branch / version when applicable
- optional capabilities

Results are PASS / PASS WITH WARNING / BLOCKED.

## 7. External Sharing Boundary

The reusable package must not contain current project credentials, private account information, project-only business rules, current project code, or project-specific environment configuration.

Project-specific context is supplied by the consuming project.

## 8. Verification Status

The package is content-complete for V1.0 packaging. Runtime-specific installation and actual execution remain the final validation layer.

## 9. Impact on Knowledge Base

This evolution establishes that plugin completeness must be evaluated across:

Package → Installation → Self Check → Capability Binding → Stage Execution → Validation → Evolution.

The distinction between **package completeness** and **runtime validation** is now a permanent rule for future releases.
