# AI Native 流程复盘 V1.2

## 1. 复盘范围

本次复盘覆盖 Project 初始化、Conversation Orchestration、阶段 Human Gate、Minimum Token、KPI Weekly、Competitor Weekly、Knowledge Base 和 Agent 文档体系。

## 2. 已确认问题与改进

### 2.1 Agent 边界

**问题：** 容易把生命周期机制或交互机制误认为新的 Agent。

**结论：** Agent 负责专业能力；Conversation Orchestrator 负责交互/调度；Gate 负责质量判断；Iteration 是生命周期循环，不是 Agent。

### 2.2 Project 初始化

**问题：** 如果没有独立 Project 阶段，后续 Agent 容易重复询问仓库、分支、环境和版本。

**改进：** Project Agent 作为第 0 阶段，建立 Project Context 并检查基础设施。

### 2.3 阶段切换

**问题：** 自动连续推进可能导致用户失去关键决策节点。

**改进：** 阶段内部自动执行；阶段完成后默认 Human Gate，询问是否进入下一阶段。

### 2.4 Token 使用

**问题：** 简单压缩文本不能解决 Token 成本，反而可能损失上下文和证据。

**改进：** 使用 Context Reuse、Progressive Retrieval、Delta First、Evidence on Demand 和 Compressed Reporting。

### 2.5 数据上报

**问题：** 只有最终 KPI/结论不足以支持审计和复盘。

**改进：** 每个数据项增加来源、口径、时间范围、输入/采集时间和 Evidence；周报自动与 Target 对比。

### 2.6 竞品分析

**问题：** 全局竞品信息难以与具体项目目标关联。

**改进：** 竞品清单、关注维度、来源和周报全部绑定 Project，并记录每周变化。

### 2.7 周期自动化

**问题：** 仅定义定时任务不足以保证可靠性。

**改进：** 定时任务必须记录 Project、配置、周期、来源、执行状态、输出资产和异常；失败时提示用户。

## 3. 当前标准

```text
Project
 ↓
Product
 ↓
Design
 ↓
Planning
 ↓
Coding
 ↓
Testing
 ↓
Compliance
 ↓
Release / Deploy
 ↓
Maintenance / Analytics
 ↓
Audit
 ↓
Iteration → Product
```

Conversation Orchestrator 横跨全部阶段。

## 4. 下一轮复盘关注项

- 实际执行中的重复提问率
- 用户主动输入长度
- Agent 自动执行成功率
- Human Gate 的阻塞率
- Token 使用量与质量表现
- KPI 数据缺失率及来源完整率
- 竞品信息来源有效率
- 定时任务成功率
- Gate 误判/漏判

## 5. 复盘规则

每轮重大流程升级后，应同步：

1. Agent MD
2. Stage Contract
3. AI Rules
4. Knowledge Base
5. Conversation Orchestration
6. Retrospective
7. 根 README / 索引

不能只修改执行文档而不沉淀知识和复盘结论。
