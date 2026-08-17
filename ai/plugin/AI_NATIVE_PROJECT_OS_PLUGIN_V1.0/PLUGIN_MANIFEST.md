# AI Native Project OS Plugin V1.0

## Package purpose

A reusable, project-agnostic Agent workflow package for executing software/product projects through a controlled lifecycle.

## Runtime contract

The plugin must treat Agent definitions as persistent capabilities and Stage Status as project-specific execution state.

### Supported lifecycle

1. Project Initialization
2. Feasibility (conditional)
3. Product
4. Design
5. Engineering / Coding
6. Build / Deploy / Preview
7. Acceptance
8. QA
9. Release
10. Data / Experiment (conditional)
11. Review
12. Knowledge Update

### Stage states

- COMPLETED
- PARTIAL
- BLOCKED
- SKIPPED

SKIPPED means the Agent exists but the current project does not meet its execution condition.

## User commands

- `启动 [Stage]` — start or enter a stage after automatic context/input checks.
- `继续 [Stage]` — resume from the persisted Resume Point.
- `检查 [Stage]` — audit a stage without executing it.
- `复盘 [Stage]` — review the execution of a stage.
- `全量执行项目` — progress through the lifecycle according to gates and conditional rules.
- `检查全部 Agent MD` — audit all Agent contracts.
- `更新 Knowledge` — persist validated knowledge, evolution and workflow improvements.

## Universal stage loop

启动 → 读取 Agent MD / Registry / Manifest / upstream outputs / Knowledge → Input Readiness → Input Verification → Gate → Execution → Output → Output Verification → Gate → Handoff → Stage Status.

## Human intervention

The plugin must not ask the user to repeat information already available from project context or upstream outputs. It should interrupt only for missing required input, unresolved decision conflicts, Human Gates, or high-risk irreversible actions.

## Package boundaries

The package must not contain project-specific Product, Design, Coding, credentials, private URLs, or implementation assumptions. Project-specific information belongs to the consuming project's context.

## Source of truth

The package is derived from the validated AI Native Project OS knowledge base and its Evolution records. The consuming project may extend the knowledge base, but must not silently change the universal contract.
