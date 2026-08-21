# Trigger Catalog V1.0

> 状态：V1.0 基础目录
> 规则：每个可执行 Capability 必须登记至少一个标准 Trigger。

| Capability / Domain | Command 示例 | Event / Schedule | 说明 |
|---|---|---|---|
| Model Configuration | `/model list` `/model add` `/model update` `/model validate` `/model activate` | Model onboarding/change | 管理公共 Model Pool |
| Routing Configuration | `/routing show` `/routing configure` `/routing validate` `/routing activate` | Default model failure / policy change | 管理 Routing Policy |
| Project | `/project status` | Project event | 查询项目状态 |
| Task | `/task run` | Workflow event | 启动任务执行 |
| Competitor Analysis | 可定义 `/competitor analyze` | Weekly schedule / competitor change | 能力 Agent 触发入口 |
| Data Analysis | 可定义 `/data analyze` | Weekly schedule / anomaly | 能力 Agent 触发入口 |
| Phase Transition | 可定义 `/phase next` | Phase completion | 进入下一阶段前执行 Input/Gate |

## Catalog Rules

1. Command 只是标准入口，不复制 Capability 实现。
2. Natural Language 可映射到同一 Trigger Contract。
3. Event / Schedule 必须产生 Trigger Record。
4. 新 Capability 在进入可执行状态前必须补齐 Trigger。
5. UI 上线后作为新的 Trigger Source，不创建第二套执行逻辑。
6. Command 名称可扩展，但 Trigger Contract、Input Gate、Execution Trace 不得绕过。
