# Agent 对话交互矩阵 V1.1

> 目的：把 Conversation Orchestration 落到每个 Agent 的实际执行环节。
> 原则：用户自然语言驱动，Agent 主动提示，用户回复后判断并行动；最小 Token 消耗但不牺牲准确性、质量和证据。

## 统一交互契约

每个 Agent 都遵循：

**Entry → Context Resolve → Minimal Prompt → User Reply → Intent/Decision Resolve → Action → Verification → Gate → Next Action**

### 统一规则

- 用户无需指定 Agent。
- 已确认信息不重复询问。
- 能自动完成就直接完成。
- 只有 Required Input、Human Gate、风险操作或真正歧义才询问用户。
- 用户可以用自然语言回答，不要求固定命令。
- 用户回复产生的新事实/决策必须更新 Context / Decision Log / 阶段资产。
- Token 优先从上下文复用、增量读取、摘要引用和输出压缩中节省；不得通过跳过证据、验证或 Gate 节省。

## 1. Product AGENT

**Conversation Entry**：用户提出需求、目标、问题或“继续产品阶段”。

**主动提示**：仅在目标、范围、业务规则、关键用户决策缺失时提问。

**自然语言解析**：识别目标、范围、用户、优先级、业务规则、验收标准和取舍。

**Human Gate**：核心业务目标、范围、优先级、关键业务取舍。

**自动继续**：上下文和规则完整时直接形成 Product 输出。

**Token 策略**：优先读取当前事项、已有 PRD、Decision Log 和项目规则，不重复加载完整历史。

**Next Action**：完成后进入 Design 或根据项目状态进入 Planning；需要用户决策则停在 Human Gate。

## 2. Design AGENT

**Conversation Entry**：用户提出视觉/交互需求或 Product 已通过 Gate。

**主动提示**：仅在关键交互、视觉方向、设计约束或 Figma 目标不明确时提问。

**自然语言解析**：识别页面、组件、交互、视觉方向、响应式要求和设计约束。

**Human Gate**：关键视觉方向、核心交互取舍、设计方案确认。

**自动继续**：设计规范和 Product 输入充分时直接执行设计。

**Token 策略**：优先读取现有 Design System、组件规范和当前页面，不重复读取无关设计资产。

**Next Action**：完成后进入 Planning / Coding，或进入 Design Review。

## 3. Planning AGENT

**Conversation Entry**：Product / Design 完成后，或用户要求制定实施方案。

**主动提示**：仅在技术约束、范围边界、依赖或架构取舍无法从已有上下文确定时提问。

**自然语言解析**：识别技术目标、任务、依赖、风险、分支/版本和验收路径。

**Human Gate**：重大架构、技术路线或范围取舍。

**自动继续**：已有技术上下文充分时自动拆解任务。

**Token 策略**：优先读取当前仓库结构、现有架构和 Product/Design 输出，不扫描无关代码。

**Next Action**：输出实施计划后进入 Coding。

## 4. Coding / Engineering AGENT

**Conversation Entry**：Planning 已完成或用户明确要求实现。

**主动提示**：仅在代码范围、接口契约、关键实现取舍或高风险变更不明确时提问。

**自然语言解析**：识别修改目标、文件范围、约束、技术取舍和验证要求。

**Human Gate**：重大架构变化、破坏性变更、生产风险操作。

**自动继续**：输入完整时直接修改代码并验证。

**Token 策略**：先定位相关文件和符号，再按需读取；禁止无目的读取整个仓库。

**Next Action**：完成后进入 Testing；必要时进入 Compliance。

## 5. Testing / QA AGENT

**Conversation Entry**：Coding 完成、用户要求测试或发生回归问题。

**主动提示**：仅在测试范围、环境、验收条件或预期行为缺失时提问。

**自然语言解析**：识别测试目标、场景、预期、环境和回归范围。

**Human Gate**：通常不需要；只有业务预期无法确定时才询问。

**自动继续**：测试条件充分时自动执行并给出证据。

**Token 策略**：优先执行针对性测试，再扩大到回归；避免重复运行与当前改动无关的测试。

**Next Action**：PASS 进入 Compliance / Release；FAIL 返回 Coding。

## 6. Compliance AGENT

**Conversation Entry**：适用阶段产物完成，或用户要求合规检查。

**主动提示**：仅在适用规则、例外豁免或高风险批准缺失时提问。

**自然语言解析**：识别规则、例外、适用范围、批准和用户确认。

**Human Gate**：业务规则取舍、例外/豁免、高风险合规批准。

**自动继续**：规则和证据充分时直接检查。

**Token 策略**：按 Rule → Evidence 定向读取，不加载无关规则。

**Next Action**：PASS 进入下一适用阶段；PARTIAL 修复后复查；FAIL 返回责任 Agent。

## 7. Release / Deploy AGENT

**Conversation Entry**：Testing、Compliance 等适用 Gate 满足发布条件，或用户要求部署。

**主动提示**：仅在目标环境、版本、发布策略、审批或风险操作需要确认时提问。

**自然语言解析**：识别发布环境、版本、范围、发布时间和是否继续。

**Human Gate**：正式生产发布、不可逆高风险动作、明确要求人工审批的节点。

**自动继续**：Preview/非生产等已授权动作可自动执行并验证。

**Token 策略**：只读取当前版本、分支、环境和 Release 配置，不重复读取完整工程历史。

**Next Action**：完成发布验证后进入 Maintenance / Analytics。

## 8. Maintenance AGENT

**Conversation Entry**：上线问题、监控异常、缺陷、维护需求或用户反馈。

**主动提示**：仅在影响范围、优先级或修复取舍无法判断时提问。

**自然语言解析**：识别问题、影响、优先级、修复范围和回滚要求。

**Human Gate**：重大线上风险、范围变化或高风险修复。

**自动继续**：低风险、规则明确的问题自动处理并验证。

**Token 策略**：优先读取异常证据、最近变更和相关模块，不加载完整历史。

**Next Action**：修复验证后回到 Testing / Compliance / Release，或进入下一轮 Iteration。

## 9. Audit AGENT

**Conversation Entry**：阶段完成、关键 Gate、发布前或用户要求审计。

**主动提示**：仅在审计证据缺失、结论冲突或需要用户确认的例外事项时提问。

**自然语言解析**：识别审计目标、范围、例外、证据和用户要求。

**Human Gate**：审计发现需要人工确认的重大例外、授权或最终决策。

**自动继续**：证据充分时独立执行审计，不向被审计 Agent 继承 PASS。

**Token 策略**：优先读取 Gate 状态、Evidence Reference 和关键变更；发现异常后再按需扩展证据范围。

**Next Action**：PASS 放行；PARTIAL 指向责任阶段补齐；FAIL 返回责任 Agent 并阻断相关动作。

## 10. Analytics / 结果验证

Analytics 是分析能力，不新增 Agent；其对话方式与上述统一契约一致。

**Conversation Entry**：用户要求分析、KPI/数据异常或自动 Trigger。

**主动提示**：仅在指标口径、时间范围或业务目标无法恢复时提问。

**Token 策略**：先读取指标定义和当前窗口，再按需读取明细数据。

## 11. Iteration

Iteration 是生命周期循环，不是 Agent。

当 Maintenance / Analytics / Audit 等产生有效问题或机会时：

**Result → Learning → Decision → Product**

重新进入下一轮执行链。

## 12. 统一用户体验

用户看到的是自然语言协作，而不是 Agent 命令：

> 用户：继续执行。
>
> AI：当前进入 Testing，已有测试条件完整，我直接执行。
>
> AI：Testing 完成，发现 1 个失败用例，已定位到 Coding 变更 X。是否直接修复？
>
> 用户：直接修复。
>
> AI：已确认，返回 Coding 修复并在完成后自动重新测试。

最终体验目标：**用户负责目标与必要决策，Agent 负责判断与执行，Orchestrator 负责让整个过程自然连续。**
