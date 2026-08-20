# Conversation Input Collection V2.2

## Purpose

把各阶段 Required Input 统一转换为人机对话，而不是让用户一次性填写完整表单。

## Standard Loop

```text
User Intent
↓
Context / Handoff / Repository 自动取数
↓
Missing Input Detection
↓
最小必要提示
↓
User Reply
↓
Input Validation
↓
Satisfied → Execute
Missing → Only ask missing fields
Decision/Approval → Human Gate
```

## Prompt Rules

### Inform
只告知状态，不要求用户操作。

### Confirm
需要用户确认下一阶段或低风险选择。

### Decision
存在业务/技术/设计取舍，由责任人选择。

### Approval
需要正式批准才执行。

### Manual Action
必须由用户在外部系统完成，如登录、授权、权限、Secret、Figma 权限等。

### Risk Confirmation
高风险、不可逆、生产操作前要求明确确认。

## Minimal Prompt

每次提示必须包含：

1. 当前已确认事实
2. 当前缺失项
3. 为什么需要
4. 用户回答后下一步

不得重新询问 Context 已存在的信息。

## Input Validation

Agent 必须判断用户回答是否真正满足 Required Input，而不是只判断“用户回复了文字”。

不满足时仅追问缺失字段；满足时立即进入 Execution。

## Upstream Ownership

后置 Agent 发现 Required Input 缺失时，必须定位其所属前置 Agent；不能由后置 Agent 自行创造关键事实。

## Token Strategy

Summary First、Delta First、Context Reuse、Progressive Retrieval、Evidence on Demand。提示和用户可见结果最小化，但不得跳过 Required Input / Verification / Gate。

## Coverage Source

阶段输入覆盖以 `ai/rules/VERIFICATION_COVERAGE_MATRIX_V2.2.md` 为准。