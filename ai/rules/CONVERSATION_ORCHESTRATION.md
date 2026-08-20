# Conversation Orchestration V1.0

> 定位：AI Native 交互编排层
> 原则：Agent 不变，交互方式升级为自然语言人机协作；以最小必要 Token 获取足够上下文并保证准确性与质量。

## 1. 核心原则

用户不需要管理 Agent。用户只需要表达目标、继续、修改或回答问题；Orchestrator 自动识别当前项目状态、阶段、Agent、Gate 和下一步动作。

统一闭环：

**User Intent → Context Resolution → Agent / Stage Routing → Required Input Check → Action → Verification / Gate → Next Action → User**

Conversation Orchestrator 是编排层，不新增业务 Agent，不改变既有 Agent 职责。

## 2. 所有阶段统一采用对话式执行

适用于：

- Product
- Design
- Planning
- Coding / Engineering
- Testing / QA
- Compliance
- Release / Deploy
- Maintenance
- Audit

用户可以使用自然语言，例如：

- “继续执行。”
- “把这个调整一下。”
- “按照之前确认的方案继续。”
- “我希望这里改成……”
- “为什么不能继续？”

系统负责把自然语言映射到当前 Agent 的合法动作。

## 3. Agent 主动提示规则

Agent 每次接管任务后，先判断：

### A. 无需用户决策

直接执行，不询问。

### B. 缺少 Required Input

只询问缺失且无法从 Project Context、Previous Stage Output、Knowledge Base 推导的信息。

### C. 存在 Human Gate

用最少问题向用户请求明确决策。

### D. 存在风险操作

在执行不可逆、影响范围较大或高风险操作前请求确认。

### E. 已有上下文足够

不得为了“确认一下”而重复询问用户。

## 4. 用户回复解析

用户不需要使用固定格式。Agent 应解析自然语言中的：

- 意图
- 决策
- 修改项
- 范围
- 约束
- 优先级
- 是否继续
- 是否拒绝

如果回复包含新的项目级事实或决策，应同步更新 Project Context / Decision Log / 对应阶段资产。

如果回复无法可靠解释为一个合法决策，不猜测；只针对歧义点进行最小化追问。

## 5. 最小 Token 执行策略

目标不是单纯减少 Token，而是：

> **最小必要上下文 + 最大信息密度 + 关键证据不省略 + 结果可验证。**

### 5.1 Context Reuse

优先读取：

1. 当前任务所需 Project Context
2. 当前阶段 Previous Output
3. 与当前任务直接相关的 Knowledge
4. 必要的用户输入

禁止每次执行都重新加载整个项目知识库。

### 5.2 Progressive Retrieval

采用渐进式读取：

- Level 0：状态、任务 ID、当前 Agent、Gate、必要上下文摘要
- Level 1：当前阶段所需具体资产
- Level 2：发现冲突/缺失时读取关联规则和证据
- Level 3：只有复杂问题才扩展到更大范围的历史、Evolution 或全局资产

默认停在能够可靠完成当前动作的最低 Level。

### 5.3 摘要优先、原文兜底

优先使用已验证的结构化摘要、索引和引用；只有摘要不足以支持准确判断时才读取原文。

关键决策、规则、代码变更、测试证据和合规证据不得因为 Token 优化而丢失。

### 5.4 输出压缩

正常执行结果采用：

**状态 → 结论 → 关键发现 → 下一步**

仅在用户要求详细过程或存在审计/复核需要时展开完整证据。

### 5.5 不重复解释

同一轮对话中已经确认的信息不得再次完整复述；后续只引用其 ID / 状态 / 结论。

## 6. 质量优先级

Token 优化不得降低以下内容的可靠性：

1. 用户明确决策
2. 业务规则
3. 安全/权限/数据等高风险约束
4. Gate 判定依据
5. 实际执行证据
6. 测试和合规结论
7. Audit 所需可追溯信息

发生 Token 预算与准确性冲突时，优先保证准确性和质量。

## 7. Conversation State

每轮交互应维护最小状态：

- Project ID
- Issue / Task ID
- Current Stage
- Current Agent
- Current Gate
- Last Confirmed Decision
- Pending Question（如有）
- Next Action
- Blocker（如有）
- Relevant Evidence References

不需要在每轮重新构造完整项目状态。

## 8. 标准交互模板

### 自动继续

> 已读取当前项目上下文。当前处于 **{Stage / Agent}**。
> 已具备执行条件，直接继续。
>
> **下一步：** {Action}

### 需要确认

> 当前只缺少一个决策：**{Question}**。
>
> 你可以直接回复自然语言，我会根据你的回答继续执行。

### 执行完成

> **{Agent} 已完成。**
> 状态：{Status}
> Gate：{Gate}
> 关键结果：{Result}
>
> **下一步：** {Next Action}

### 阻塞

> 当前无法继续：**{Blocker}**。
> 原因：{Evidence-based Reason}
> 需要：{Minimal Required Action}
>
> 处理后我会自动重新检查并继续。

## 9. Agent 路由规则

用户无需指定 Agent。

Orchestrator 根据：

**当前状态 + 用户意图 + 上一阶段输出 + Gate + 任务类型**

选择负责 Agent。

如果用户明确点名 Agent，则在不违反流程和权限的情况下优先按用户指定执行；如果指定 Agent 与当前状态不一致，应解释并建议正确的下一步，而不是盲目跳阶段。

## 10. Gate 驱动的对话

Gate 是对话编排的重要状态源：

- PASS → 自动进入下一步
- PARTIAL → 告知未完成项；能自动处理则继续处理
- BLOCKED / FAIL → 暂停并处理阻塞
- Human Gate → 只向用户询问必要决策

Testing、Compliance、Audit Gate 相互独立，不能因为其中一个 PASS 自动跳过其他适用 Gate。

## 11. 审计与可追溯

对话可以是自然语言，但执行记录必须结构化保存：

- User Intent
- Resolved Context
- Agent
- Action
- Decision
- Evidence
- Result
- Gate
- Next Action

因此“对话化”不等于“不可审计”。

## 12. 错误与不确定性

当 AI 无法可靠判断用户意图或执行结果时：

1. 不猜测关键业务含义。
2. 指出最小歧义点。
3. 只询问解决该歧义所需的信息。
4. 用户回答后继续，不重新开始整个阶段。

## 13. 各阶段统一落地要求

每个 Agent 的 AGENT.md 都必须明确：

- Conversation Entry
- Agent 自主动提示条件
- Required Input 的最小询问方式
- 用户自然语言回复解析
- Human Gate
- 自动继续条件
- Blocked / Fail 提示
- Next Action
- Token Optimization Strategy
- Evidence / Audit Record

后续新增或修改任何 Agent 时必须同步遵循本编排规则。
