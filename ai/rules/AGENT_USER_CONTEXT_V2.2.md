# Agent User Context Contract V2.2

## Purpose
定义各 Agent 如何引用 User & Responsibility Data Layer，不新增 User Agent。

## Common Input
- current_user
- project_owner
- project_members
- stage_owner
- role_assignments
- effective_permissions
- task_assignee（适用时）
- reviewer / approver（适用时）
- decision_owner（适用时）
- responsibility_snapshot

## Stage Required Input
Project：项目创建者默认 Project Owner，可变更；项目成员和基础角色可确认。
Product / Design / Planning / Engineering / Testing / Compliance / Release / Maintenance：必须可解析当前 Stage Owner；缺失时使用 Project Owner 作为默认候选并最小询问。

## Conversation Rule
1. 先读取已有 User Context。
2. 已存在且有效的信息不重复询问。
3. 缺少 Stage Owner 时提示默认候选。
4. 用户确认则继续；用户变更则写入项目责任关系后继续。
5. 涉及角色、权限、审批或授权变更时执行 Permission Check，并在需要时进入 Human Gate。

## Permission Rule
Agent 可以引用用户数据；Agent 不得绕过权限层修改角色、权限、成员或责任关系。

## Handoff
所有需要下游 Agent 关注的责任人和权限状态进入 Handoff；历史责任状态进入 Snapshot。

## Audit Evidence
Audit 应能读取责任人、角色、权限快照、任务指派、决策人及变更记录。

## Failure
无法解析责任人 → PARTIAL / BLOCKED 并请求最小必要输入；权限不足 → 不执行修改，进入 Human Gate / Escalation。

## Token Strategy
User Context 使用摘要 + 差异读取；只读取当前阶段相关成员/责任/权限；历史数据按需读取。