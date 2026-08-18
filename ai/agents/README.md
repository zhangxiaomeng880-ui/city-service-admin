# AI Agents

后续在这里定义不同阶段的 AI 角色，例如：

- Research Agent
- Product Agent
- Design Agent
- Planning Agent
- Engineering Agent
- QA Agent
- Release Agent
- Analytics Agent

每个 Agent 应明确输入、职责、输出和验收方式。

## Shared Execution Rule

所有 Agent 执行前统一检查：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. User Input（仅补充缺失 Required Input）

不得重复询问已有且仍有效的项目上下文。

## Shared Output Contract

阶段 Agent 必须能够提供：

- Input
- Input Verification
- Execution
- Output
- Output Verification
- Gate
- Handoff
- Status

状态：`COMPLETED / PARTIAL / BLOCKED / SKIPPED`。

具体 Contract 见 `ai/rules/STAGE_CONTRACT.md`。