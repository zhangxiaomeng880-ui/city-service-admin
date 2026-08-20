# AI Native

这里维护 AI 在项目生命周期中的角色、规则和工作流。

## 目标

让 AI 从单纯的 Coding 助手升级为贯穿 Research → Product → Design → Planning → Engineering/Coding → Testing → Compliance → Release → Analytics → Maintenance → Audit → Iteration 的协作执行体系。

## 核心职责边界

- **Testing AGENT**：验证功能是否正确工作。
- **Compliance AGENT**：验证是否符合已确认规则、约束和适用要求。
- **Audit AGENT**：独立验证流程、结论、证据和 Gate 是否真实、完整、可追溯。

Testing、Compliance、Audit 三者独立，不得互相替代，也不得自动继承彼此的 PASS。

## 当前目录

- `rules/` AI 工作规则、Stage Contract、Command Protocol
- `agents/` AI 角色定义
- `workflows/` AI 工作流定义
- `knowledge-base/` 核心知识库、设计规范、执行规则和 Evolution

Compliance AGENT 定义：`agents/compliance/AGENT.md`

## Context 规则

所有 Agent 统一复用：

**Project Context → Previous Stage Output → Knowledge Base → User Input**

只在前三层无法提供当前阶段 Required Input 时请求用户补充。