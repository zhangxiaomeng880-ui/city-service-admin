# AGENT_STAGE_INTERACTION_PROTOCOL_V1.0

## 1. Purpose

统一所有 Agent Stage 的启动、输入检查、执行、输出验证、Gate、Handoff 与用户交互方式。

目标：用户只提供阶段启动关键词，Agent 自动读取 Stage Contract 与项目上下文，不要求用户重复提供已存在的输入和执行规则。

## 2. Standard User Commands

| Command | Meaning |
|---|---|
| `启动 [Stage]` | 启动指定阶段：读取上下文、检查 Input、通过 Gate 后自动执行 |
| `继续 [Stage]` | 根据 Resume Rule 从最近 Resume Point 继续 |
| `检查 [Stage]` | 只检查该阶段，不执行阶段任务 |
| `复盘 [Stage]` | 对已执行阶段进行复盘，不重新执行 |
| `全量执行项目` | 按 Project Manifest / Agent Registry / Gate 自动推进全部可执行阶段 |
| `检查全部 Agent MD` | 全量审计 Agent Contract、Input/Output、Gate、Handoff 和文档完整性 |
| `更新 Knowledge` | 执行 Knowledge Update，将已验证结论沉淀到知识库 |

## 3. Stage Start Protocol

收到 `启动 [Stage]` 后，Agent 必须按以下顺序执行：

1. 读取当前 Stage Agent MD / Stage Contract。
2. 读取 Project Manifest、Version Manifest、Environment Manifest 及相关 Registry。
3. 读取上游 Stage Output、Handoff 与历史执行记录。
4. 读取当前 Knowledge 中与本 Stage 相关的规则和已验证 Pattern。
5. 建立本次 Stage Execution Context。
6. 执行 Input Readiness 检查。
7. 执行 Input Verification。
8. 根据 Gate 判断是否允许进入 Execution。

用户不需要再次提供 Agent MD 已定义的输入；只有外部缺失信息、冲突决策或 Human Gate 才需要用户介入。

## 4. Input Prompt / Status Message

Agent 在进入 Execution 前，应向用户展示简洁的 Input 状态，而不是要求用户重新描述输入。

标准格式：

```text
【[Stage]｜Input】
已读取：Stage Contract / Project Context / 上游 Output / Knowledge
Required Input：...
已满足：...
Warning：...
Missing / Fail：...
Input Gate：PASS / PASS WITH WARNING / BLOCKED
```

### Gate Handling

- `PASS`：自动进入 Execution。
- `PASS WITH WARNING`：记录 Warning；若 Warning 非 blocker，自动进入 Execution。
- `BLOCKED`：停止 Execution，只向用户提出缺失项或冲突决策。
- `NOT APPLICABLE`：仅适用于条件阶段，必须记录判断依据并进入 SKIPPED 流程。

## 5. Execution Prompt / Status Message

进入 Execution 后，Agent 应先给出本阶段执行计划，并随后执行，不要求用户再次输入“执行”。

标准格式：

```text
【[Stage]｜Execution】
本阶段执行：
1. ...
2. ...
3. ...
记录：Decision / Gap / Evidence / Deviation / Asset
开始执行。
```

Execution 必须严格遵守 Stage Contract：

- 不自行改变上游已确认的 Product / Design 决策。
- 发现缺失、冲突或不可实现项时记录 Gap / Decision Required。
- 所有关键结论必须有 Evidence 或来源。
- 所有产出必须可定位。

## 6. Human Intervention Rules

Agent 不应在每个步骤要求用户确认。

仅在以下情况暂停：

1. Required Input 缺失。
2. 上下游存在冲突且无法依据既有规则自动决策。
3. Human Gate 明确要求人工批准。
4. 高风险、不可逆操作需要人工批准。
5. 项目规则明确要求用户决策。

普通 Warning 不应阻断流程，但必须记录责任人和后续处理方式。

## 7. Output Protocol

Execution 完成后，Agent 必须执行 Output Verification，而不是仅宣布“完成”。

标准格式：

```text
【[Stage]｜Output】
已生成：...
Evidence / Location：...
Output Verification：...
Gate：PASS / PASS WITH WARNING / BLOCKED
Handoff：...
Stage Status：COMPLETED / PARTIAL / BLOCKED / SKIPPED
```

只有 Output Verification 与 Gate 满足要求，Stage 才可标记为 `COMPLETED`。

## 8. Conditional Stage Rule

Conditional Agent 必须永久存在于标准 Agent 能力体系中。

本次项目不适用时：

- Agent 仍然被加载和检查。
- 判断条件是否满足。
- 不满足则记录 `Status = SKIPPED`。
- 必须记录 `Skip Reason`、判断依据、影响和 Resume / Re-entry 条件。
- 不得因为本项目 SKIPPED 而删除 Agent MD。

## 9. Resume Rule

`继续 [Stage]` 时：

1. 读取最近一次 Stage 状态。
2. 读取 Resume Point。
3. 重新验证仍然有效的 Input。
4. 检查环境 / Version / Handoff 是否发生变化。
5. 从最近有效步骤继续，不重复已验证的工作。

## 10. Stage Completion Contract

Stage 完成必须同时满足：

`Input Ready + Input Verified + Execution Complete + Output Generated + Output Verified + Gate Passed + Handoff Recorded`

缺任一项，不得直接标记 `COMPLETED`。

## 11. Audit / Review Requirement

每次 Stage 执行结束后，Agent MD 必须保留：

- Input 状态
- Execution 记录
- Output
- Evidence / Location
- Gate
- Handoff
- Status
- Resume Point（如有）
- Decision / Gap / Warning（如有）

## 12. Relationship to Knowledge Update

阶段执行中的规则变更、可复用 Pattern、失败案例、决策及流程改进建议，应在 Review 后进入 Knowledge Update。

Knowledge Update 不替代 Stage MD；Stage MD 保存执行事实，Knowledge Base 保存经过验证后可复用的规则。
