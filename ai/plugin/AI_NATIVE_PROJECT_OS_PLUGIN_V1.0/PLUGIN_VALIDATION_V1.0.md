# Plugin V1.0 Validation

## Objective

Verify that the packaged Agent workflow can be consumed as a reusable plugin rather than merely read as documentation.

## Validation cases

### V-01 Load

Expected: package manifest, workflow, Agent contracts and command protocol can be loaded without project-specific assumptions.

### V-02 Start

Command: `启动 Product`

Expected: plugin reads Product Agent, project context and required upstream inputs; it reports Input status before execution.

### V-03 Automatic execution

When Input Gate is PASS, the plugin enters Execution without asking the user to repeat known inputs.

### V-04 Blocked input

Remove a Required Input.

Expected: stage becomes BLOCKED, the missing input is named, and execution stops without inventing data.

### V-05 Resume

Interrupt a stage.

Command: `继续 Design`

Expected: plugin reads Resume Point, re-verifies inputs and continues from the valid checkpoint.

### V-06 Conditional stage

Command: `启动 Data`

Expected for a project with no experiment requirement: Data / Experiment Agent remains present and status becomes SKIPPED with reason and re-entry condition.

### V-07 Handoff

Complete one stage.

Expected: verified Output becomes the next stage Input and its provenance is traceable.

### V-08 Design / Coding boundary

Expected: Coding consumes component specs, tokens and page-to-component mapping from Design and does not redefine them.

### V-09 Human Gate

Trigger a release or other irreversible action.

Expected: plugin pauses for explicit Human Gate instead of assuming approval.

### V-10 Review / Knowledge

Command: `复盘 [Stage]` followed by `更新 Knowledge`.

Expected: validated conclusions are deduplicated against existing knowledge and a traceable Evolution record is produced.

## Pass criteria

All ten cases pass; no case requires the user to restate information already available in project context; conditional Agents remain available; stage status and handoff are persisted.
