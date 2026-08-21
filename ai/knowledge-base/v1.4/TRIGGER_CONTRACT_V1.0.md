# Unified Trigger Contract V1.0

> 状态：V1.0 已确认
> 定位：Capability → Executable 的统一触发规范

## 1. 核心原则

任何可执行 Capability 必须具备标准 Trigger；UI 不是能力可执行的前置条件。UI、Command、自然语言、Event、Schedule 都只是 Trigger Source，不得各自实现一套业务能力。

统一链路：

```text
Trigger
 ↓
Capability Identification
 ↓
Input Gate
 ↓
Execution / User Decision
 ↓
Execution Trace
 ↓
Result / Archive
```

## 2. Trigger Types

### 2.1 Command

确定性最高的显式入口，适合配置、查询、验证、发布等操作。

示例：`/model list`、`/model add`、`/routing show`、`/routing configure`。

### 2.2 Natural Language

用户通过自然语言表达意图，由 Trigger 层识别目标 Capability；识别后必须进入统一 Contract，不得绕过 Input Gate、Validation、Audit 或 Human Gate。

### 2.3 Event

由系统事件触发，例如默认模型执行失败触发 Dynamic Routing、Phase 完成触发下一阶段提示、配置变更触发 Validation/Audit。

### 2.4 Schedule

按时间计划触发，例如每周竞品分析、每周 KPI 数据分析。

## 3. Trigger Record

每次触发必须记录：

- trigger_id
- trigger_type
- source
- target_capability
- target_agent（如适用）
- project_id / phase_id / task_id（如适用）
- input
- context
- priority
- requested_by
- triggered_at
- trigger_policy_version
- status

Trigger 本身属于执行数据资产，并必须可关联 Execution ID / Trace ID。

## 4. Input Gate

Trigger 不能直接执行。必须先判断目标 Capability、输入完整性、上下文就绪度、权限和必要配置。

```text
Input Complete → Execute
Input Missing → WAITING_INPUT → 向用户请求补充
Need Decision → WAITING_CONFIRMATION → 用户决策
Blocked → BLOCKED
```

不得通过猜测补齐关键输入。

## 5. Trigger Status

标准状态：`PENDING`、`WAITING_INPUT`、`WAITING_CONFIRMATION`、`READY`、`RUNNING`、`SUCCESS`、`FAILED`、`BLOCKED`、`CANCELLED`。

## 6. Trigger Priority

Trigger 来源优先级与 Model Priority 分开定义。默认执行优先级：用户显式触发 > Command > Event > Schedule > 系统默认自动触发；具体业务可通过 Trigger Policy 配置。

## 7. UI Boundary

UI 是 Trigger Source，不是 Capability 实现。未产品化为 UI 的能力必须仍提供可执行 Command、Natural Language、Event 或 Schedule 入口；已有 UI 必须调用同一 Capability 和同一配置/数据资产。

## 8. Configuration Trigger

模型池、工具、MCP、Skill、默认模型和路由策略的配置统一进入 Configuration Capability；Trigger 只发起配置任务，不直接绕过 Validation / Independent Audit 修改正式资产。

## 9. Audit Requirements

Capability Audit 必须检查：Contract、Input/Output/Execution、所属 Agent/Tool/MCP/Skill、标准 Trigger、Structured Record、Audit。缺少 UI 可以接受；缺少标准 Trigger 不得判定为可执行能力。
