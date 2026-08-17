# Plugin Self Check V1.0

## Purpose

Verify that the plugin package can be loaded and that core execution dependencies are available before starting a project.

## Checks

### Core

- [ ] Plugin Manifest readable
- [ ] Agent Registry readable
- [ ] Stage Contract readable
- [ ] Command Protocol readable
- [ ] All 12 Stage Agent definitions available
- [ ] Persistent Stage Status available
- [ ] Resume Point persistence available
- [ ] Knowledge storage available
- [ ] Evolution storage available
- [ ] Workspace readable/writable

### Project Environment

- [ ] Repository identified when applicable
- [ ] Branch identified when applicable
- [ ] Project version identified when applicable
- [ ] Runtime identified when applicable

### Optional Capabilities

- [ ] Figma — only required for Design execution requiring Figma
- [ ] GitHub / Git provider — required for repository operations
- [ ] Build / Deploy / Preview — required for Preview execution
- [ ] Data / Experiment — required only when Data / Experiment executes
- [ ] CI/CD — required only when release workflow depends on it

## Result Rules

### PASS

All required Core checks pass.

### PASS WITH WARNING

Core checks pass; one or more optional capabilities are unavailable. Affected stages are marked capability-blocked only when invoked.

### BLOCKED

One or more Core checks fail. Project execution must not start until the dependency is resolved.

## Execution Record

After the check, persist:

- check timestamp
- plugin version
- workspace
- repository / branch / version when applicable
- capability status
- warnings
- blocking items
- final result

## Next Action

If PASS or PASS WITH WARNING:

`启动 Project`

If BLOCKED:

stop and report the missing core dependency.
