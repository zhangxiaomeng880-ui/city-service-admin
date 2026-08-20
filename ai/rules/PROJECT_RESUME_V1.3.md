# Project Resume Rule V1.3

## 目标
为已有项目提供低摩擦、可验证、可对话的快速恢复入口。

## Resume Flow

```text
用户自然语言
↓
Project Match
↓
项目快速筛选
↓
Project Context Resume
↓
Current / Latest Version
↓
Git Freshness
↓
Infrastructure Readiness
↓
Last Iteration / Blocker
↓
Resume Gate
↓
用户确认
↓
Iteration Routing
```

## Match Rule

- 唯一明确匹配：直接恢复。
- 多个候选：只展示项目名称、版本、更新时间、状态、Blocker。
- 无匹配：提示创建新项目或补充关键词。

## Freshness Rule

必须识别当前版本与最新版本、当前分支与远程状态。不得用“仓库可访问”代替最新状态检查。

## Safety Rule

未提交修改、冲突风险、权限问题、Secret、生产操作或高风险覆盖操作不得自动执行；必须提示用户。

## Iteration Rule

Resume 后依据本次用户目标和变更范围选择最小必要阶段，不默认完整重跑。

## Human Gate

Resume Gate 完成后提示：

> 项目已恢复。当前版本为 {current}，最新版本为 {latest}，当前状态为 {status}。是否开始本次 Iteration？

## Token Rule

优先使用项目索引、摘要、状态、版本和差异；按需深入，不重复读取已确认历史。