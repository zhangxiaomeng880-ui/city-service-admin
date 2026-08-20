# User & Responsibility Data Layer V2.2

## 1. Purpose
用户体系作为平台基础数据维护模块，不新增 User Agent。Agent 通过 Project Context / User Context 引用用户、角色、权限与责任数据。

## 2. Core Model
User → Project Member → Role / Permission → Responsibility → Human Gate。

## 3. User
保存用户身份、状态及基础资料。

## 4. Project
项目创建者默认成为 Project Owner；Project Owner 可变更。项目保存成员、角色分配及责任关系。

## 5. Roles
平台提供基础角色模板。典型角色包括 Project Owner、Product、Designer、Engineer、QA、Compliance、Release Manager、Stakeholder、Viewer。

## 6. Permissions
系统权限与项目权限分离。权限至少覆盖查看、编辑、执行、审核、审批、配置和发布等能力。Agent 不得绕过权限层直接修改权限或任命人员。

## 7. Responsibilities
Role 与 Responsibility 分离。责任类型包括 Project Owner、Stage Owner、Task Assignee、Reviewer、Approver、Decision Owner、Executor、Observer。

## 8. Stage Owner
每个阶段增加 Stage Owner Required Input。已有责任人直接复用；缺失时由 Agent 读取 Project Owner 作为默认候选，并通过人机交互最小提示确认或变更。用户确认后写入项目责任关系。

## 9. Task / Human Gate
Task 可指定 Assignee、Reviewer、Approver、Decision Owner。需要人工判断、授权或审批时进入 Human Gate，并记录责任人和决策。

## 10. System Preset vs User Asset
平台基础角色、权限和配置属于 System Preset。用户新增或扩展的角色、权限组合、职责模板等属于 User Personal Asset，可由用户维护和扩展，不覆盖系统基线。

## 11. Project Snapshot
项目保存 Role Assignment、Permission、Responsibility 的有效快照。角色或权限后续变化不得篡改历史项目的责任和审计事实。

## 12. Reassignment
支持责任人变更。必须记录原责任人、新责任人、变更时间、操作人和原因；影响中的 Human Gate / Task 应同步更新。

## 13. Agent Access
Agent 默认只读 User Context。需要变更用户、角色、权限或责任时必须经过对应数据层权限检查；涉及审批/授权的变更进入 Human Gate。

## 14. Audit
Audit 可读取 User、Role、Permission Snapshot、Stage Owner、Task Assignee、Decision Owner、Decision Log、Evidence，用于追溯“谁在什么时间、以什么权限、对什么对象做了什么操作”。

## 15. Conversation
用户体系相关 Required Input 采用最小人机交互：先读取已有 Context → 自动补齐 → 仅询问缺失决策 → 用户回答 → Agent 判断是否满足 → 更新 Data Layer → 继续执行。

## 16. Token Strategy
优先读取当前项目成员、当前阶段责任和有效权限；不重复询问已存在信息；历史 Snapshot 仅在 Audit / 责任追溯需要时读取。

## 17. Boundary
本模块负责事实、身份、关系、权限和历史快照；不负责业务判断、产品决策、测试、合规或独立审计。