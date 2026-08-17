# AGENT Stage Lifecycle Rules V1.1

## 1. 核心规则

Agent 是标准能力资产，不因当前项目跳过某阶段而删除。

**Agent 永远存在；项目执行状态可以是 COMPLETED / PARTIAL / BLOCKED / SKIPPED。**

SKIPPED 必须记录：
- 判断依据
- 触发条件是否满足
- 对后续阶段的影响
- Resume / Re-entry 条件

## 2. 标准生命周期

Project Initialization → Feasibility（条件）→ Product → Design → Engineering / Coding → Build / Deploy / Preview → Acceptance → QA → Release → Data / Experiment（条件）→ Review → Knowledge Update

## 3. 统一 Agent Contract

每个 Agent 必须声明：

Purpose / Mission → Version → Input → Input Readiness → Input Verification → Execution → Output → Output Verification → Gate → Handoff → Environment Dependency → Version Dependency → Status → Resume Rule。

## 4. 关键职责边界

### Design
负责页面、交互、视觉、组件规范、Design System / Token、组件状态 / Variants、页面→组件映射和设计验收标准。

### Coding
消费 Product 与 Design 的最终结果以及组件规范，只负责实现，不重新定义组件、产品规则或设计规则。

### Project Initialization
负责 Repository、Branch、权限、Runtime、Build / Deploy / Preview 环境、项目版本等基础环境基线。后续阶段只消费并验证，不重复初始化。

### Build / Deploy / Preview
负责将 Coding 产物变成可追溯、可访问、可验证的 Preview 版本。

### Acceptance
验证 Product / Design 的确认结果是否被正确实现。

### QA
验证功能、交互、异常、边界、视觉、适配和问题闭环。

### Data / Experiment
条件执行。即使当前项目不需要，Agent 仍保留；本项目通过规则判定后可 SKIPPED。

### Review
复盘真实执行、根因、返工、阻塞和流程改进。

### Knowledge Update
将已验证结论沉淀为 Knowledge、Pattern、Rule、Agent / Workflow 改进，并成为下一轮输入。

## 5. DoD

Stage 只有在以下条件全部满足后才能标记 COMPLETED：

Input Ready + Input Verification + Execution Complete + Output Generated + Output Verification + Gate Passed + Handoff Complete。

“执行过”不等于“完成”。
