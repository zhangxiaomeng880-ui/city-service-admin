# City Service Admin — AI Native Product Lab

这是一个用于验证 **AI Native 产品研发流程** 的实验项目。

城市服务后台只是第一个业务样例，重点不是一次性完成一个 Demo，而是建立一套可以持续复用的：

**Research → Product → Design → Planning → Engineering → QA → Release → Analytics → Iteration** 工作流。

## 当前业务样例

城市服务管理：

- 城市通过下拉列表选择，不在后台新增城市
- 城市关联一级分类
- 一级分类支持新增、编辑、删除、排序
- 一级分类下管理二级服务
- 服务支持新增、编辑、删除、排序
- 服务编辑展示所属城市和所属分类
- 支持批量发布
- 前台城市可以切换
- 发布后的前台按「城市 → 一级分类 → 二级服务」联动展示

## 项目结构

- `product/`：产品研究、需求、PRD、指标
- `design/`：UX、UI、原型
- `engineering/`：架构、源码、测试
- `release/`：发布记录与版本资料
- `analytics/`：数据分析与用户反馈
- `ai/`：AI Agent、规则与工作流

## AI Native 原则

AI 不是单独的 Coding 工具，而是贯穿产品生命周期的协作执行者。人的核心职责是目标、判断、优先级和验收；AI 负责研究、分析、产出、执行、验证和总结，并通过 GitHub 留下可追溯的项目资产。

## Project Context

项目基础信息和已确认上下文属于生命周期级资产，由 Project Agent 创建/刷新，后续阶段直接复用。

输入优先级：

**Project Context → Previous Stage Output → Knowledge Base → User Input**。

因此，继续阶段、阶段切换或 Handoff 时不应重复要求用户提供已经确认的项目上下文；只补充当前阶段缺失的 Required Input。

完整规则位于：

- `ai/knowledge-base/v1.0/AI_NATIVE_PROJECT_OS_V1.0.md`
- `ai/rules/AI_RULES.md`
- `ai/rules/STAGE_CONTRACT.md`
