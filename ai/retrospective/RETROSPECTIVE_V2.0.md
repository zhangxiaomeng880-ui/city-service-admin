# AI Native Retrospective V2.2

## 1. 本轮任务
在 Verification Coverage 已建立的基础上，新增 User & Responsibility Data Layer，并将其作为平台基础数据维护模块接入所有阶段 Agent 的 Required Input / Handoff。同步执行独立 Audit，并在知识库与复盘更新后继续触发下一轮 Audit。

## 2. 核心设计决策

用户体系不新增 User Agent，而是作为 Data Layer：

```text
User
↓
Project Member
↓
Role / Permission
↓
Responsibility
↓
Task / Human Gate
↓
Agent Context
↓
Verification / Audit
```

Project Creator 默认 Project Owner，可变更。Role 与 Responsibility 分离；System Preset 与 User Personal Asset 分离；系统权限与项目权限分离；历史责任/权限以 Snapshot 保留。

## 3. 阶段责任

每个实际执行阶段都需要可解析 Stage Owner。已有责任直接复用；缺失时以 Project Owner 作为默认候选，通过最小人机对话确认。按需增加 Task Assignee、Reviewer、Approver、Decision Owner。Agent 不得绕过权限层自行任命人员或修改权限。

## 4. 各 Agent 接入

Project：初始化 Project Owner、成员、角色和责任。
Product：Product Owner / Decision Owner。
Design：Design Owner / Reviewer。
Planning：Planning Owner / Engineering Owner / Reviewer。
Engineering：Engineering Owner / Task Assignee / Reviewer。
Testing：Testing Owner / Task Assignee / Reviewer。
Compliance：Compliance Reviewer / Decision Owner / Approver。
Release：Release Owner / Release Approver / Executor。
Maintenance：Maintenance Owner / Incident Assignee / Decision Owner。
Analytics：Analytics/Data Owner / Reviewer。
Research：Research/Competitor Owner / Reviewer / Decision Owner。
Audit：只读责任/权限 Snapshot，保持独立，不接受业务任务指派。

## 5. 人机交互

User Context 与 Required Input 统一遵循：

```text
读取已有 Context / Handoff / User Context
↓
自动补齐
↓
识别缺失
↓
最小提示
↓
用户回复
↓
Agent 判断
↓
满足 → 继续
不满足 → 继续最小追问
需要责任/授权/审批/业务取舍 → Human Gate
```

## 6. Verification Boundary
本轮再次确认不新增“其他验证阶段”：
- Testing：实现行为
- Compliance：规则/约束
- Audit：流程、Evidence、Gate、Handoff、责任/权限 Snapshot 和结论可信度

## 7. Audit 结果
本轮用户体系及 Agent 输入接入完成后执行 `AUDIT_CYCLE_V2.3_2026-08-20.md`，独立 Audit Gate = PASS。未发现 CRITICAL / HIGH / MEDIUM 问题。

Audit 特别确认：用户体系为 Data Layer，不是 User Agent；所有阶段均有 User Context 引用；责任、权限和历史 Snapshot 可供 Audit 追溯；Testing / Compliance / Audit 边界未被破坏。

## 8. 文档同步后的规则
Knowledge Base / Retrospective 的更新本身属于 Mandatory Audit Trigger。因此本轮文档同步完成后必须重新开启新的 Audit Cycle，不得沿用 V2.3 PASS。

## 9. Token 复盘
User Context 使用 Summary + Delta；只读取当前项目/阶段相关成员、责任和有效权限；历史 Snapshot 仅在 Audit 或责任追溯需要时读取。不会为了用户体系而重复读取完整用户资料。

## 10. 后续实现边界
当前本轮完成的是 Agent / Data / Conversation / Audit 合同层设计与同步，不宣称已实现完整运行时用户管理 UI、数据库、认证服务或生产权限执行。运行时能力应作为后续 Engineering 任务按本合同实现并重新 Testing / Compliance / Audit。