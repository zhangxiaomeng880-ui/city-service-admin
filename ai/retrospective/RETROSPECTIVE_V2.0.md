# AI Native Retrospective V2.2

## 1. 本轮任务

在 Agent V2.1 Contract Migration 基础上，继续检查“Testing 之后是否存在未归属的其他验证”，确认后明确不新增泛化验证阶段，而建立 Verification Coverage Matrix，并把下游验证所需输入前置到对应阶段，通过人机对话完成收集。

## 2. 本轮核心结论

“其他验证”不是新的 Agent 或阶段。当前验证职责已经覆盖在：

- Testing：验证实现是否按需求/Acceptance Criteria 工作
- Compliance：验证是否符合适用规则/约束
- Audit：验证流程、Evidence、Gate、Handoff 和结论是否真实完整可追溯

真正缺失的是“前置输入覆盖关系”显式化。

## 3. 新增 Verification Coverage Matrix

新增：`ai/rules/VERIFICATION_COVERAGE_MATRIX_V2.2.md`

建立：

```text
Stage Required Input
↓
Stage Verification
↓
Downstream Required Input
↓
Testing / Compliance / Audit
↓
Gate
```

并明确：后置阶段发现缺失输入时，必须回溯责任前置 Agent，不得自行创造关键事实。

## 4. 各阶段新增/强化输入

### Project
补充责任角色、Decision Owner、风险级别、Testing/Compliance/Release/KPI/竞品适用性。

### Product
补充 Scope/Out of Scope、Success Metrics、Decision Owner、Compliance Applicability，并强化 Acceptance Criteria 的可测试性。

### Design
补充平台/设备、状态覆盖、可用性/可访问性约束、Design→Code Mapping。

### Planning
补充 Architecture/Data/API、Security、Performance、Compliance applicability、Migration、Rollback、Test Strategy、Release Preconditions。

### Engineering
补充实现映射、Test Strategy、Migration/Rollback、Runtime Config 和 Testing 所需 Evidence。

### Testing
补充测试数据、测试环境/构建、风险回归范围，并建立缺失输入回退前置 Agent 的机制。

### Compliance
补充对话式 Applicable Rules / Exception / Waiver 收集及 Rule→Evidence→Result 追溯。

### Release
补充 Release Preconditions、Testing/Compliance Gate、Smoke/Health Check、Rollback 和人工批准。

### Analytics
补充 KPI 目标方向、Data Owner 和来源字段，并支持定时任务缺失输入最小提示。

### Research / Competitor
补充竞品范围、维度、来源规则、周期和重点对象。

### Maintenance
补充影响范围、生产数据/权限/合规风险和恢复要求。

## 5. 人机对话机制

新增：`ai/rules/CONVERSATION_INPUT_COLLECTION_V2.2.md`

统一模式：

```text
Context 自动取数
↓
Missing Input Detection
↓
最小提示
↓
User Reply
↓
Input Validation
↓
Execute / Continue Ask / Human Gate
```

用户不需要填写 Agent 已经知道的信息。

## 6. Audit

由于本轮修改了 Agent、Verification Coverage、Conversation Input、Knowledge Base 和 Retrospective，按照 Mandatory Audit 规则，所有更新完成后必须执行全局 Audit。

## 7. Token 复盘

本轮继续采用 Context Reuse、Summary First、Delta First、Progressive Retrieval。验证覆盖通过矩阵集中管理，避免每个 Agent 重复描述全部验证规则。

## 8. 后续制度

未来新增任何验证项时必须先回答：

1. 它验证的是行为、规则还是流程可信度？
2. 应属于 Testing、Compliance 还是 Audit？
3. 它依赖哪个前置输入？
4. 该输入是否已经在前置阶段 Required Input 中定义？
5. 是否需要通过对话向用户收集？
6. 是否需要 Human Gate？

如果以上问题不能明确回答，不得新增“其他验证”流程。
