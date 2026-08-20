# Stage Contract V2.0

## 1. Common Stage Contract

所有阶段从项目启动即使用统一契约：

1. Context Resolution
2. Required Input Check
3. Execution
4. Verification
5. Evidence
6. Gate
7. Standard Handoff
8. Human Gate / Next Action

## 2. Common Input

Project Context → Previous Handoff → Knowledge/Rules → User Intent → External Evidence。

仅在缺失 Required Input 时向用户提问。

## 3. Agent Boundary

每个 Agent 必须只负责其专业边界。Testing、Compliance、Audit 的职责和 Gate 不得互相替代。

## 4. Gate

统一状态：PASS / PARTIAL / BLOCKED / NOT_RUN。责任 Agent 负责专业判断，Gate Engine 负责标准化状态和证据约束。

## 5. Handoff

每个阶段完成后必须产生 Standard Handoff，至少包含：Output、Decisions、Evidence、Verification、Gate、Blocker/Warning、Next Stage Required Input、User Confirmation State。

## 6. Project

Project 支持 New Project 和 Existing Project Resume。New Project 负责初始化；Existing Project 负责快速筛选、恢复状态、版本/Git/环境检查。

## 7. Iteration

Iteration Router 根据本次变化动态选择最小必要阶段。不能为了缩短流程跳过必要质量、合规、安全或发布 Gate。

## 8. Environment

Environment Matrix 独立记录各环境 Branch、Version、Commit、Status、Last Verified、Evidence。环境状态必须独立验证。

## 9. Failure

失败必须进入统一 Failure Recovery：分类 → 有界重试 → 验证 → Diagnose → Escalate。不得无限自动重试。

## 10. User Gate

阶段完成后默认询问用户是否进入下一阶段。需要业务选择、批准、风险确认或人工操作时必须显式询问对应类型，不使用模糊的“继续”代替必要 Decision。

## 11. Token

优先复用 Project Context 和 Handoff；摘要优先、差异优先、证据按需读取、压缩输出。不得省略关键验证。