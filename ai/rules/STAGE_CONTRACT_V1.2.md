# Stage Contract V1.2

> 本版本新增 Conversation Orchestration 与 Minimum-Token Execution 约束。

## 1. Input

统一输入优先级：

1. Project Context
2. Previous Stage Output
3. Knowledge Base
4. Current User Message

只有前三层无法满足 Required Input 时，才向用户请求最小必要补充。

## 2. Conversation Entry

用户可以自然语言进入任何阶段，例如“继续”“继续测试”“把这个调整一下”“按照之前方案执行”。Orchestrator 负责识别当前 Stage、Agent、Task、Gate 和下一步。

用户无需学习 Agent 命令。

## 3. Execution

每个 Stage Agent 必须执行：

1. Context Resolution
2. Input Verification
3. 判断是否需要用户
4. Action
5. Output Verification
6. Gate
7. Handoff / Next Action

能自动完成的动作不得无意义询问用户。

## 4. User Interaction

需要用户时，提示必须说明：

- 当前状态
- 已确认事实
- 当前唯一必要问题
- 用户可以如何自然回答
- 回答后将执行什么

用户回复后，Agent 必须解析意图、决策、修改和约束，并继续执行；不要求固定命令。

## 5. Minimum-Token Contract

目标：**最小 Token 消耗 + 最大必要准确性。**

必须采用：

- Context Reuse：复用 Project Context 和 Previous Output
- Progressive Retrieval：按需逐级读取
- Summary First：摘要/索引优先，原文兜底
- Incremental Context：只传当前动作必要上下文
- No Redundant Confirmation：不重复确认
- Compressed Output：正常结果只输出状态、结论、关键发现、下一步

不得为了 Token 节省而：

- 跳过必要证据
- 跳过测试/合规/Audit
- 猜测用户意图
- 省略关键业务规则
- 使用未经验证的摘要作高风险决策依据

## 6. Required Agent Interaction Fields

每个 Agent 必须定义：

- Conversation Entry
- Required Input
- Auto-Continue Conditions
- Minimal User Prompt
- User Reply Interpretation
- Human Gate
- Blocked / Fail Prompt
- Next Action
- Token Optimization Strategy
- Evidence / Audit Record

## 7. Gate

Gate 必须独立判断：

- Input Ready
- Output Complete
- Output Verified
- Testing Gate（适用时）
- Compliance Gate（适用时）
- Audit Gate（适用时）
- Human Gate（适用时）

Testing PASS、Compliance PASS、Audit PASS 互不自动继承。

## 8. Handoff

Handoff 必须保留最小但充分状态：

- Task / Issue ID
- Current Stage
- Current Agent
- Completed Action
- Current Gate
- Confirmed Decisions
- Context Changes
- Evidence References
- Blockers
- Next Action

## 9. Resume

用户说“继续”时，不重新询问项目背景。Orchestrator 从上述 Handoff 状态恢复并执行下一步。

## 10. Status

- `COMPLETED`
- `PARTIAL`
- `BLOCKED`
- `SKIPPED`

状态必须与实际 Gate 和证据一致，不得虚报 PASS。
