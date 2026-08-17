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

## 5. 统一阶段交互协议

所有 Agent Stage 均遵循 `AGENT_STAGE_INTERACTION_PROTOCOL_V1.0.md`。

### 5.1 启动

用户使用：

`启动 [Stage]`

Agent 自动：

1. 读取 Stage Contract。
2. 读取 Project / Version / Environment Context。
3. 读取上游 Output / Handoff / 历史执行记录。
4. 读取相关 Knowledge。
5. 执行 Input Readiness 与 Input Verification。
6. 根据 Gate 决定是否进入 Execution。

用户无需重复提供 MD 已定义且系统已有的输入。

### 5.2 Input 状态

Agent 应输出：

`【Stage｜Input】Required Input / 已满足 / Warning / Missing / Input Gate`

Gate：
- PASS → 自动 Execution
- PASS WITH WARNING → 非 blocker 时自动 Execution
- BLOCKED → 暂停并请求缺失信息或决策
- NOT APPLICABLE → 记录依据并进入 SKIPPED

### 5.3 Execution

进入 Execution 后先输出简洁执行计划，然后自动执行，不要求用户再次输入“执行”。执行过程中记录 Decision / Gap / Evidence / Deviation / Asset。

### 5.4 Output

Execution 完成后必须执行 Output Verification，并输出：

`【Stage｜Output】已生成 / Evidence / Verification / Gate / Handoff / Status`

只有 Output Verification + Gate + Handoff 满足要求，才能标记 COMPLETED。

### 5.5 用户介入

仅在以下情况暂停：Required Input 缺失、无法自动解决的冲突决策、Human Gate、高风险不可逆操作或明确要求人工决策。普通 Warning 不阻断，但必须记录。

### 5.6 继续

用户使用：

`继续 [Stage]`

Agent 读取 Resume Rule，从最近有效 Resume Point 继续，并重新验证发生变化的 Input / Environment / Version / Handoff。

## 6. 标准操作关键词

- `启动 [Stage]`：启动阶段
- `继续 [Stage]`：断点继续
- `检查 [Stage]`：阶段审计，不执行
- `复盘 [Stage]`：阶段复盘
- `全量执行项目`：按生命周期、Gate 和条件节点自动推进
- `检查全部 Agent MD`：全量 Agent Contract 审计
- `更新 Knowledge`：执行知识沉淀

## 7. DoD

Stage 只有在以下条件全部满足后才能标记 COMPLETED：

Input Ready + Input Verification + Execution Complete + Output Generated + Output Verification + Gate Passed + Handoff Complete。

“执行过”不等于“完成”。