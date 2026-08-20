# Stage ↔ Agent Mapping V1.0

| Stage | Default Agent | Rule |
|---|---|---|
| Product | Product Agent | 项目计划确定后按需调用 |
| Design | Design Agent | 前置条件满足后调用 |
| Planning | Planning Agent | 前置条件满足后调用 |
| Engineering | Engineering Agent | 前置条件满足后调用 |
| Testing | Testing Agent | 前置条件满足后调用 |
| Compliance | Compliance Agent | 仅适用项目调用 |
| Release | Release Agent | Gate 条件满足后调用 |
| Maintenance | Maintenance Agent | 项目进入维护阶段后调用 |

Audit Agent 独立于 Stage，不属于普通阶段映射。Stage 是项目计划实体，Agent 是执行能力。Orchestrator 根据 Stage、Dependency、Gate 和项目上下文自动调用对应 Agent。