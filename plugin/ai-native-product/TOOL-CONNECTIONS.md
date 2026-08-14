# Tool connection contract

The plugin treats external tools as capabilities, not as prerequisites for the whole project.

| Capability | Required stages | State | Behavior |
|---|---|---|---|
| Figma | Figma High-Fidelity | required when enabled | Block only Figma stage if missing |
| GitHub | Coding, Release | required for those stages | Block only dependent stage |
| Coding runtime | Coding | required for Coding | Block Coding only |
| Browser/Playwright | QA, Visual QA | required for those stages | Block dependent QA stage |
| Analytics/Data source | AB Strategy, Data Analysis, AB Analysis, Optimization | required for those stages | Block dependent data stage |
| Experiment platform/data | AB Analysis | required when AB is enabled | Block AB Analysis only |

The first step of every new project is an environment capability check. A project may proceed through stages whose dependencies are available. Missing capabilities are reported with remediation guidance and do not invalidate completed stages.

States:
- `ready`: connected and usable
- `optional`: not connected but not required by the current project
- `required_missing`: required by a future/current stage but not connected
- `error`: configured but currently unusable
