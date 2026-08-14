# Environment & Capability Check

Before a project starts, the plugin runs a capability preflight. This is an environment check, not a project acceptance test.

## Rules

1. Detect available Apps/MCP/runtime capabilities before executing the workflow.
2. Classify each capability as `ready`, `optional`, `required-missing`, or `error`.
3. Derive required capabilities from the selected project configuration and enabled workflow stages.
4. Missing capabilities do not block the project globally. They block only the dependent stage.
5. The plugin must explain what is missing, which stage depends on it, and how to connect it.
6. Capability status can be refreshed at any time; after connection, the blocked stage becomes executable without restarting the project.
7. Tool connectivity is independent from workflow correctness. A project can complete all stages that do not depend on unavailable tools.
8. The plugin must never claim a tool is connected unless the connector/runtime reports it as usable.

## Recommended startup output

- Environment check summary
- Project configuration
- Enabled stages
- Ready capabilities
- Missing required capabilities
- Optional capabilities
- First executable stage
- Any stage currently blocked by missing dependencies

## Future connector adapters

- Figma MCP/App
- GitHub App
- Coding runtime/Codex
- Browser/Playwright
- Data Analytics/Data source
- AB Experiment platform
