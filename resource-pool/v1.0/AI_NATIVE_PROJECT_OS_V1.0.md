# AI Native 项目运行机制 V1.0

> 状态：V1.0 Project-based Validation / 历史基线
> 适用范围：V1.0 项目制验证与演进历史
> 当前标准能力层：请以 `ai/knowledge-base/v2.0/AI_NATIVE_PROJECT_OS_V2.0.md` 为准。
> V1.0 的价值：记录真实项目如何跑通流程、发现问题并推动 V2.0 抽象；不再作为 V2.0 基础能力的唯一事实来源。

## 0. V1.0 → V2.0

V1.0 的核心目标是：先跑通真实项目，再根据真实运行结果迭代机制。

V2.0 已将 V1.0 的实践抽象为标准 AI Project OS：

- Resource / Capability / Action
- Identity & Access
- Execution / MEU / Agent / Workflow
- Model / Tool / MCP / Skill Runtime Pool
- Model Pool / Routing
- Validation / Audit / Trace
- Template-first / Reuse-first / AI Asset Tree
- Project Planning / Confidence
- API / SDK 标准化

当前 V2.0 核心知识库：

`ai/knowledge-base/v2.0/AI_NATIVE_PROJECT_OS_V2.0.md`

V2.0 相关文档索引：

`ai/knowledge-base/v2.0/V2.0_DOCUMENT_INDEX.md`

V1.0 → V2.0 复盘：

`ai/knowledge-base/v2.0/V1.0_TO_V2.0_RETROSPECTIVE.md`

## 1. V1.0 历史规则

以下内容继续保留，作为 V1.0 真实项目运行记录、演进依据和历史决策参考。涉及 V2.0 基础能力边界时，以 V2.0 核心知识库为准。

## 2. 项目基础架构

项目采用：

**项目 → 业务域/模块 → 事项 → 阶段 → 任务 → 执行记录 → 交付资产**

Git 文件夹负责资产存储，不代替业务层级。事项通过唯一 ID 与 Product、Design、Engineering、QA、Release、Knowledge 等资产建立关联。

## 3. 项目执行记录

每个重要节点记录事项 ID、阶段、负责人、参与人、AI 是否参与、AI 完成/辅助内容、开始/计划结束/实际结束时间、计划耗时、实际工作耗时、等待耗时、自然周期、返工次数、变更次数、阻塞原因、交付资产和上下游依赖。

必须区分自然周期、实际工作耗时和等待耗时。

## 4. 持续迭代驱动层

V1.0 已确认竞品、数据、KPI、用户反馈（待建设）等持续迭代驱动源。输出分别进入竞品判断、数据诊断、KPI 优化和反馈分析。

## 5. 自动化闭环

V1.0 验证：

**发现 → 分析 → 决策建议 → 执行 → 验证 → 学习 → 再执行。**

Trigger、AI 分析、Human Gate、自动执行、自动验证均保留执行记录和证据。

## 6. 自动检测 Evidence

任何自动检测、诊断、触发必须记录 Detection ID、类型、时间、触发条件、来源、版本/时间范围、证据摘要、判断方法、结果、置信度、关联事项和后续动作。

## 7. Context / Dependency / Trace

AI 执行前检查项目目标、当前事项、Product、Knowledge Base、Design、数据/KPI、约束和依赖。重要执行记录输入上下文、来源、判断、修改、影响范围和验证结果。

## 8. 知识与复用

V1.0 建立项目执行 → 决策 → 交付 → 测试 → 结果 → 问题 → 经验 → Knowledge Base 的闭环，并记录成功经验、失败经验、否决方案和适用条件。

## 9. V1.0 目录与专项文档

- `PROJECT_DIRECTORY_NOTE.md`：V1.0 目录说明
- `project-evolution/`：项目演进历史
- `decisions/`：关键决策
- `ai/rules/`：V1.x Agent / Phase / Execution / Trigger / Preview 等专项 Contract
- `ai/knowledge-base/v1.1/` ～ `v1.4/`：专项知识与机制演进

V2.0 通过 `V2.0_DOCUMENT_INDEX.md` 统一索引这些历史/专项文档，避免规则重复维护。
