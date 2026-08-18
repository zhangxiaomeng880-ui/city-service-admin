# AI Native

这里维护 AI 在项目生命周期中的角色、规则和工作流。

## 目标

让 AI 从单纯的 Coding 助手升级为贯穿 Research → Product → Design → Engineering → QA → Release → Analytics → Iteration 的协作执行者。

## 当前目录

- `rules/` AI 工作规则、Stage Contract、Command Protocol
- `agents/` AI 角色定义
- `workflows/` AI 工作流定义
- `knowledge-base/` 核心知识库、设计规范、执行规则和 Evolution

## Context 规则

所有 Agent 统一复用：

**Project Context → Previous Stage Output → Knowledge Base → User Input**

只在前三层无法提供当前阶段 Required Input 时请求用户补充。