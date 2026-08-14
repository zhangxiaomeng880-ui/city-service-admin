# City Service Admin — AI Native Product Lab

这是一个用于验证并沉淀 **AI Native 产品研发流程** 的实验项目。

城市服务后台只是第一个业务样例，核心目标是建立一套可以跨项目复用、可追溯、可质量控制的：

**Project Init → Scope → Research → Product → KPI → Experiment → UX → UI → Design-Code → Figma → Engineering → QA → Release → Analytics → Experiment Analysis → Optimization → Close** 工作流。

## AI Native 原则

AI 不是单独的 Coding 工具，而是贯穿产品生命周期的协作执行者。人的核心职责是目标、范围、判断、优先级、风险接受和验收；AI 负责研究、分析、产出、执行、验证、总结和迭代。

**工具 / MCP 是补充能力，不是流程本身。** Workflow 不依赖某一个工具才能成立；缺失工具只阻塞明确依赖该工具的阶段，并在执行过程中提示用户如何补齐能力。

## 核心机制

每个阶段统一遵循：

**Input → Execute → Quality Gate → Artifact → Human Confirmation → Version/Impact Update → Next Stage**

核心机制包括：

- Project Brief / Scope Gate
- Capability Check / Tool Registry
- Skill Dependency
- KPI / Measurement
- Experiment Strategy / AB
- Acceptance Criteria
- Design-Code Contract
- Stage Artifact
- Quality Gate
- Version / Impact Analysis
- Recovery / Retry / Rollback
- Audit Trail
- Release Gate
- Analytics / Experiment Analysis
- Optimization / Project Close

完整流程定义见：`ai/ai-native-workflow-v0.2.md`

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
- `design/`：UX、UI、原型、Figma 设计引用
- `engineering/`：架构、源码、测试、Design-Code Contract
- `release/`：发布记录、版本资料、Release Gate
- `analytics/`：数据分析、实验分析、用户反馈、优化
- `ai/`：AI Agent、Skill、Capability、Workflow、质量规则

## Workflow 与工具的关系

```text
AI Native Workflow
        │
        ├── Skills
        │     ├── Product
        │     ├── Data / KPI
        │     ├── AB
        │     ├── UX / UI
        │     ├── Figma
        │     ├── Engineering
        │     ├── QA
        │     └── Analytics / Optimization
        │
        └── Capability Layer
              ├── Figma MCP
              ├── GitHub
              ├── Coding Runtime
              ├── Browser / Playwright
              ├── Data Sources
              └── Experiment Platform
```

## 版本目标

v0.2 的重点不是增加更多工具，而是补齐流程本身的必要机制：范围控制、验收标准、阶段产物、质量门、版本影响分析、审计、恢复与回滚，以及项目关闭后的知识沉淀。
